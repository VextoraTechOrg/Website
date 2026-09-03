"""Pydantic schemas for ingestion CLI / stats."""

from __future__ import annotations

from pydantic import BaseModel, Field


class IngestStats(BaseModel):
    files: int = 0
    chunks: int = 0
    approx_tokens: int = 0
    elapsed_seconds: float = 0.0
    skipped_unchanged: int = 0


class IngestResult(BaseModel):
    ok: bool = True
    stats: IngestStats = Field(default_factory=IngestStats)
    message: str = "ok"
