"""Generic async repository base class."""

from __future__ import annotations

from typing import Generic, Optional, Sequence, Type, TypeVar
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.base import Base

T = TypeVar("T", bound=Base)


class BaseRepository(Generic[T]):
    """Thin CRUD helpers shared by concrete repositories."""

    def __init__(self, session: AsyncSession, model: Type[T]) -> None:
        self.session = session
        self.model = model

    async def get(self, id: UUID) -> Optional[T]:
        return await self.session.get(self.model, id)

    async def list_all(self, limit: int = 500) -> Sequence[T]:
        result = await self.session.execute(select(self.model).limit(limit))
        return result.scalars().all()

    async def add(self, entity: T) -> T:
        self.session.add(entity)
        await self.session.flush()
        return entity

    async def delete(self, entity: T) -> None:
        await self.session.delete(entity)
        await self.session.flush()
