"""Thin singleton wrapper around the official ``google-genai`` Client.

All Gemini traffic (chat + embeddings) goes through this module so we have
one place for API-key wiring and shared retry helpers.
"""

from __future__ import annotations

import logging
from functools import lru_cache
from typing import Any, Callable, TypeVar

import anyio
from google import genai
from tenacity import retry, retry_if_exception, stop_after_attempt, wait_exponential

from app.core.config import get_settings
from app.core.exceptions import ConfigurationError, GeminiError

logger = logging.getLogger(__name__)
T = TypeVar("T")


@lru_cache
def get_gemini_client() -> genai.Client:
    """Return a process-wide Gemini client (API key from settings)."""
    settings = get_settings()
    if not settings.gemini_api_key:
        raise ConfigurationError(
            "GEMINI_API_KEY is not set. Export it or put it in .env."
        )
    return genai.Client(api_key=settings.gemini_api_key)


def _is_retryable(exc: BaseException) -> bool:
    """Best-effort detection of transient Gemini / network failures."""
    name = type(exc).__name__.lower()
    msg = str(exc).lower()
    return any(
        token in name or token in msg
        for token in (
            "timeout",
            "temporarily",
            "unavailable",
            "rate",
            "429",
            "500",
            "502",
            "503",
            "504",
            "resourceexhausted",
            "internalservererror",
            "connection",
        )
    )


@retry(
    reraise=True,
    stop=stop_after_attempt(4),
    wait=wait_exponential(multiplier=1, min=1, max=20),
    retry=retry_if_exception(_is_retryable),
)
def _call_with_retry(fn: Callable[[], T]) -> T:
    """Run ``fn`` with exponential backoff on transient errors only."""
    return fn()


async def run_gemini(fn: Callable[[], T]) -> T:
    """Execute a (likely sync) Gemini SDK call off the event loop."""
    try:
        return await anyio.to_thread.run_sync(lambda: _call_with_retry(fn))
    except Exception as exc:  # noqa: BLE001
        if isinstance(exc, GeminiError):
            raise
        raise GeminiError(f"Gemini API error: {exc}") from exc


def unwrap_text(response: Any) -> str:
    """Pull plain text out of a GenerateContentResponse / stream chunk."""
    text = getattr(response, "text", None)
    if text:
        return str(text).strip()
    try:
        parts = response.candidates[0].content.parts
        return "".join(getattr(p, "text", "") or "" for p in parts).strip()
    except Exception:  # noqa: BLE001
        return ""
