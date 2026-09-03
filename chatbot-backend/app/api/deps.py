"""Shared FastAPI dependencies."""

from __future__ import annotations

from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_session
from app.services.chat_service import ChatService

SessionDep = Annotated[AsyncSession, Depends(get_session)]


def get_chat_service(session: SessionDep) -> ChatService:
    return ChatService(session)
