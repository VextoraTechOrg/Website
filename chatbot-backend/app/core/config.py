"""Application settings loaded from environment variables.

Heroku injects DATABASE_URL as postgres://… — we rewrite it to
postgresql+asyncpg:// so SQLAlchemy's async engine works.
"""

from __future__ import annotations

from functools import lru_cache
from typing import List

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


def _normalize_database_url(url: str) -> str:
    """Rewrite Heroku / libpq URL schemes to the asyncpg SQLAlchemy dialect."""
    if url.startswith("postgres://"):
        return "postgresql+asyncpg://" + url[len("postgres://") :]
    if url.startswith("postgresql://") and "+asyncpg" not in url:
        return "postgresql+asyncpg://" + url[len("postgresql://") :]
    return url


class Settings(BaseSettings):
    """Single source of truth for runtime configuration."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # --- Database ---
    database_url: str = Field(
        default="postgresql+asyncpg://postgres:postgres@localhost:5432/vextora_chatbot",
        alias="DATABASE_URL",
    )

    # --- Gemini ---
    gemini_api_key: str = Field(default="", alias="GEMINI_API_KEY")
    # Model names are config vars so we can swap to Pro / newer flash later.
    gemini_chat_model: str = Field(default="gemini-3.6-flash", alias="GEMINI_CHAT_MODEL")
    gemini_embed_model: str = Field(default="gemini-embedding-2", alias="GEMINI_EMBED_MODEL")
    embed_dim: int = Field(default=1536, alias="EMBED_DIM")

    # --- Generation knobs ---
    chat_temperature: float = Field(default=0.2, alias="CHAT_TEMPERATURE")
    max_output_tokens: int = Field(default=1024, alias="MAX_OUTPUT_TOKENS")
    max_history_turns: int = Field(default=6, alias="MAX_HISTORY_TURNS")

    # --- Retrieval ---
    retrieval_top_k: int = Field(default=5, alias="RETRIEVAL_TOP_K")
    # Cosine distance (<=>): lower is more similar. Chunks above this are dropped.
    similarity_distance_cutoff: float = Field(
        default=0.75, alias="SIMILARITY_DISTANCE_CUTOFF"
    )

    # --- Chunking (~4 chars/token heuristic) ---
    chunk_target_tokens: int = Field(default=700, alias="CHUNK_TARGET_TOKENS")
    chunk_overlap_tokens: int = Field(default=100, alias="CHUNK_OVERLAP_TOKENS")

    # --- HTTP ---
    cors_allow_origins: str = Field(
        default="https://vextoratech.com,https://www.vextoratech.com",
        alias="CORS_ALLOW_ORIGINS",
    )
    rate_limit_per_minute: int = Field(default=20, alias="RATE_LIMIT_PER_MINUTE")
    log_level: str = Field(default="INFO", alias="LOG_LEVEL")
    knowledge_base_dir: str = Field(default="knowledge_base", alias="KNOWLEDGE_BASE_DIR")

    @field_validator("database_url", mode="before")
    @classmethod
    def rewrite_db_url(cls, v: str) -> str:
        return _normalize_database_url(str(v))

    @property
    def cors_origins(self) -> List[str]:
        """Comma-separated allowlist → list of origin strings."""
        return [o.strip() for o in self.cors_allow_origins.split(",") if o.strip()]

    @property
    def chunk_target_chars(self) -> int:
        """Approximate chars for one chunk (4 chars ≈ 1 token)."""
        return self.chunk_target_tokens * 4

    @property
    def chunk_overlap_chars(self) -> int:
        return self.chunk_overlap_tokens * 4


@lru_cache
def get_settings() -> Settings:
    """Cached settings singleton — import this everywhere."""
    return Settings()
