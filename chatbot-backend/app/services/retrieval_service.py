"""Retrieval service — embed query → pgvector top-k → assemble context."""

from __future__ import annotations

import logging
from dataclasses import dataclass
from typing import List

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import get_settings
from app.repositories.chunk_repo import ChunkRepository, RetrievedChunk
from app.services.embedding_service import EmbeddingService

logger = logging.getLogger(__name__)


@dataclass
class RetrievalResult:
    chunks: List[RetrievedChunk]
    used_context: bool
    query_embedding_dim: int


class RetrievalService:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session
        self.settings = get_settings()
        self.chunks = ChunkRepository(session)
        self.embedder = EmbeddingService()

    async def retrieve(self, query: str) -> RetrievalResult:
        """Return the best matching chunks for ``query``, or empty if none clear the cutoff."""
        vector = await self.embedder.embed_one(query, kind="query")
        hits = await self.chunks.similarity_search(
            vector,
            top_k=self.settings.retrieval_top_k,
            distance_cutoff=self.settings.similarity_distance_cutoff,
        )
        logger.info(
            "Retrieval for %r → %s hits (cutoff=%s)",
            query[:80],
            len(hits),
            self.settings.similarity_distance_cutoff,
        )
        return RetrievalResult(
            chunks=hits,
            used_context=bool(hits),
            query_embedding_dim=len(vector),
        )

    @staticmethod
    def format_context(chunks: List[RetrievedChunk]) -> str:
        """Label each chunk with its source for the LLM prompt."""
        if not chunks:
            return ""
        blocks: List[str] = []
        for i, hit in enumerate(chunks, start=1):
            section = hit.chunk.section_title or "General"
            blocks.append(
                f"[Source {i}: {hit.source_file} — {section}]\n{hit.chunk.content}"
            )
        return "\n\n---\n\n".join(blocks)
