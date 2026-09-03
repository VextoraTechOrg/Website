"""Chunk repository — replace-by-document + pgvector similarity search."""

from __future__ import annotations

from dataclasses import dataclass
from typing import List, Optional, Sequence
from uuid import UUID

from sqlalchemy import delete, select, text
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.document import Chunk
from app.repositories.base import BaseRepository


@dataclass
class RetrievedChunk:
    """A chunk plus its cosine distance to the query vector."""

    chunk: Chunk
    distance: float
    source_file: str


class ChunkRepository(BaseRepository[Chunk]):
    def __init__(self, session: AsyncSession) -> None:
        super().__init__(session, Chunk)

    async def delete_for_document(self, document_id: UUID) -> None:
        """Remove all chunks for a document (idempotent re-ingest)."""
        await self.session.execute(
            delete(Chunk).where(Chunk.document_id == document_id)
        )
        await self.session.flush()

    async def add_many(self, chunks: Sequence[Chunk]) -> None:
        self.session.add_all(list(chunks))
        await self.session.flush()

    async def similarity_search(
        self,
        query_embedding: List[float],
        *,
        top_k: int = 5,
        distance_cutoff: float = 0.75,
    ) -> List[RetrievedChunk]:
        """Cosine-distance nearest neighbors via pgvector ``<=>``.

        Lower distance = more similar. Results with distance > cutoff are dropped.
        """
        # Cast the Python list to a pgvector literal for the SQL parameter.
        vector_literal = "[" + ",".join(str(float(x)) for x in query_embedding) + "]"

        # Join documents so we can return source_file without a second query.
        sql = text(
            """
            SELECT
                c.id,
                c.document_id,
                c.chunk_index,
                c.section_title,
                c.content,
                c.created_at,
                c.updated_at,
                d.source_file,
                (c.embedding <=> CAST(:embedding AS vector)) AS distance
            FROM chunks c
            JOIN documents d ON d.id = c.document_id
            WHERE (c.embedding <=> CAST(:embedding AS vector)) <= :cutoff
            ORDER BY distance ASC
            LIMIT :top_k
            """
        )
        result = await self.session.execute(
            sql,
            {
                "embedding": vector_literal,
                "cutoff": distance_cutoff,
                "top_k": top_k,
            },
        )
        rows = result.mappings().all()

        retrieved: List[RetrievedChunk] = []
        for row in rows:
            chunk = Chunk(
                id=row["id"],
                document_id=row["document_id"],
                chunk_index=row["chunk_index"],
                section_title=row["section_title"],
                content=row["content"],
                embedding=[],  # not needed for prompting
            )
            # Preserve timestamps if present (optional for prompt assembly).
            if row.get("created_at") is not None:
                chunk.created_at = row["created_at"]
            if row.get("updated_at") is not None:
                chunk.updated_at = row["updated_at"]

            retrieved.append(
                RetrievedChunk(
                    chunk=chunk,
                    distance=float(row["distance"]),
                    source_file=row["source_file"],
                )
            )
        return retrieved
