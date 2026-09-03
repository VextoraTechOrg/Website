"""Pydantic schemas for the chat API."""

from __future__ import annotations

from typing import List, Literal, Optional

from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    """One turn of conversation history."""

    role: Literal["user", "assistant"]
    content: str = Field(..., min_length=1, max_length=8000)


class ChatRequest(BaseModel):
    """Inbound chat payload."""

    message: str = Field(..., min_length=1, max_length=4000)
    history: Optional[List[ChatMessage]] = Field(default=None)


class Source(BaseModel):
    """A knowledge-base location that grounded the answer."""

    source_file: str
    section_title: Optional[str] = None
    score: Optional[float] = None  # cosine distance (lower = closer)


class ChatResponse(BaseModel):
    """Non-streaming chat reply."""

    answer: str
    sources: List[Source] = Field(default_factory=list)
    used_context: bool = False


class StreamEvent(BaseModel):
    """One SSE payload (token delta or final metadata)."""

    event: Literal["token", "sources", "done", "error"]
    data: str | dict
