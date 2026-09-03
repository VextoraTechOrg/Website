"""Document repository — upsert by source_file."""

from __future__ import annotations

from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.document import Document
from app.repositories.base import BaseRepository


class DocumentRepository(BaseRepository[Document]):
    def __init__(self, session: AsyncSession) -> None:
        super().__init__(session, Document)

    async def get_by_source_file(self, source_file: str) -> Optional[Document]:
        result = await self.session.execute(
            select(Document).where(Document.source_file == source_file)
        )
        return result.scalar_one_or_none()

    async def upsert(
        self,
        source_file: str,
        *,
        title: str | None = None,
        content_hash: str | None = None,
    ) -> Document:
        """Create or update a document row keyed by source_file."""
        existing = await self.get_by_source_file(source_file)
        if existing:
            existing.title = title
            existing.content_hash = content_hash
            await self.session.flush()
            return existing

        doc = Document(
            source_file=source_file,
            title=title,
            content_hash=content_hash,
        )
        return await self.add(doc)
