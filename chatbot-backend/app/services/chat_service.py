"""Chat service — retrieve → prompt → Gemini generate (stream + non-stream)."""

from __future__ import annotations

import json
import logging
from collections.abc import AsyncIterator, Iterator
from typing import List, Optional

import anyio
from google.genai import types
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import get_settings
from app.rag.guardrail import dedupe_sources, sanitize_user_message
from app.rag.prompts import SYSTEM_PROMPT, build_user_prompt
from app.schemas.chat import ChatMessage, ChatResponse, Source
from app.services.gemini_client import get_gemini_client, run_gemini, unwrap_text
from app.services.retrieval_service import RetrievalService

logger = logging.getLogger(__name__)


class ChatService:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session
        self.settings = get_settings()
        self.retrieval = RetrievalService(session)
        self.client = get_gemini_client()

    async def chat(
        self,
        message: str,
        history: Optional[List[ChatMessage]] = None,
    ) -> ChatResponse:
        """Non-streaming grounded answer."""
        safe_message = sanitize_user_message(message)
        retrieval = await self.retrieval.retrieve(safe_message)
        context = self.retrieval.format_context(retrieval.chunks)
        contents = self._build_contents(
            safe_message, context, retrieval.used_context, history
        )

        settings = self.settings
        client = self.client

        def _call():
            return client.models.generate_content(
                model=settings.gemini_chat_model,
                contents=contents,
                config=types.GenerateContentConfig(
                    system_instruction=SYSTEM_PROMPT,
                    temperature=settings.chat_temperature,
                    max_output_tokens=settings.max_output_tokens,
                ),
            )

        response = await run_gemini(_call)
        answer = unwrap_text(response) or (
            "I don't have that detail yet. Please reach us at info@vextoratech.com "
            "or https://vextoratech.com/contact."
        )
        sources = self._sources_from_retrieval(retrieval.chunks)
        return ChatResponse(
            answer=answer,
            sources=sources,
            used_context=retrieval.used_context,
        )

    async def chat_stream(
        self,
        message: str,
        history: Optional[List[ChatMessage]] = None,
    ) -> AsyncIterator[str]:
        """Yield SSE lines: token events, then sources, then done."""
        safe_message = sanitize_user_message(message)
        retrieval = await self.retrieval.retrieve(safe_message)
        context = self.retrieval.format_context(retrieval.chunks)
        contents = self._build_contents(
            safe_message, context, retrieval.used_context, history
        )
        sources = self._sources_from_retrieval(retrieval.chunks)

        settings = self.settings
        client = self.client

        def _open_stream() -> Iterator:
            return client.models.generate_content_stream(
                model=settings.gemini_chat_model,
                contents=contents,
                config=types.GenerateContentConfig(
                    system_instruction=SYSTEM_PROMPT,
                    temperature=settings.chat_temperature,
                    max_output_tokens=settings.max_output_tokens,
                ),
            )

        try:
            stream = await run_gemini(_open_stream)
            iterator = iter(stream)

            while True:
                # Pull one sync chunk without blocking the event loop.
                def _next():
                    try:
                        return next(iterator), False
                    except StopIteration:
                        return None, True

                event, done = await anyio.to_thread.run_sync(_next)
                if done:
                    break
                piece = unwrap_text(event)
                if piece:
                    yield f"event: token\ndata: {json.dumps({'text': piece})}\n\n"
        except Exception as exc:  # noqa: BLE001
            logger.exception("Stream failed: %s", exc)
            yield f"event: error\ndata: {json.dumps({'message': str(exc)})}\n\n"

        sources_payload = json.dumps(
            {
                "sources": [s.model_dump() for s in sources],
                "used_context": retrieval.used_context,
            }
        )
        yield f"event: sources\ndata: {sources_payload}\n\n"
        yield "event: done\ndata: {}\n\n"

    def _build_contents(
        self,
        message: str,
        context: str,
        used_context: bool,
        history: Optional[List[ChatMessage]],
    ) -> list:
        """Fold capped history + current grounded user turn into Gemini contents."""
        contents: list = []
        capped = (history or [])[-self.settings.max_history_turns :]
        for turn in capped:
            role = "user" if turn.role == "user" else "model"
            contents.append(
                types.Content(
                    role=role,
                    parts=[
                        types.Part.from_text(
                            text=sanitize_user_message(turn.content)
                        )
                    ],
                )
            )

        user_prompt = build_user_prompt(
            question=message,
            context=context,
            used_context=used_context,
        )
        contents.append(
            types.Content(role="user", parts=[types.Part.from_text(text=user_prompt)])
        )
        return contents

    @staticmethod
    def _sources_from_retrieval(chunks) -> List[Source]:
        pairs = [
            (h.source_file, h.chunk.section_title, h.distance) for h in chunks
        ]
        return [
            Source(source_file=sf, section_title=sec, score=score)
            for sf, sec, score in dedupe_sources(pairs)
        ]
