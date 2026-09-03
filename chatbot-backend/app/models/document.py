"""ORM models for knowledge-base documents and embedded chunks."""

from __future__ import annotations

import uuid
from typing import List, Optional

from pgvector.sqlalchemy import Vector
from sqlalchemy import ForeignKey, Integer, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.config import get_settings
from app.db.base import Base
from app.db.mixins import TimestampMixin, UUIDPrimaryKeyMixin

# Single source of truth: column width must match Settings.embed_dim.
_EMBED_DIM = get_settings().embed_dim


class Document(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    """One row per knowledge-base markdown file (or logical source)."""

    __tablename__ = "documents"

    source_file: Mapped[str] = mapped_column(String(512), unique=True, nullable=False)
    title: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)
    # Content hash so re-ingest can skip unchanged files if we want later.
    content_hash: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)

    chunks: Mapped[List["Chunk"]] = relationship(
        back_populates="document",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )


class Chunk(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    """Embedded text chunk belonging to a Document."""

    __tablename__ = "chunks"
    __table_args__ = (
        UniqueConstraint("document_id", "chunk_index", name="uq_chunks_doc_index"),
    )

    document_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("documents.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    chunk_index: Mapped[int] = mapped_column(Integer, nullable=False)
    section_title: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    # pgvector column — dimensionality must match EMBED_DIM / embed API call.
    embedding = mapped_column(Vector(_EMBED_DIM), nullable=False)

    document: Mapped["Document"] = relationship(back_populates="chunks")
