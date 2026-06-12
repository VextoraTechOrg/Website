import { createFileRoute, Link } from "@tanstack/react-router";
import SiteLayout, { PageHero } from "@/components/site/SiteLayout";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — VextoraTech" },
      { name: "description", content: "Case studies from VextoraTech — AI, web, mobile, and cloud products shipped for real teams." },
      { property: "og:title", content: "Projects — VextoraTech" },
      { property: "og:description", content: "Real problems. Real solutions. Real results." },
    ],
  }),
  component: ProjectsPage,
});

const CATEGORIES = ["All", "AI / ML", "Web Apps", "Mobile", "Cloud", "Design"] as const;
type Cat = typeof CATEGORIES[number];

const PROJECTS: { name: string; cats: Cat[]; tags: string[]; desc: string; color: string }[] = [
  { name: "DiagramAI Studio", cats: ["AI / ML", "Web Apps"], tags: ["React", "FastAPI", "Ollama", "ComfyUI", "Mermaid.js"], desc: "Enterprise diagram and image generation platform with 4-role RBAC, strategy-pattern generation engine, and dual-model support.", color: "#4F8EF7" },
  { name: "EduRAG Learning Assistant", cats: ["AI / ML", "Web Apps"], tags: ["RAG", "ChromaDB", "LLaMA 3.2", "Next.js"], desc: "Conversational RAG system that lets students query course materials with citations. Zero-API-cost local architecture.", color: "#7C3AED" },
  { name: "PulseRetail Analytics", cats: ["Web Apps", "Cloud"], tags: ["React", "Node.js", "PostgreSQL", "Redis"], desc: "Real-time sales analytics dashboard with multi-location support, role-based views, and automated PDF reports.", color: "#06B6D4" },
  { name: "MedaFlow Patient System", cats: ["Web Apps", "Cloud"], tags: ["Next.js", "AWS RDS", "Twilio"], desc: "Patient intake, scheduling, and EMR for a hospital network. SMS reminders and secure medical records integrations.", color: "#10B981" },
  { name: "AeroStack Fleet Tracker", cats: ["Mobile", "Cloud"], tags: ["React Native", "FastAPI", "WebSocket"], desc: "Real-time fleet tracking app for 200+ vehicles. Live GPS, driver scoring, fuel monitoring, maintenance alerts.", color: "#F59E0B" },
  { name: "HireBase ATS", cats: ["Web Apps"], tags: ["React", "Django", "PostgreSQL", "Celery"], desc: "Applicant tracking with resume parsing, pipeline kanban, automated emails, and Google Calendar interview scheduling.", color: "#EC4899" },
  { name: "SwiftLog Warehouse", cats: ["Web Apps", "Mobile"], tags: ["React", "React Native", "Barcode API"], desc: "Warehouse inventory and fulfilment with mobile barcode scanning, real-time stock, and courier label printing.", color: "#8B5CF6" },
  { name: "FinLeap Investment Portal", cats: ["Web Apps", "Cloud"], tags: ["Next.js", "Stripe", "Chart.js", "AWS"], desc: "Portfolio management portal with SEC-compliant document vault, live charts, and Stripe subscription billing.", color: "#3B82F6" },
];

function ProjectsPage() {
  const [active, setActive] = useState<Cat>("All");
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.cats.includes(active));

  return (
    <SiteLayout>
      <PageHero
        eyebrow="CASE STUDIES"
        title={<>Work We're <span className="text-gradient">Proud Of</span></>}
        subtitle="Real problems. Real solutions. Real results."
      />

      <div className="container-px">
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                active === c
                  ? "bg-gradient-brand text-white"
                  : "border border-border text-muted-foreground hover:text-foreground hover:border-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {filtered.map((p) => (
            <Link key={p.name} to="/projects" className="group bg-surface border border-border rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:border-primary transition-all">
              <div
                className="aspect-[16/10] relative"
                style={{ background: `linear-gradient(135deg, ${p.color}33, ${p.color}11)` }}
              >
                <div className="absolute inset-0 dot-grid opacity-30" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="w-20 h-20 rounded-2xl grid place-items-center text-2xl font-black text-white" style={{ background: p.color }}>
                    {p.name.charAt(0)}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {p.tags.slice(0, 4).map((t) => (
                    <span key={t} className="mono text-[10px] px-2 py-1 rounded-full bg-surface-2 text-muted-foreground border border-border">{t}</span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-1.5">{p.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{p.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                  View Case Study <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}