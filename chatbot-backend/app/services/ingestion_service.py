"""Ingestion service — walk knowledge_base → chunk → embed → upsert."""

from __future__ import annotations

import hashlib
import logging
import time
from pathlib import Path

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import get_settings
from app.models.document import Chunk
from app.rag.chunking import approx_tokens, split_markdown
from app.repositories.chunk_repo import ChunkRepository
from app.repositories.document_repo import DocumentRepository
from app.schemas.ingest import IngestResult, IngestStats
from app.services.embedding_service import EmbeddingService

logger = logging.getLogger(__name__)


class IngestionService:
    """Rebuild the vector index from markdown files on disk."""

    def __init__(self, session: AsyncSession) -> None:
        self.session = session
        self.settings = get_settings()
        self.documents = DocumentRepository(session)
        self.chunks = ChunkRepository(session)
        self.embedder = EmbeddingService()

    async def ingest_all(self, kb_dir: Path | None = None) -> IngestResult:
        started = time.perf_counter()
        root = kb_dir or Path(self.settings.knowledge_base_dir)
        if not root.is_absolute():
            # Resolve relative to CWD (Heroku slug root / local project root).
            root = Path.cwd() / root

        if not root.exists():
            return IngestResult(
                ok=False,
                message=f"Knowledge base directory not found: {root}",
            )

        files = sorted(root.glob("*.md"))
        stats = IngestStats()

        for path in files:
            n_chunks, n_tokens = await self._ingest_file(path)
            stats.files += 1
            stats.chunks += n_chunks
            stats.approx_tokens += n_tokens
            logger.info("Ingested %s → %s chunks", path.name, n_chunks)

        await self.session.commit()
        stats.elapsed_seconds = round(time.perf_counter() - started, 3)
        return IngestResult(ok=True, stats=stats, message="ingest complete")

    async def _ingest_file(self, path: Path) -> tuple[int, int]:
        """Replace all chunks for one markdown file (idempotent)."""
        raw = path.read_text(encoding="utf-8")
        content_hash = hashlib.sha256(raw.encode("utf-8")).hexdigest()
        source_file = path.name

        doc = await self.documents.upsert(
            source_file,
            title=path.stem.replace("-", " ").replace("_", " ").title(),
            content_hash=content_hash,
        )

        # Drop previous chunks so re-ingest never duplicates.
        await self.chunks.delete_for_document(doc.id)

        text_chunks = split_markdown(
            raw,
            target_chars=self.settings.chunk_target_chars,
            overlap_chars=self.settings.chunk_overlap_chars,
        )
        if not text_chunks:
            return 0, 0

        embeddings = await self.embedder.embed_many(
            [c.content for c in text_chunks],
            kind="document",
            titles=[c.section_title for c in text_chunks],
        )

        orm_chunks = [
            Chunk(
                document_id=doc.id,
                chunk_index=tc.chunk_index,
                section_title=tc.section_title,
                content=tc.content,
                embedding=vec,
            )
            for tc, vec in zip(text_chunks, embeddings)
        ]
        await self.chunks.add_many(orm_chunks)

        tokens = sum(approx_tokens(c.content) for c in text_chunks)
        return len(orm_chunks), tokens
