import { createFileRoute } from "@tanstack/react-router";
import SiteLayout, { PageHero, Section } from "@/components/site/SiteLayout";
import { ArrowRight, Clock } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — VextoraTech" },
      { name: "description", content: "Engineering insights on AI, full-stack patterns, and DevOps from the VextoraTech team." },
      { property: "og:title", content: "VextoraTech Engineering Blog" },
      { property: "og:description", content: "We write about what we build." },
    ],
  }),
  component: BlogPage,
});

const CATEGORIES = ["All", "AI & ML", "Web Dev", "DevOps", "Design", "Engineering"] as const;
type Cat = typeof CATEGORIES[number];

const POSTS: { title: string; cat: Cat; excerpt: string; author: string; date: string; read: string; color: string }[] = [
  { title: "Building a RAG Pipeline from Scratch with ChromaDB and LLaMA 3.2", cat: "AI & ML", excerpt: "How we built a local-first RAG system with citations, embeddings, and zero API cost.", author: "Farjad", date: "Jun 5, 2026", read: "8 min read", color: "#4F8EF7" },
  { title: "Why We Use Repository Pattern in Every FastAPI Project", cat: "Web Dev", excerpt: "The architectural pattern that keeps our backends testable, swappable, and sane.", author: "Taimoor", date: "May 22, 2026", read: "6 min read", color: "#7C3AED" },
  { title: "RBAC Done Right: 4 Roles, 16 Permissions, Zero Confusion", cat: "Web Dev", excerpt: "A pragmatic role-based access control schema you can ship on Monday.", author: "Farjad", date: "May 10, 2026", read: "7 min read", color: "#06B6D4" },
  { title: "Local AI vs. API: When to Use Ollama Instead of OpenAI", cat: "AI & ML", excerpt: "A cost, latency, and privacy comparison from real client projects.", author: "Mateen", date: "Apr 28, 2026", read: "5 min read", color: "#10B981" },
  { title: "Docker Compose for Full-Stack Projects: Our Production Template", cat: "DevOps", excerpt: "The compose file we copy into every project, annotated.", author: "Taimoor", date: "Apr 14, 2026", read: "9 min read", color: "#F59E0B" },
  { title: "Designing for Developers: Building UI That Engineers Actually Use", cat: "Design", excerpt: "Lessons from designing dashboards used by engineering teams.", author: "Farjad", date: "Apr 3, 2026", read: "6 min read", color: "#EC4899" },
  { title: "Mermaid.js + AI: Generating Diagrams from Natural Language", cat: "AI & ML", excerpt: "How DiagramAI Studio turns one sentence into a system diagram.", author: "Farjad", date: "Mar 19, 2026", read: "7 min read", color: "#8B5CF6" },
  { title: "JWT Auth in FastAPI: Our Battle-Tested Implementation", cat: "Web Dev", excerpt: "Refresh tokens, rotation, and revocation — the production setup.", author: "Taimoor", date: "Mar 8, 2026", read: "10 min read", color: "#3B82F6" },
];

function BlogPage() {
  const [active, setActive] = useState<Cat>("All");
  const filtered = active === "All" ? POSTS : POSTS.filter((p) => p.cat === active);
  const featured = POSTS[0];

  return (
    <SiteLayout>
      <PageHero
        eyebrow="INSIGHTS"
        title={<>The VextoraTech <span className="text-gradient">Engineering Blog</span></>}
        subtitle="We write about what we build. AI, full-stack patterns, DevOps, and the occasional hard lesson."
      />

      <Section>
        <div className="bg-surface border border-border rounded-3xl overflow-hidden grid lg:grid-cols-2 mb-12">
          <div className="relative aspect-[16/10] lg:aspect-auto" style={{ background: `linear-gradient(135deg, ${featured.color}40, ${featured.color}10)` }}>
            <div className="absolute inset-0 dot-grid opacity-30" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="w-24 h-24 rounded-3xl grid place-items-center text-3xl font-black text-white" style={{ background: featured.color }}>{featured.title.charAt(0)}</div>
            </div>
          </div>
          <div className="p-10 flex flex-col justify-center">
            <span className="mono text-xs text-primary mb-3">FEATURED · {featured.cat}</span>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3 leading-tight">{featured.title}</h2>
            <p className="text-muted-foreground mb-5">{featured.excerpt}</p>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
              <span>{featured.author}</span> · <span>{featured.date}</span> · <span>{featured.read}</span>
            </div>
            <a href="#" className="inline-flex items-center gap-2 text-primary font-semibold">
              Read Article <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === c ? "bg-gradient-brand text-white" : "border border-border text-muted-foreground hover:border-primary hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <a key={p.title} href="#" className="group bg-surface border border-border rounded-2xl overflow-hidden hover:-translate-y-1 hover:border-primary transition-all">
              <div className="aspect-[16/9] relative" style={{ background: `linear-gradient(135deg, ${p.color}40, ${p.color}10)` }}>
                <div className="absolute inset-0 dot-grid opacity-30" />
              </div>
              <div className="p-6">
                <span className="mono text-[10px] text-primary">{p.cat}</span>
                <h3 className="text-lg font-bold mt-2 mb-2 leading-snug">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{p.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{p.author} · {p.date}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {p.read}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16 bg-surface-2 border border-border rounded-3xl p-10 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 dot-grid opacity-5" />
          <div className="relative">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-3">Get our engineering posts in your inbox.</h3>
            <p className="text-muted-foreground mb-6">No fluff, no spam — just stuff we'd want to read.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="you@company.com" className="flex-1 bg-surface border border-border rounded-lg px-4 py-3 focus:border-primary outline-none" />
              <button className="bg-gradient-brand text-white font-semibold rounded-lg px-6 py-3">Subscribe</button>
            </form>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}