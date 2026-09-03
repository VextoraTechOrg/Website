"""CLI: rebuild the vector index from knowledge_base/.

Usage (from chatbot-backend/):
    python -m scripts.ingest
"""

from __future__ import annotations

import asyncio
import logging
import sys
from pathlib import Path

# Ensure project root is on sys.path when run as a module.
ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from app.core.logging import setup_logging  # noqa: E402
from app.core.config import get_settings  # noqa: E402
from app.db.session import AsyncSessionLocal  # noqa: E402
from app.services.ingestion_service import IngestionService  # noqa: E402


async def _main() -> int:
    settings = get_settings()
    setup_logging(settings.log_level)
    log = logging.getLogger("ingest")

    async with AsyncSessionLocal() as session:
        service = IngestionService(session)
        result = await service.ingest_all()

    if not result.ok:
        log.error("Ingest failed: %s", result.message)
        return 1

    s = result.stats
    log.info(
        "IngestStats files=%s chunks=%s approx_tokens=%s elapsed=%.2fs",
        s.files,
        s.chunks,
        s.approx_tokens,
        s.elapsed_seconds,
    )
    print(result.model_dump_json(indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(asyncio.run(_main()))
