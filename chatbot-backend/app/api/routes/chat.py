"""Chat endpoints — JSON + SSE streaming."""

from __future__ import annotations

from fastapi import APIRouter, Request
from fastapi.responses import StreamingResponse
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.api.deps import SessionDep
from app.core.config import get_settings
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import ChatService

router = APIRouter(prefix="/chat", tags=["chat"])

limiter = Limiter(key_func=get_remote_address)
settings = get_settings()
_rate = f"{settings.rate_limit_per_minute}/minute"


@router.post("", response_model=ChatResponse)
@limiter.limit(_rate)
async def chat(request: Request, body: ChatRequest, session: SessionDep) -> ChatResponse:
    """Grounded non-streaming company Q&A."""
    service = ChatService(session)
    return await service.chat(body.message, history=body.history)


@router.post("/stream")
@limiter.limit(_rate)
async def chat_stream(request: Request, body: ChatRequest, session: SessionDep):
    """Server-Sent Events: token deltas, then sources, then done."""
    service = ChatService(session)

    async def event_generator():
        async for line in service.chat_stream(body.message, history=body.history):
            yield line

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )
