"""Lightweight input hygiene + scope helpers.

The real company-scope policy lives in the SYSTEM_PROMPT + retrieval threshold.
This module keeps user text from looking like a system override and exposes a
cheap pre-check for empty retrieval.
"""

from __future__ import annotations

import re
from typing import List

# Patterns that try to override system instructions — we neutralize, not hard-block.
_INJECTION_RE = re.compile(
    r"(ignore\s+(all\s+)?(previous|prior|above)\s+instructions"
    r"|disregard\s+(the\s+)?system\s+prompt"
    r"|you\s+are\s+now\s+"
    r"|system\s*:\s*)",
    re.IGNORECASE,
)


def sanitize_user_message(text: str) -> str:
    """Collapse injection phrases so they cannot look like role markers."""
    cleaned = _INJECTION_RE.sub("[filtered]", text or "")
    # Strip nulls / control chars that can confuse tokenizers.
    cleaned = "".join(ch for ch in cleaned if ch == "\n" or ch == "\t" or ord(ch) >= 32)
    return cleaned.strip()


def has_grounded_context(used_context: bool) -> bool:
    """True when retrieval cleared the similarity threshold."""
    return bool(used_context)


def should_decline_without_context(used_context: bool) -> bool:
    """Hint for chat layer: no-context path still calls Gemini (graceful decline)."""
    return not used_context


def dedupe_sources(
    pairs: List[tuple[str, str | None, float | None]],
) -> List[tuple[str, str | None, float | None]]:
    """Keep first occurrence of each (source_file, section_title)."""
    seen: set[tuple[str, str | None]] = set()
    out: List[tuple[str, str | None, float | None]] = []
    for source_file, section, score in pairs:
        key = (source_file, section)
        if key in seen:
            continue
        seen.add(key)
        out.append((source_file, section, score))
    return out
