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
  // ── Web Apps ─────────────────────────────────────────────────────────────
  {
    name: "QClose Inventory",
    cats: ["Web Apps"],
    tags: ["Next.js 13", "TypeScript", "Node.js", "Tailwind"],
    desc: "Inventory management dashboard with hardware scanner integration for product addition and retrieval, plus reporting modules for opening and closing stock levels.",
    color: "#06B6D4",
  },
  {
    name: "SWGNP",
    cats: ["Web Apps"],
    tags: ["Angular", "TypeScript", "Chart.js", "PrimeNG"],
    desc: "IoT-based web portal for remote sensing devices used by government stakeholders, with advanced search and dynamic data visualization features.",
    color: "#4F8EF7",
  },
  {
    name: "PYLI",
    cats: ["Web Apps"],
    tags: ["React.js 18", "TypeScript", "MUI", "Emotion"],
    desc: "Centralized platform for managing multiple business profiles with a customized UI tailored to client requirements.",
    color: "#7C3AED",
  },
  {
    name: "Restaurant Management System",
    cats: ["Web Apps"],
    tags: ["Angular", "TypeScript", "PrimeNG", "PrimeFlex"],
    desc: "Full-featured RMS with menu customization, orders, bookings, and billing — led frontend development of a new product version.",
    color: "#10B981",
  },
  {
    name: "Voicelinx",
    cats: ["Web Apps"],
    tags: ["Angular", "TypeScript", "PrimeNG", "REST APIs"],
    desc: "Web-based business phone system interface with bug fixes and new module implementation driven by client tickets.",
    color: "#F59E0B",
  },
  {
    name: "OMS",
    cats: ["Web Apps"],
    tags: ["React.js", "TypeScript", "Bootstrap"],
    desc: "Office Management System for administrative workflow, focused on UI development and functional feature implementation.",
    color: "#EC4899",
  },

  // ── AI / ML ──────────────────────────────────────────────────────────────
  {
    name: "Facial Recognition Attendance System",
    cats: ["AI / ML"],
    tags: ["Python", "OpenCV", "DeepFace", "FastAPI"],
    desc: "Automated employee attendance system using real-time facial recognition. Detects and identifies faces from live camera feeds, logs check-ins and check-outs, and generates attendance reports — eliminating manual tracking.",
    color: "#6366F1",
  },
  {
    name: "AI Surveillance System",
    cats: ["AI / ML"],
    tags: ["Python", "YOLOv8", "OpenCV", "WebSocket"],
    desc: "Intelligent video surveillance platform with real-time object and anomaly detection across multiple camera feeds. Triggers instant alerts for restricted zone breaches, loitering, and suspicious activity.",
    color: "#EF4444",
  },
  {
    name: "Banking Compliance & Policy Assistant",
    cats: ["AI / ML"],
    tags: ["RAG", "LangChain", "OpenAI", "ChromaDB"],
    desc: "RAG-powered assistant that lets compliance teams query internal banking policies, regulatory documents, and audit guidelines in natural language — with cited, auditable responses.",
    color: "#0EA5E9",
  },
  {
    name: "Medical Knowledge Assistant",
    cats: ["AI / ML"],
    tags: ["RAG", "LLaMA 3", "FAISS", "FastAPI"],
    desc: "AI assistant trained on medical literature and clinical guidelines, enabling healthcare professionals to retrieve drug information, diagnostic criteria, and treatment protocols through conversational queries.",
    color: "#10B981",
  },
  {
    name: "MedAssist AI",
    cats: ["AI / ML"],
    tags: ["OpenAI", "Next.js", "Node.js", "MongoDB"],
    desc: "Patient-facing medical chatbot that triages symptoms, answers health queries, and guides users to appropriate care pathways. Integrates with appointment systems for seamless handoff to human providers.",
    color: "#14B8A6",
  },
  {
    name: "Voice Intelligence Hub",
    cats: ["AI / ML"],
    tags: ["Whisper", "Python", "NLP", "FastAPI"],
    desc: "End-to-end voice analytics platform that transcribes, diarizes, and analyzes call recordings. Extracts sentiment, key topics, and action items — built for contact centers and sales teams.",
    color: "#A855F7",
  },
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

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground pb-20">No projects in this category yet.</p>
        )}
      </div>
    </SiteLayout>
  );
}