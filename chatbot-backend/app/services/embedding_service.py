"""Embedding service — gemini-embedding-2 with configurable dimensionality.

gemini-embedding-2 prefers task instructions in the prompt text rather than
the legacy ``task_type`` parameter. We format documents/queries accordingly
and still request ``output_dimensionality=EMBED_DIM``.
"""

from __future__ import annotations

import logging
import math
from typing import List, Literal, Sequence

from google.genai import types

from app.core.config import get_settings
from app.core.exceptions import GeminiError
from app.services.gemini_client import get_gemini_client, run_gemini

logger = logging.getLogger(__name__)

TaskKind = Literal["document", "query"]


def _format_for_task(text: str, kind: TaskKind, title: str | None = None) -> str:
    """Prefix text so Embedding 2 optimizes for retrieval asymmetry."""
    if kind == "query":
        return f"task: question answering | query: {text}"
    # Document side of asymmetric retrieval.
    safe_title = title or "none"
    return f"title: {safe_title} | text: {text}"


def l2_normalize(vector: Sequence[float]) -> List[float]:
    """Unit-length L2 normalization (safe no-op on near-zero vectors)."""
    norm = math.sqrt(sum(float(x) * float(x) for x in vector))
    if norm < 1e-12:
        return [float(x) for x in vector]
    return [float(x) / norm for x in vector]


class EmbeddingService:
    """Batch-friendly embedder backed by Gemini Embedding 2."""

    def __init__(self) -> None:
        self.settings = get_settings()
        self.client = get_gemini_client()

    async def embed_one(
        self,
        text: str,
        *,
        kind: TaskKind = "document",
        title: str | None = None,
    ) -> List[float]:
        vectors = await self.embed_many([text], kind=kind, titles=[title])
        return vectors[0]

    async def embed_many(
        self,
        texts: Sequence[str],
        *,
        kind: TaskKind = "document",
        titles: Sequence[str | None] | None = None,
        batch_size: int = 16,
    ) -> List[List[float]]:
        """Embed many texts, batching to stay under API payload limits."""
        if not texts:
            return []

        titles = list(titles) if titles is not None else [None] * len(texts)
        if len(titles) != len(texts):
            raise ValueError("titles length must match texts length")

        out: List[List[float]] = []
        for start in range(0, len(texts), batch_size):
            batch_texts = texts[start : start + batch_size]
            batch_titles = titles[start : start + batch_size]
            formatted = [
                _format_for_task(t, kind, title=tt)
                for t, tt in zip(batch_texts, batch_titles)
            ]
            batch_vecs = await self._embed_batch(formatted)
            out.extend(batch_vecs)
        return out

    async def _embed_batch(self, contents: Sequence[str]) -> List[List[float]]:
        settings = self.settings
        client = self.client
        model = settings.gemini_embed_model
        dim = settings.embed_dim

        def _call() -> List[List[float]]:
            result = client.models.embed_content(
                model=model,
                contents=list(contents),
                config=types.EmbedContentConfig(output_dimensionality=dim),
            )
            embeddings = getattr(result, "embeddings", None) or []
            if len(embeddings) != len(contents):
                raise GeminiError(
                    f"Expected {len(contents)} embeddings, got {len(embeddings)}"
                )
            vectors: List[List[float]] = []
            for emb in embeddings:
                values = list(getattr(emb, "values", []) or [])
                if len(values) != dim:
                    raise GeminiError(
                        f"Embedding dim mismatch: got {len(values)}, expected {dim}"
                    )
                # Embedding-2 auto-normalizes truncated dims; we still L2-normalize
                # so cosine distance behaves consistently if the API ever drifts.
                vectors.append(l2_normalize(values))
            return vectors

        logger.debug("Embedding batch of %s texts (dim=%s)", len(contents), dim)
        return await run_gemini(_call)
