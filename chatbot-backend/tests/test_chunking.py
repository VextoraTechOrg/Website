"""Unit tests for markdown-aware chunking (no DB / Gemini required)."""

from app.rag.chunking import approx_tokens, split_markdown


def test_split_by_headings_keeps_sections():
    md = """# Title

Intro paragraph.

## Services

We build AI systems.

## Contact

Email us at info@vextoratech.com.
"""
    chunks = split_markdown(md, target_chars=2800, overlap_chars=100)
    assert len(chunks) >= 2
    titles = {c.section_title for c in chunks}
    assert "Services" in titles
    assert "Contact" in titles


def test_large_section_splits_with_overlap():
    body = "Paragraph one. " * 200
    md = f"## Big Section\n\n{body}"
    chunks = split_markdown(md, target_chars=400, overlap_chars=80)
    assert len(chunks) > 1
    assert all(c.section_title == "Big Section" for c in chunks)


def test_approx_tokens():
    assert approx_tokens("abcd") == 1
    assert approx_tokens("a" * 40) == 10
