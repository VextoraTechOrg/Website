import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { blogCoverPath } from "@/lib/media";

/**
 * Single source of truth for the VextoraTech engineering blog.
 * Each post carries SEO metadata + a rich, semantic article body.
 * The blog index, the /blog/$slug route, and the sitemap all read from here.
 */

export const SITE_URL = "https://vextoratech.com";

export type BlogCategory =
  | "AI & ML"
  | "Web Dev"
  | "DevOps"
  | "Design"
  | "Engineering";

export interface BlogPost {
  slug: string;
  title: string;
  /** <=160 chars, written for the SERP snippet. */
  description: string;
  excerpt: string;
  keywords: string[];
  category: BlogCategory;
  author: string;
  authorRole: string;
  /** Human-readable date for the UI. */
  date: string;
  /** ISO-8601 for <time> + structured data. */
  datePublished: string;
  dateModified: string;
  readTime: string;
  color: string;
  /** Social / card cover under /public/og/blog/{slug}.png */
  coverImage?: string;
  Content: () => ReactNode;
}

/** External reference link — opens in a new tab, safe rel attributes. */
function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "rag-pipeline-from-scratch-chromadb-llama",
    title: "Building a RAG Pipeline from Scratch with ChromaDB and LLaMA 3.2",
    description:
      "A practical, step-by-step guide to building a local-first Retrieval-Augmented Generation pipeline with ChromaDB and LLaMA 3.2 — embeddings, retrieval, citations, and zero API cost.",
    excerpt:
      "How we built a local-first RAG system with citations, embeddings, and zero API cost.",
    keywords: [
      "RAG pipeline",
      "ChromaDB",
      "LLaMA 3.2",
      "retrieval augmented generation",
      "vector database",
      "local AI",
      "Ollama",
      "embeddings",
    ],
    category: "AI & ML",
    author: "Farjad",
    authorRole: "CEO & AI Engineer",
    date: "Jun 5, 2026",
    datePublished: "2026-06-05",
    dateModified: "2026-06-05",
    readTime: "8 min read",
    color: "#5B9FD4",
    Content: () => (
      <>
        <p>
          Retrieval-Augmented Generation (RAG) is the difference between a
          chatbot that <em>sounds</em> confident and one that is actually{" "}
          <strong>correct</strong>. Instead of hoping a model memorized your
          documentation, you retrieve the relevant passages at query time and
          feed them to the model as grounded context. In this guide we walk
          through the exact local-first pipeline we ship for clients — built on{" "}
          <Ext href="https://www.trychroma.com/">ChromaDB</Ext> and{" "}
          <Ext href="https://www.llama.com/">LLaMA 3.2</Ext> running through{" "}
          <Ext href="https://ollama.com/">Ollama</Ext> — with citations and zero
          per-token API cost.
        </p>

        <h2 id="why-build-rag">Why build RAG yourself?</h2>
        <p>
          Hosted RAG services are fast to start but slow to control. When you own
          the pipeline you control chunking, embedding quality, retrieval
          ranking, and prompt assembly — the four levers that actually move
          accuracy. A local stack also keeps sensitive documents on your own
          infrastructure, which matters for healthcare, legal, and fintech
          clients. This is the same philosophy behind our{" "}
          <Link to="/blog/$slug" params={{ slug: "local-ai-vs-api-ollama-vs-openai" }}>
            Local AI vs. API comparison
          </Link>
          .
        </p>

        <h2 id="architecture">The architecture at a glance</h2>
        <p>A minimal but production-shaped RAG pipeline has five stages:</p>
        <ul>
          <li>
            <strong>Ingest</strong> — load documents (PDF, Markdown, HTML) and
            normalize to clean text.
          </li>
          <li>
            <strong>Chunk</strong> — split text into overlapping, semantically
            coherent passages.
          </li>
          <li>
            <strong>Embed</strong> — convert each chunk into a vector with an
            embedding model.
          </li>
          <li>
            <strong>Retrieve</strong> — embed the user query and pull the nearest
            chunks from the vector store.
          </li>
          <li>
            <strong>Generate</strong> — assemble a grounded prompt and let the
            LLM answer with citations.
          </li>
        </ul>

        <h2 id="chunking-embeddings">Step 1: Chunking and embeddings</h2>
        <p>
          Chunk size is the single most under-rated knob. Too large and
          retrieval gets noisy; too small and you lose context. We start at
          ~800 characters with a 100-character overlap and tune from there. For
          embeddings we use a{" "}
          <Ext href="https://www.sbert.net/">sentence-transformers</Ext> model so
          nothing leaves the machine.
        </p>
        <pre>
          <code>{`from sentence_transformers import SentenceTransformer

embedder = SentenceTransformer("all-MiniLM-L6-v2")

def chunk(text: str, size: int = 800, overlap: int = 100):
    step = size - overlap
    return [text[i:i + size] for i in range(0, len(text), step)]

chunks = chunk(document_text)
vectors = embedder.encode(chunks).tolist()`}</code>
        </pre>

        <h2 id="storing-vectors">Step 2: Storing vectors in ChromaDB</h2>
        <p>
          ChromaDB gives you a persistent, embedded vector store with almost no
          ceremony. Store the chunk text and a source reference in metadata so
          you can cite it later.
        </p>
        <pre>
          <code>{`import chromadb

client = chromadb.PersistentClient(path="./vectordb")
collection = client.get_or_create_collection("docs")

collection.add(
    ids=[f"chunk-{i}" for i in range(len(chunks))],
    documents=chunks,
    embeddings=vectors,
    metadatas=[{"source": "handbook.pdf", "chunk": i} for i in range(len(chunks))],
)`}</code>
        </pre>

        <h2 id="retrieval-generation">Step 3: Retrieval + generation with LLaMA 3.2</h2>
        <p>
          At query time, embed the question with the <em>same</em> model, pull
          the top matches, and assemble a prompt that explicitly tells the model
          to answer only from the supplied context.
        </p>
        <pre>
          <code>{`import ollama

q_vec = embedder.encode([question]).tolist()
hits = collection.query(query_embeddings=q_vec, n_results=4)
context = "\\n\\n".join(hits["documents"][0])

prompt = f"""Answer using ONLY the context below. Cite sources by number.
Context:
{context}

Question: {question}"""

resp = ollama.chat(model="llama3.2", messages=[{"role": "user", "content": prompt}])
print(resp["message"]["content"])`}</code>
        </pre>

        <h2 id="citations">Getting citations right</h2>
        <p>
          Citations are what make RAG trustworthy. Because every chunk carries a{" "}
          <code>source</code> in its metadata, you can render footnotes that link
          back to the original document and page. If a claim has no supporting
          chunk, instruct the model to say so rather than guess — hallucinations
          drop sharply once “I don’t know” is an allowed answer.
        </p>

        <h2 id="performance">Performance and cost notes</h2>
        <ul>
          <li>
            Cache query embeddings; repeated questions should never re-embed.
          </li>
          <li>
            Re-rank the top 20 candidates down to 4 with a cross-encoder when
            precision matters.
          </li>
          <li>
            Running LLaMA 3.2 locally means your only cost is electricity — no
            per-token billing as traffic scales.
          </li>
        </ul>

        <h2 id="takeaways">Key takeaways</h2>
        <ul>
          <li>Own the four levers: chunking, embeddings, retrieval, prompt.</li>
          <li>Store source metadata from day one so citations are free.</li>
          <li>Local models remove API cost and keep data in-house.</li>
        </ul>

        <p>
          Want a grounded, private RAG assistant trained on your own knowledge
          base? That is core to our{" "}
          <Link to="/services">AI &amp; Machine Learning practice</Link> —{" "}
          <Link to="/contact">talk to our engineers</Link> about a pilot.
        </p>
      </>
    ),
  },
  {
    slug: "repository-pattern-in-every-fastapi-project",
    title: "Why We Use the Repository Pattern in Every FastAPI Project",
    description:
      "The repository pattern keeps FastAPI backends testable, swappable, and clean. Here is how we structure data access in production Python APIs — with code.",
    excerpt:
      "The architectural pattern that keeps our backends testable, swappable, and sane.",
    keywords: [
      "repository pattern",
      "FastAPI",
      "Python architecture",
      "clean architecture",
      "SQLAlchemy",
      "dependency injection",
      "testable backend",
    ],
    category: "Web Dev",
    author: "Taimoor",
    authorRole: "AI & Backend Engineer",
    date: "May 22, 2026",
    datePublished: "2026-05-22",
    dateModified: "2026-05-22",
    readTime: "6 min read",
    color: "#5B9FD4",
    Content: () => (
      <>
        <p>
          <Ext href="https://fastapi.tiangolo.com/">FastAPI</Ext> makes it
          dangerously easy to query the database directly inside your route
          handlers. It works — until you need to write a test, swap an ORM, or
          reuse a query. The repository pattern is the small dose of discipline
          that keeps a growing codebase from turning into spaghetti.
        </p>

        <h2 id="what-is-it">What the repository pattern actually is</h2>
        <p>
          A repository is a class that mediates between your domain logic and the
          data source. Your services talk to an interface like{" "}
          <code>get_user(id)</code> and never see{" "}
          <Ext href="https://www.sqlalchemy.org/">SQLAlchemy</Ext> sessions or
          raw SQL. The data layer becomes a detail you can replace without
          touching business logic — the heart of{" "}
          <Ext href="https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html">
            clean architecture
          </Ext>
          .
        </p>

        <h2 id="the-shape">The shape of it</h2>
        <pre>
          <code>{`from typing import Protocol
from sqlalchemy.orm import Session

class UserRepository(Protocol):
    def get(self, user_id: int) -> User | None: ...
    def add(self, user: User) -> User: ...

class SqlUserRepository:
    def __init__(self, db: Session):
        self.db = db

    def get(self, user_id: int) -> User | None:
        return self.db.query(User).filter(User.id == user_id).first()

    def add(self, user: User) -> User:
        self.db.add(user)
        self.db.commit()
        return user`}</code>
        </pre>

        <h2 id="di">Wiring it with FastAPI dependencies</h2>
        <p>
          FastAPI’s dependency injection makes the swap trivial. Routes depend on
          the <em>interface</em>; you decide the concrete implementation at the
          edge.
        </p>
        <pre>
          <code>{`def get_user_repo(db: Session = Depends(get_db)) -> UserRepository:
    return SqlUserRepository(db)

@app.get("/users/{user_id}")
def read_user(user_id: int, repo: UserRepository = Depends(get_user_repo)):
    user = repo.get(user_id)
    if not user:
        raise HTTPException(404)
    return user`}</code>
        </pre>

        <h2 id="payoff">The payoff</h2>
        <ul>
          <li>
            <strong>Testability</strong> — inject an in-memory fake repository
            and test services with zero database.
          </li>
          <li>
            <strong>Swappability</strong> — move from Postgres to a read replica,
            or add caching, without touching routes.
          </li>
          <li>
            <strong>Reusability</strong> — one place owns each query, so behavior
            never drifts between endpoints.
          </li>
        </ul>

        <h2 id="when-not">When not to bother</h2>
        <p>
          For a throwaway prototype or a three-endpoint internal tool, direct
          queries are fine. The pattern pays off when a project has real domain
          logic and a lifespan measured in years — which is most of what we{" "}
          <Link to="/projects">build for clients</Link>.
        </p>

        <h2 id="takeaways">Key takeaways</h2>
        <ul>
          <li>Keep ORM details out of your route handlers.</li>
          <li>Depend on interfaces; choose implementations at the edge.</li>
          <li>Reach for it when logic and longevity justify the structure.</li>
        </ul>

        <p>
          This is one of the conventions behind our{" "}
          <Link to="/services">web &amp; backend development</Link> work. Curious
          how we would structure your API? <Link to="/contact">Let’s talk</Link>.
          You might also like our take on{" "}
          <Link to="/blog/$slug" params={{ slug: "jwt-auth-fastapi-battle-tested" }}>
            JWT auth in FastAPI
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    slug: "rbac-done-right-4-roles-16-permissions",
    title: "RBAC Done Right: 4 Roles, 16 Permissions, Zero Confusion",
    description:
      "A pragmatic role-based access control (RBAC) schema you can ship this week — roles, granular permissions, and the data model that keeps authorization sane.",
    excerpt:
      "A pragmatic role-based access control schema you can ship on Monday.",
    keywords: [
      "RBAC",
      "role based access control",
      "authorization",
      "permissions",
      "security",
      "access control schema",
      "web security",
    ],
    category: "Web Dev",
    author: "Farjad",
    authorRole: "CEO & AI Engineer",
    date: "May 10, 2026",
    datePublished: "2026-05-10",
    dateModified: "2026-05-10",
    readTime: "7 min read",
    color: "#06B6D4",
    Content: () => (
      <>
        <p>
          Most authorization bugs are not exotic — they are the result of roles
          and permissions getting tangled until nobody can say who can do what.
          Role-Based Access Control (RBAC) fixes that, but only if you model it
          deliberately. Here is the compact schema we deploy: four roles, sixteen
          permissions, and one rule that prevents the usual mess.
        </p>

        <h2 id="roles-vs-permissions">Roles are not permissions</h2>
        <p>
          The single most important rule:{" "}
          <strong>never check roles in your business logic — check permissions.</strong>{" "}
          Roles are bundles of permissions that exist for human convenience. Code
          should ask “can this user <code>delete:invoice</code>?”, not “is this
          user an admin?”. When requirements change, you re-map permissions to
          roles instead of hunting through the codebase. This mirrors the{" "}
          <Ext href="https://en.wikipedia.org/wiki/Principle_of_least_privilege">
            principle of least privilege
          </Ext>
          .
        </p>

        <h2 id="the-model">The four roles</h2>
        <ul>
          <li>
            <strong>Owner</strong> — full control, including billing and member
            management.
          </li>
          <li>
            <strong>Admin</strong> — manages content and users, but not billing.
          </li>
          <li>
            <strong>Member</strong> — creates and edits their own resources.
          </li>
          <li>
            <strong>Viewer</strong> — read-only access across the workspace.
          </li>
        </ul>

        <h2 id="permissions">Permissions as verb:noun pairs</h2>
        <p>
          Name every permission as <code>action:resource</code>. It reads like
          English and scales predictably:
        </p>
        <pre>
          <code>{`PERMISSIONS = {
    "Owner":  ["*:*"],
    "Admin":  ["create:user", "read:user", "update:user", "delete:user",
               "create:project", "read:project", "update:project", "delete:project"],
    "Member": ["create:project", "read:project", "update:project", "read:user"],
    "Viewer": ["read:project", "read:user"],
}`}</code>
        </pre>

        <h2 id="enforcing">Enforcing it once</h2>
        <p>
          Centralize the check in a single dependency or middleware so individual
          endpoints stay declarative.
        </p>
        <pre>
          <code>{`def require(permission: str):
    def checker(user: User = Depends(current_user)):
        if not user.can(permission):
            raise HTTPException(403, "Forbidden")
        return user
    return checker

@app.delete("/projects/{id}")
def delete_project(id: int, user: User = Depends(require("delete:project"))):
    ...`}</code>
        </pre>

        <h2 id="pitfalls">Common pitfalls</h2>
        <ul>
          <li>
            Hard-coding <code>if role == "admin"</code> checks — the exact thing
            RBAC exists to prevent.
          </li>
          <li>
            Forgetting resource ownership — a Member should edit{" "}
            <em>their</em> project, not everyone’s. Combine RBAC with a simple
            ownership check.
          </li>
          <li>
            No audit trail. Log every denied request; it is your earliest signal
            of both bugs and intrusions.
          </li>
        </ul>

        <h2 id="takeaways">Key takeaways</h2>
        <ul>
          <li>Check permissions, never roles, in application code.</li>
          <li>Model permissions as <code>action:resource</code> pairs.</li>
          <li>Enforce in one place; layer ownership on top of RBAC.</li>
        </ul>

        <p>
          Authorization is foundational to every product on our{" "}
          <Link to="/services">development services</Link>. If you want a
          security review or a clean RBAC rebuild,{" "}
          <Link to="/contact">get in touch</Link>.
        </p>
      </>
    ),
  },
  {
    slug: "local-ai-vs-api-ollama-vs-openai",
    title: "Local AI vs. API: When to Use Ollama Instead of OpenAI",
    description:
      "A cost, latency, and privacy comparison of running local LLMs with Ollama versus calling the OpenAI API — based on real client projects.",
    excerpt:
      "A cost, latency, and privacy comparison from real client projects.",
    keywords: [
      "Ollama",
      "OpenAI",
      "local LLM",
      "self-hosted AI",
      "LLM cost",
      "AI privacy",
      "inference",
    ],
    category: "AI & ML",
    author: "Mateen",
    authorRole: "AI Engineer",
    date: "Apr 28, 2026",
    datePublished: "2026-04-28",
    dateModified: "2026-04-28",
    readTime: "5 min read",
    color: "#10B981",
    Content: () => (
      <>
        <p>
          “Should we use the OpenAI API or run a model locally?” is the question
          we field most often. The honest answer is: it depends on three
          variables — cost, latency, and privacy. Here is the framework we use to
          decide, drawn from shipping both architectures in production.
        </p>

        <h2 id="cost">Cost</h2>
        <p>
          Hosted APIs like <Ext href="https://platform.openai.com/docs">OpenAI</Ext>{" "}
          charge per token. That is wonderful at low volume and brutal at scale.{" "}
          <Ext href="https://ollama.com/">Ollama</Ext> running an open model such
          as LLaMA or Mistral flips the equation: a fixed hardware cost, then
          effectively free inference. If you process millions of tokens a day,
          local inference often pays for the GPU within weeks.
        </p>

        <h2 id="latency">Latency</h2>
        <p>
          Local models remove network round-trips and rate limits — great for
          tight, interactive loops. But a frontier hosted model can still be
          faster per token than a large local model on modest hardware. Match the
          model size to your GPU; a quantized 8B model on a consumer card is
          snappy, a 70B model is not.
        </p>

        <h2 id="privacy">Privacy and compliance</h2>
        <p>
          This is frequently the deciding factor. When data cannot leave your
          infrastructure — patient records, legal documents, proprietary code —
          local inference is not an optimization, it is a requirement. We covered
          how this shapes a private knowledge assistant in our{" "}
          <Link to="/blog/$slug" params={{ slug: "rag-pipeline-from-scratch-chromadb-llama" }}>
            RAG pipeline guide
          </Link>
          .
        </p>

        <h2 id="quality">A note on quality</h2>
        <p>
          Frontier hosted models still lead on the hardest reasoning tasks. Open
          models have closed the gap dramatically for summarization, extraction,
          classification, and RAG — which is the majority of real product work.
          Benchmark on <em>your</em> task, not a leaderboard.
        </p>

        <h2 id="decision">The decision matrix</h2>
        <ul>
          <li>
            <strong>Choose a hosted API</strong> for low volume, fast iteration,
            or when you need top-tier reasoning today.
          </li>
          <li>
            <strong>Choose local (Ollama)</strong> for high volume, strict
            privacy, predictable cost, or offline deployment.
          </li>
          <li>
            <strong>Go hybrid</strong> — route easy requests locally and escalate
            hard ones to an API. Best of both worlds.
          </li>
        </ul>

        <h2 id="takeaways">Key takeaways</h2>
        <ul>
          <li>Cost favors local at scale; APIs win for low volume.</li>
          <li>Privacy requirements can make local the only option.</li>
          <li>Benchmark on your real task before committing.</li>
        </ul>

        <p>
          We design <Link to="/services">AI systems</Link> around your actual
          constraints, not hype.{" "}
          <Link to="/contact">Tell us about your workload</Link> and we will
          recommend the right architecture.
        </p>
      </>
    ),
  },
  {
    slug: "docker-compose-full-stack-production-template",
    title: "Docker Compose for Full-Stack Projects: Our Production Template",
    description:
      "The annotated Docker Compose template we copy into every full-stack project — web, API, Postgres, and Redis with healthchecks, volumes, and sane defaults.",
    excerpt: "The compose file we copy into every project, annotated.",
    keywords: [
      "Docker Compose",
      "full-stack",
      "DevOps",
      "containers",
      "Postgres",
      "Redis",
      "healthcheck",
      "production",
    ],
    category: "DevOps",
    author: "Taimoor",
    authorRole: "AI & Backend Engineer",
    date: "Apr 14, 2026",
    datePublished: "2026-04-14",
    dateModified: "2026-04-14",
    readTime: "9 min read",
    color: "#F59E0B",
    Content: () => (
      <>
        <p>
          A good <Ext href="https://docs.docker.com/compose/">Docker Compose</Ext>{" "}
          file is the fastest onboarding tool a team can have: clone, run one
          command, and the whole stack is alive. Here is the template we copy
          into nearly every full-stack project, with the reasoning behind each
          choice.
        </p>

        <h2 id="the-file">The template</h2>
        <pre>
          <code>{`services:
  api:
    build: ./api
    env_file: .env
    depends_on:
      db:
        condition: service_healthy
    ports: ["8000:8000"]

  web:
    build: ./web
    depends_on: [api]
    ports: ["3000:3000"]

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes: [pgdata:/var/lib/postgresql/data]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      retries: 5

  cache:
    image: redis:7-alpine
    volumes: [redisdata:/data]

volumes:
  pgdata:
  redisdata:`}</code>
        </pre>

        <h2 id="healthchecks">Healthchecks over guesswork</h2>
        <p>
          The most common Compose bug is the API starting before the database is
          ready. <code>depends_on</code> alone only waits for the container to{" "}
          <em>start</em>, not to be <em>ready</em>. Pairing it with a{" "}
          <code>healthcheck</code> and{" "}
          <code>condition: service_healthy</code> eliminates the race entirely.
        </p>

        <h2 id="volumes">Named volumes for persistence</h2>
        <p>
          Bind mounts are great for source code in development, but database data
          belongs in named volumes. They survive{" "}
          <code>docker compose down</code>, are easy to back up, and keep your
          host filesystem clean.
        </p>

        <h2 id="env">One .env, never secrets in the file</h2>
        <p>
          Keep configuration in a <code>.env</code> file that is git-ignored, and
          reference variables with <code>${"{VAR}"}</code>. Never commit
          credentials into the compose file itself — a rule that overlaps with
          our broader take on{" "}
          <Link to="/blog/$slug" params={{ slug: "rbac-done-right-4-roles-16-permissions" }}>
            access control and security
          </Link>
          .
        </p>

        <h2 id="dev-prod">Dev and prod from one base</h2>
        <p>
          Use a base <code>compose.yaml</code> and override it with{" "}
          <code>compose.override.yaml</code> for local hot-reload, or a{" "}
          <code>compose.prod.yaml</code> for production builds. You keep one
          source of truth and layer environment-specific changes on top.
        </p>

        <h2 id="takeaways">Key takeaways</h2>
        <ul>
          <li>Use healthchecks + conditions to kill startup races.</li>
          <li>Persist data in named volumes, not bind mounts.</li>
          <li>Keep secrets in a git-ignored <code>.env</code>.</li>
          <li>Layer dev/prod with override files.</li>
        </ul>

        <p>
          Reliable infrastructure is the backbone of our{" "}
          <Link to="/services">Cloud &amp; DevOps services</Link>. Need a
          containerization or CI/CD setup that just works?{" "}
          <Link to="/contact">Reach out</Link>.
        </p>
      </>
    ),
  },
  {
    slug: "designing-for-developers-ui-engineers-use",
    title: "Designing for Developers: Building UI That Engineers Actually Use",
    description:
      "Lessons from designing dashboards and tools for engineering teams — density, keyboard-first flows, and the UX principles that make developer tools stick.",
    excerpt:
      "Lessons from designing dashboards used by engineering teams.",
    keywords: [
      "developer experience",
      "UI design",
      "UX",
      "developer tools",
      "dashboard design",
      "design systems",
      "accessibility",
    ],
    category: "Design",
    author: "Farjad",
    authorRole: "CEO & AI Engineer",
    date: "Apr 3, 2026",
    datePublished: "2026-04-03",
    dateModified: "2026-04-03",
    readTime: "6 min read",
    color: "#5B9FD4",
    Content: () => (
      <>
        <p>
          Designing for developers is its own discipline. Engineers are
          power-users who value speed and information density over whitespace and
          delight animations. After building several internal tools and
          dashboards, here is what consistently works — and what gets ignored.
        </p>

        <h2 id="density">Respect density</h2>
        <p>
          Consumer apps breathe; developer tools pack. An engineer scanning logs
          or metrics wants more signal per screen, not a generous hero section.
          Default to compact tables, monospace for data, and tight vertical
          rhythm. You can always offer a comfortable mode — but dense is the
          right default.
        </p>

        <h2 id="keyboard">Keyboard-first everything</h2>
        <p>
          The fastest way to win a developer’s trust is a command palette and
          real keyboard shortcuts. If a frequent action requires reaching for the
          mouse, it is too slow. Follow established conventions — and lean on{" "}
          <Ext href="https://www.w3.org/WAI/ARIA/apg/">ARIA authoring practices</Ext>{" "}
          so focus management and shortcuts stay accessible.
        </p>

        <h2 id="states">Design the unhappy paths</h2>
        <p>
          Developers live in error states. Empty states, loading skeletons,
          permission-denied screens, and especially{" "}
          <strong>useful error messages</strong> are where developer UX is won or
          lost. An error that names the problem and the fix is worth more than any
          gradient.
        </p>

        <h2 id="system">Ship a system, not screens</h2>
        <p>
          Consistency is a feature. A small{" "}
          <Ext href="https://www.figma.com/">Figma</Ext> design system — tokens
          for color, spacing, and type, plus a handful of components — lets
          engineers build new screens that already look right. This is exactly how
          we keep velocity high without visual drift, and it pairs with the
          frontend conventions in our{" "}
          <Link to="/blog/$slug" params={{ slug: "repository-pattern-in-every-fastapi-project" }}>
            backend architecture posts
          </Link>
          .
        </p>

        <h2 id="accessibility">Accessibility is not optional</h2>
        <p>
          Sufficient contrast, focus rings, and semantic markup help everyone,
          power-users included. Aim for{" "}
          <Ext href="https://www.w3.org/WAI/standards-guidelines/wcag/">
            WCAG 2.1 AA
          </Ext>{" "}
          as a baseline, not an afterthought.
        </p>

        <h2 id="takeaways">Key takeaways</h2>
        <ul>
          <li>Default to density; offer comfort as an option.</li>
          <li>Make every frequent action keyboard-reachable.</li>
          <li>Invest in error and empty states.</li>
          <li>Ship a token-driven design system.</li>
        </ul>

        <p>
          Great developer tools start with great design. Explore our{" "}
          <Link to="/services">UI/UX design services</Link> or{" "}
          <Link to="/contact">tell us what you are building</Link>.
        </p>
      </>
    ),
  },
  {
    slug: "mermaid-js-ai-diagrams-from-natural-language",
    title: "Mermaid.js + AI: Generating Diagrams from Natural Language",
    description:
      "How we turn a single sentence into a system diagram using Mermaid.js and an LLM — the prompt design, validation loop, and rendering pipeline behind DiagramAI Studio.",
    excerpt: "How DiagramAI Studio turns one sentence into a system diagram.",
    keywords: [
      "Mermaid.js",
      "AI diagrams",
      "text to diagram",
      "LLM",
      "natural language",
      "diagram generation",
      "developer tools",
    ],
    category: "AI & ML",
    author: "Farjad",
    authorRole: "CEO & AI Engineer",
    date: "Mar 19, 2026",
    datePublished: "2026-03-19",
    dateModified: "2026-03-19",
    readTime: "7 min read",
    color: "#8B5CF6",
    Content: () => (
      <>
        <p>
          Diagrams are how engineers think, but drawing them is tedious.{" "}
          <Ext href="https://mermaid.js.org/">Mermaid.js</Ext> renders diagrams
          from plain text, which makes it the perfect output target for an LLM.
          Combine the two and you can turn “a user signs up, we email them, then
          create a Stripe customer” into a flowchart in seconds. Here is how we
          built it.
        </p>

        <h2 id="why-mermaid">Why Mermaid is the ideal target</h2>
        <p>
          LLMs are excellent at producing structured text and far less reliable at
          pixel-perfect layout. Mermaid lets the model do what it is good at —
          emit a concise, declarative description — while a deterministic renderer
          handles layout. The model writes syntax; Mermaid draws.
        </p>

        <h2 id="prompt">Designing the prompt</h2>
        <p>
          The trick is constraining the model to valid Mermaid and a single
          diagram type per request. We give it the grammar, one worked example,
          and a hard instruction to return only a fenced code block.
        </p>
        <pre>
          <code>{`SYSTEM = """You convert descriptions into valid Mermaid 'flowchart TD'.
Rules:
- Output ONLY a mermaid code block, nothing else.
- Use short node ids (A, B, C) with descriptive labels.
- Never invent steps the user did not mention.
"""`}</code>
        </pre>

        <h2 id="validation">The validation loop</h2>
        <p>
          Models occasionally emit invalid syntax. Rather than show the user an
          error, we parse the output with Mermaid’s own parser; if it throws, we
          send the error back to the model and ask it to fix the diagram. One
          retry resolves the vast majority of failures.
        </p>
        <pre>
          <code>{`import mermaid from "mermaid";

async function safeRender(code: string) {
  try {
    await mermaid.parse(code);          // throws on invalid syntax
    return await mermaid.render("id", code);
  } catch (err) {
    return repairWithLLM(code, String(err)); // one-shot self-heal
  }
}`}</code>
        </pre>

        <h2 id="rendering">Rendering safely on the client</h2>
        <p>
          Mermaid renders to SVG in the browser. Sanitize the output and render in
          a sandboxed container so untrusted input can never inject scripts —
          standard hygiene whenever you turn model output into markup.
        </p>

        <h2 id="local">Run it fully local</h2>
        <p>
          Because the model only needs to emit short structured text, a small
          local model handles it well — no API bill for what can become a very
          chatty feature. We discuss that trade-off in depth in our{" "}
          <Link to="/blog/$slug" params={{ slug: "local-ai-vs-api-ollama-vs-openai" }}>
            local AI vs. API guide
          </Link>
          .
        </p>

        <h2 id="takeaways">Key takeaways</h2>
        <ul>
          <li>Let the LLM emit text; let Mermaid handle layout.</li>
          <li>Constrain output to one diagram type and a code block.</li>
          <li>Add a parse-and-repair loop for reliability.</li>
          <li>Sanitize before rendering model-generated markup.</li>
        </ul>

        <p>
          Want an AI feature like this inside your product? It is exactly the kind
          of thing our <Link to="/services">AI engineering team</Link> ships.{" "}
          <Link to="/contact">Start a conversation</Link>.
        </p>
      </>
    ),
  },
  {
    slug: "jwt-auth-fastapi-battle-tested",
    title: "JWT Auth in FastAPI: Our Battle-Tested Implementation",
    description:
      "A production-ready JWT authentication setup for FastAPI — access and refresh tokens, rotation, revocation, and the security details most tutorials skip.",
    excerpt:
      "Refresh tokens, rotation, and revocation — the production setup.",
    keywords: [
      "JWT",
      "FastAPI",
      "authentication",
      "refresh tokens",
      "token rotation",
      "OAuth2",
      "web security",
      "Python",
    ],
    category: "Web Dev",
    author: "Taimoor",
    authorRole: "AI & Backend Engineer",
    date: "Mar 8, 2026",
    datePublished: "2026-03-08",
    dateModified: "2026-03-08",
    readTime: "10 min read",
    color: "#3B82F6",
    Content: () => (
      <>
        <p>
          Most JWT tutorials stop at “here is how to sign a token.” Production
          needs more: short-lived access tokens, refresh tokens, rotation, and a
          revocation story. Here is the FastAPI auth setup we actually ship, and
          the reasoning behind each decision.
        </p>

        <h2 id="two-tokens">Two tokens, two jobs</h2>
        <p>
          Use a <strong>short-lived access token</strong> (minutes) for API
          requests and a <strong>long-lived refresh token</strong> (days) to mint
          new access tokens. If an access token leaks, it expires fast; the
          refresh token lives in an <code>HttpOnly</code> cookie where JavaScript
          cannot read it.
        </p>
        <pre>
          <code>{`from datetime import datetime, timedelta, timezone
import jwt  # PyJWT

def make_token(sub: str, minutes: int, secret: str) -> str:
    now = datetime.now(timezone.utc)
    payload = {"sub": sub, "iat": now, "exp": now + timedelta(minutes=minutes)}
    return jwt.encode(payload, secret, algorithm="HS256")`}</code>
        </pre>

        <h2 id="rotation">Refresh token rotation</h2>
        <p>
          Every time a refresh token is used, issue a new one and invalidate the
          old. If an attacker replays a stolen-but-already-rotated token, you
          detect reuse and can revoke the entire session family. This is the
          single highest-leverage upgrade over naive JWT auth.
        </p>

        <h2 id="revocation">The revocation problem</h2>
        <p>
          JWTs are stateless, which is great for scale and awkward for logout. The
          pragmatic answer is a small denylist (or a per-user token version) in{" "}
          <Ext href="https://redis.io/">Redis</Ext>: check it on refresh, keep
          access tokens short so the window of risk is tiny. We wire Redis in via
          our standard{" "}
          <Link to="/blog/$slug" params={{ slug: "docker-compose-full-stack-production-template" }}>
            Docker Compose template
          </Link>
          .
        </p>

        <h2 id="cookies">Storage: cookies vs localStorage</h2>
        <ul>
          <li>
            <strong>Refresh token</strong> →{" "}
            <code>HttpOnly; Secure; SameSite=Strict</code> cookie. Inaccessible to
            JS, which neutralizes XSS token theft.
          </li>
          <li>
            <strong>Access token</strong> → memory on the client. Never{" "}
            <code>localStorage</code>, which is readable by any injected script.
          </li>
        </ul>

        <h2 id="hardening">Hardening checklist</h2>
        <ul>
          <li>Always set <code>exp</code>; validate it on every request.</li>
          <li>Pin the algorithm — reject <code>alg: none</code> outright.</li>
          <li>Rotate signing secrets and support a key id (<code>kid</code>).</li>
          <li>Rate-limit the login and refresh endpoints.</li>
        </ul>
        <p>
          For the broader threat model, the{" "}
          <Ext href="https://owasp.org/www-project-top-ten/">OWASP Top 10</Ext> is
          the reference we hold our auth code against.
        </p>

        <h2 id="takeaways">Key takeaways</h2>
        <ul>
          <li>Short access tokens + long refresh tokens, in an HttpOnly cookie.</li>
          <li>Rotate refresh tokens and detect reuse.</li>
          <li>Use a Redis denylist for real logout/revocation.</li>
          <li>Pin the algorithm and follow OWASP.</li>
        </ul>

        <p>
          Authentication is too important to improvise. Our{" "}
          <Link to="/services">backend engineering team</Link> ships this setup as
          a baseline — <Link to="/contact">talk to us</Link> about hardening your
          API. See also our{" "}
          <Link to="/blog/$slug" params={{ slug: "rbac-done-right-4-roles-16-permissions" }}>
            RBAC guide
          </Link>{" "}
          for what comes after authentication.
        </p>
      </>
    ),
  },
];

export function getPostCoverImage(post: BlogPost): string {
  return post.coverImage ?? blogCoverPath(post.slug);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return BLOG_POSTS.slice(0, limit);
  const sameCat = BLOG_POSTS.filter(
    (p) => p.slug !== slug && p.category === current.category,
  );
  const others = BLOG_POSTS.filter(
    (p) => p.slug !== slug && p.category !== current.category,
  );
  return [...sameCat, ...others].slice(0, limit);
}
