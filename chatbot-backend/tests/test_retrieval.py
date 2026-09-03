"""Retrieval formatting helpers (pure unit tests)."""

from types import SimpleNamespace

from app.repositories.chunk_repo import RetrievedChunk
from app.services.retrieval_service import RetrievalService


def test_format_context_labels_sources():
    chunk = SimpleNamespace(
        section_title="AI & Machine Learning",
        content="We ship production AI systems.",
    )
    hits = [
        RetrievedChunk(chunk=chunk, distance=0.12, source_file="services.md"),
    ]
    text = RetrievalService.format_context(hits)
    assert "services.md" in text
    assert "AI & Machine Learning" in text
    assert "production AI" in text


def test_format_context_empty():
    assert RetrievalService.format_context([]) == ""
