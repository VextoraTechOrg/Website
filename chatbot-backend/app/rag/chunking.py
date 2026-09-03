"""Markdown-aware chunking with recursive paragraph fallback.

Strategy:
1. Split on ``##`` / ``###`` headings so each section stays coherent.
2. If a section exceeds the target size, recursively split by paragraphs,
   then by sentences, applying the configured character overlap.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from typing import List


@dataclass
class TextChunk:
    """One chunk ready for embedding + storage."""

    content: str
    section_title: str | None
    chunk_index: int


_HEADING_RE = re.compile(r"^(#{1,3})\s+(.+?)\s*$", re.MULTILINE)


def _approx_tokens(text: str) -> int:
    """Rough token estimate (~4 chars/token)."""
    return max(1, len(text) // 4)


def split_markdown(
    text: str,
    *,
    target_chars: int = 2800,
    overlap_chars: int = 400,
) -> List[TextChunk]:
    """Split markdown into overlapping chunks with section titles."""
    sections = _split_by_headings(text)
    chunks: List[TextChunk] = []
    index = 0

    for title, body in sections:
        body = body.strip()
        if not body:
            continue

        if len(body) <= target_chars:
            chunks.append(
                TextChunk(content=body, section_title=title, chunk_index=index)
            )
            index += 1
            continue

        # Oversized section → recursive paragraph / sentence split.
        for piece in _recursive_split(body, target_chars, overlap_chars):
            chunks.append(
                TextChunk(content=piece, section_title=title, chunk_index=index)
            )
            index += 1

    return chunks


def _split_by_headings(text: str) -> List[tuple[str | None, str]]:
    """Return (section_title, body) pairs preserving heading hierarchy labels."""
    matches = list(_HEADING_RE.finditer(text))
    if not matches:
        return [(None, text)]

    sections: List[tuple[str | None, str]] = []
    # Preamble before the first heading.
    if matches[0].start() > 0:
        preamble = text[: matches[0].start()].strip()
        if preamble:
            sections.append((None, preamble))

    for i, match in enumerate(matches):
        title = match.group(2).strip()
        start = match.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        body = text[start:end].strip()
        # Keep the heading line in the chunk so embeddings see the title context.
        sections.append((title, f"{'#' * len(match.group(1))} {title}\n\n{body}"))

    return sections


def _recursive_split(text: str, target: int, overlap: int) -> List[str]:
    """Split text into ~target-sized pieces with overlap."""
    if len(text) <= target:
        return [text]

    # Prefer paragraph breaks, then sentences, then hard cuts.
    separators = ["\n\n", "\n", ". ", " "]
    for sep in separators:
        parts = text.split(sep)
        if len(parts) == 1:
            continue
        return _merge_parts(parts, sep, target, overlap)

    # Hard fallback: sliding window by characters.
    out: List[str] = []
    step = max(1, target - overlap)
    for i in range(0, len(text), step):
        out.append(text[i : i + target])
        if i + target >= len(text):
            break
    return out


def _merge_parts(parts: List[str], sep: str, target: int, overlap: int) -> List[str]:
    """Greedily pack split parts into chunks near ``target`` size."""
    chunks: List[str] = []
    current = ""

    for part in parts:
        candidate = part if not current else current + sep + part
        if len(candidate) <= target:
            current = candidate
            continue
        if current:
            chunks.append(current)
            # Seed next chunk with an overlap tail from the previous chunk.
            if overlap > 0 and len(current) > overlap:
                current = current[-overlap:] + sep + part
            else:
                current = part
        else:
            # Single part already larger than target — recurse further.
            chunks.extend(_recursive_split(part, target, overlap))
            current = ""

    if current:
        chunks.append(current)
    return chunks


# Re-export helper for ingest stats.
approx_tokens = _approx_tokens
