import { createFileRoute, Link } from "@tanstack/react-router";
import SiteLayout, { PageHero, Section } from "@/components/site/SiteLayout";
import { ArrowRight, Brain, Code2, Smartphone, Cloud, Palette, Plug, Check } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — VextoraTech" },
      { name: "description", content: "AI, web, mobile, cloud, design, and API development. Full lifecycle from strategy to scale." },
      { property: "og:title", content: "Services — VextoraTech" },
      { property: "og:description", content: "Full lifecycle product development for ambitious teams." },
    ],
  }),
  component: ServicesPage,
});

const SERVICES = [
  {
    icon: Brain,
    name: "AI & Machine Learning",
    body: "We design and ship production AI systems — not demos. From LLM-powered features to custom vision pipelines, we build for accuracy, latency, and cost.",
    bullets: [
      "LLM fine-tuning and prompt engineering (GPT-4, Claude, Llama, Mistral)",
      "Retrieval-Augmented Generation (RAG) with ChromaDB, Pinecone, Weaviate",
      "Computer vision pipelines (object detection, OCR, image classification)",
      "Predictive analytics and time-series forecasting",
      "Local AI stacks (Ollama, ComfyUI, GGUF) — zero API cost architecture",
    ],
  },
  {
    icon: Code2,
    name: "Web Development",
    body: "Fast, type-safe, production-grade web apps. We follow patterns we'd defend in a code review — not what's trending on Twitter.",
    bullets: [
      "React, Next.js, Vite — component-driven frontends",
      "FastAPI, Node.js, Django — high-performance backends",
      "PostgreSQL, MySQL, MongoDB — data architecture",
      "REST & GraphQL APIs with full documentation",
      "Authentication: JWT, OAuth2, RBAC systems",
    ],
  },
  {
    icon: Smartphone,
    name: "Mobile App Development",
    body: "Single codebase, native feel. Cross-platform apps shipped to App Store and Play Store with the polish your brand deserves.",
    bullets: [
      "React Native and Flutter cross-platform apps",
      "iOS App Store + Google Play deployment",
      "Offline-first architecture with sync",
      "Push notifications, biometrics, camera integrations",
      "App performance profiling and optimization",
    ],
  },
  {
    icon: Cloud,
    name: "Cloud & DevOps",
    body: "Infrastructure that scales when you do and costs what it should. Real observability, real rollback, real SLOs.",
    bullets: [
      "AWS, GCP, Azure — architecture and cost optimization",
      "Docker and Kubernetes container orchestration",
      "CI/CD pipelines (GitHub Actions, GitLab, Jenkins)",
      "Infrastructure as Code (Terraform, Ansible)",
      "Monitoring: Grafana, Prometheus, Sentry",
    ],
  },
  {
    icon: Palette,
    name: "UI/UX Design",
    body: "Design grounded in research and shipped as a system. Interfaces that move users — and that engineers can build without rework.",
    bullets: [
      "User research, personas, and journey mapping",
      "Wireframes and interactive Figma prototypes",
      "Design systems and component libraries",
      "Accessibility audits (WCAG 2.1 AA)",
      "Handoff-ready specs for development",
    ],
  },
  {
    icon: Plug,
    name: "API Development & Integrations",
    body: "APIs that other engineers actually enjoy using. Documented, versioned, rate-limited, and built to last.",
    bullets: [
      "RESTful API design following OpenAPI 3.0 spec",
      "GraphQL schemas and resolvers",
      "Webhook systems and event-driven architecture",
      "Third-party integrations: Stripe, Twilio, SendGrid, HubSpot",
      "API gateway and rate limiting setup",
    ],
  },
];

const TECH = ["React", "Next.js", "Node.js", "FastAPI", "Python", "PostgreSQL", "Redis", "Docker", "AWS", "GCP", "Figma", "React Native", "Flutter", "TensorFlow", "PyTorch", "Ollama"];

function ServicesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="SERVICES"
        title={<>Everything You Need to <span className="text-gradient">Ship Great Software</span></>}
        subtitle="We cover the full product lifecycle — from strategy and design to development, AI integration, and cloud deployment."
      />

      <div className="container-px">
        {SERVICES.map((s, i) => (
          <div key={s.name} className={`grid lg:grid-cols-2 gap-12 items-center py-20 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <div>
              <span className="mono text-xs text-primary">0{i + 1} — SERVICE</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-4">{s.name}</h2>
              <p className="text-muted-foreground mb-6">{s.body}</p>
              <ul className="space-y-3 mb-7">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-sm">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="inline-flex items-center gap-2 text-primary font-semibold">
                Talk to us about {s.name} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/15 blur-3xl rounded-3xl" aria-hidden />
              <div className="relative bg-surface border border-border rounded-2xl p-10 aspect-[4/3] grid place-items-center">
                <div className="w-24 h-24 rounded-3xl bg-gradient-brand grid place-items-center">
                  <s.icon className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Section eyebrow="STACK" title="Technologies We Work With">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {TECH.map((t) => (
            <div key={t} className="bg-surface border border-border rounded-xl px-4 py-5 text-center text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary transition-colors">
              {t}
            </div>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}