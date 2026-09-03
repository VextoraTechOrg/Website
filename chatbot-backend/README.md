"""
# VextoraTech Company RAG Chatbot

Production FastAPI backend for **Vex**, the VextoraTech company assistant.

It answers questions about VextoraTech (services, projects, team, process, contact)
using a **RAG pipeline**: markdown knowledge base → Gemini Embedding 2 → PostgreSQL/pgvector → Gemini chat.

Unrelated questions are politely declined. Answers are grounded in `knowledge_base/` only.

## Stack

| Layer | Choice |
|---|---|
| Runtime | Python 3.12 |
| API | FastAPI + uvicorn / gunicorn |
| LLM | Gemini (`GEMINI_CHAT_MODEL`, default `gemini-3.6-flash`) |
| Embeddings | `gemini-embedding-2` via `google-genai` (`EMBED_DIM`, default 1536) |
| Vector DB | PostgreSQL + pgvector (HNSW, cosine) |
| Deploy | Heroku Common Runtime |

## Project layout

```
chatbot-backend/
  app/                 # FastAPI app (model → repo → service → router)
  knowledge_base/     # Markdown corpus the bot is grounded on
  scripts/ingest.py    # Rebuild vector index
  alembic/             # Migrations (pgvector extension + tables + HNSW)
  tests/
```

## Local setup

### 1. Prerequisites

- Python 3.12+
- PostgreSQL with the **pgvector** extension available
- A Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)

Create a database, then enable the extension (Alembic also runs this):

```sql
CREATE DATABASE vextora_chatbot;
\c vextora_chatbot
CREATE EXTENSION IF NOT EXISTS vector;
```

### 2. Install

```bash
cd chatbot-backend
python -m venv .venv

# Windows
.venv\Scripts\activate
# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
# Edit .env — set GEMINI_API_KEY and DATABASE_URL
```

### 3. Migrate + ingest

```bash
alembic upgrade head
python -m scripts.ingest
```

Re-running ingest is **idempotent** (chunks for each file are replaced, not duplicated).

### 4. Run the API

```bash
uvicorn app.main:app --reload --port 8000
```

- Health: `GET http://localhost:8000/health`
- Chat: `POST http://localhost:8000/chat` with JSON `{"message":"What services does VextoraTech offer?"}`
- Stream: `POST http://localhost:8000/chat/stream` (SSE)

### 5. Tests

```bash
pytest -q
```

Unit tests cover chunking, retrieval formatting, and guardrail hygiene (no live Gemini/DB required).

## API

### `POST /chat`

```json
{
  "message": "What services does VextoraTech offer?",
  "history": [
    {"role": "user", "content": "Hi"},
    {"role": "assistant", "content": "Hello — ask me about VextoraTech."}
  ]
}
```

Response:

```json
{
  "answer": "...",
  "sources": [{"source_file": "services.md", "section_title": "AI & Machine Learning", "score": 0.21}],
  "used_context": true
}
```

### `POST /chat/stream`

Same body. Returns `text/event-stream`:

- `event: token` → `{"text":"..."}`
- `event: sources` → `{"sources":[...],"used_context":true}`
- `event: done`

Rate limit: `RATE_LIMIT_PER_MINUTE` (default 20/min per IP) via SlowAPI.

CORS origins: comma-separated `CORS_ALLOW_ORIGINS` (never `*` in production).

## Configuration

See `.env.example`. Important vars:

| Variable | Default | Notes |
|---|---|---|
| `DATABASE_URL` | local asyncpg URL | Heroku `postgres://` is auto-rewritten to `postgresql+asyncpg://` |
| `GEMINI_API_KEY` | required | |
| `GEMINI_CHAT_MODEL` | `gemini-3.6-flash` | Swap to Pro later without code changes |
| `GEMINI_EMBED_MODEL` | `gemini-embedding-2` | |
| `EMBED_DIM` | `1536` | Must match the Alembic `vector(N)` column (migration uses 1536) |
| `SIMILARITY_DISTANCE_CUTOFF` | `0.75` | Cosine distance; lower = stricter |
| `RETRIEVAL_TOP_K` | `5` | |

**Embedding-2 note:** Official docs deprecate `task_type` for `gemini-embedding-2`. This backend formats documents as `title: … | text: …` and queries as `task: question answering | query: …`, and requests `output_dimensionality=EMBED_DIM`. Truncated dims are L2-normalized for stable cosine search.

If you change `EMBED_DIM`, create a new Alembic migration that alters the `chunks.embedding` column and rebuilds the HNSW index, then re-ingest.

## Heroku deploy

From the `chatbot-backend/` directory (or set that folder as the Heroku app root):

```bash
heroku create vextora-chatbot
heroku addons:create heroku-postgresql:essential-0
heroku config:set \
  GEMINI_API_KEY=your_key \
  GEMINI_CHAT_MODEL=gemini-3.6-flash \
  GEMINI_EMBED_MODEL=gemini-embedding-2 \
  EMBED_DIM=1536 \
  CORS_ALLOW_ORIGINS=https://vextoratech.com,https://www.vextoratech.com

# Deploy this folder as the app root, e.g.:
git subtree push --prefix chatbot-backend heroku main
# or create a separate git repo for chatbot-backend and push normally:
# git push heroku main
```

`Procfile` release phase:

```
alembic upgrade head && python -m scripts.ingest
```

Web process:

```
gunicorn app.main:app -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT --workers 2 --timeout 60
```

Confirm pgvector is available on your Heroku Postgres plan (`CREATE EXTENSION vector`). If the extension is missing on the chosen tier, upgrade the add-on or use a plan that lists pgvector in supported extensions.

Dyno size: **standard-1x** is enough — Gemini does the heavy compute over HTTPS.

## Acceptance checks

1. Services question → grounded answer, `used_context: true`, `sources` include `services.md`.
2. "Write me a Python quicksort" → polite decline / redirect (no code dump as a coding tutor).
3. Unknown company detail → "don't have that yet" + contact path; no fabrication.
4. `/chat/stream` streams tokens then emits sources.
5. Second `python -m scripts.ingest` does not duplicate rows.
6. Fresh Heroku push migrates, ingests, and `/health` returns ok.

## Knowledge base

Edit markdown under `knowledge_base/` (clean `##` / `###` headings). Redeploy or run `python -m scripts.ingest` to refresh vectors.

---

© 2026 VextoraTech
