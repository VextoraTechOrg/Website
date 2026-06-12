import { createFileRoute } from "@tanstack/react-router";
import SiteLayout, { PageHero, Section } from "@/components/site/SiteLayout";
import { ArrowRight, Rocket, Brain, Globe } from "lucide-react";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — VextoraTech" },
      { name: "description", content: "Open engineering roles at VextoraTech. Remote-friendly, AI-first, real products." },
      { property: "og:title", content: "Careers — VextoraTech" },
      { property: "og:description", content: "Build the future with us." },
    ],
  }),
  component: CareersPage,
});

const VALUES = [
  { icon: Rocket, title: "Ship Real Products", body: "No tutorial projects. Day one, you're building something users depend on." },
  { icon: Brain, title: "Work on AI First", body: "Every project has an AI angle. ML, RAG, LLMs — you'll use them all." },
  { icon: Globe, title: "Remote-Friendly", body: "Lahore-based, but we work async-first and hire across Pakistan." },
];

const ROLES = [
  {
    title: "Full-Stack Engineer",
    dept: "Engineering",
    location: "Remote",
    type: "Full-time",
    bullets: [
      "Build FastAPI backends and React frontends for AI-powered products",
      "Implement authentication, RBAC, and real-time systems",
      "2+ years Python and React required; Docker and PostgreSQL a strong plus",
    ],
  },
  {
    title: "AI/ML Engineer",
    dept: "AI Practice",
    location: "Remote",
    type: "Full-time",
    bullets: [
      "Design and deploy RAG pipelines, LLM integrations, and ML models",
      "Work with Ollama, ChromaDB, PyTorch, and local inference stacks",
      "Strong Python required; experience with GGUF models a plus",
    ],
  },
  {
    title: "Frontend Engineer",
    dept: "Engineering",
    location: "Remote",
    type: "Contract",
    bullets: [
      "Build pixel-perfect React/Next.js interfaces from Figma designs",
      "Implement animations, responsive layouts, and design systems",
      "Strong Tailwind CSS and TypeScript required",
    ],
  },
];

function CareersPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="JOIN US"
        title={<>Build the Future <span className="text-gradient">With Us</span></>}
        subtitle="We're a small team that punches above our weight. If you love deep technical problems and want to work on real AI products — you'll fit right in."
      />

      <Section>
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {VALUES.map((v) => (
            <div key={v.title} className="bg-surface border border-border rounded-2xl p-7">
              <div className="w-12 h-12 rounded-xl bg-gradient-brand grid place-items-center mb-4">
                <v.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">Open Roles</h2>
        <div className="space-y-5 max-w-4xl mx-auto">
          {ROLES.map((r) => (
            <div key={r.title} className="bg-surface border border-border rounded-2xl p-7 hover:border-primary transition-colors">
              <div className="grid md:grid-cols-[1fr_auto] gap-6 items-start">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">{r.title}</h3>
                    <span className="mono text-[10px] px-2 py-1 rounded-full bg-surface-2 text-primary border border-border">{r.dept}</span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">{r.location} · {r.type}</div>
                  <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                    {r.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </div>
                <a href="mailto:hello@vextoratech.com" className="shrink-0 inline-flex items-center gap-2 bg-gradient-brand text-white font-semibold rounded-xl px-5 py-3 shadow-[0_0_20px_rgba(79,142,247,0.35)]">
                  Apply Now <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}