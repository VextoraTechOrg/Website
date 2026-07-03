import { createFileRoute, Link } from "@tanstack/react-router";
import SiteLayout, { PageHero, Section } from "@/components/site/SiteLayout";
import { ArrowRight, Brain, Code2, Smartphone, Cloud, Palette, Plug, Check } from "lucide-react";
import { PRIMARY_CTA } from "@/lib/site-copy";

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
    // TODO: replace with a real product screenshot (e.g. surveillance dashboard or RAG admin UI)
    image: "/services-ai-machine-learning.jpg",
    body: "We design and ship production AI systems — not demos. Computer vision, voice pipelines, and RAG are areas we build and deploy regularly.",
    bullets: [
      "Computer vision: object detection, OCR, ANPR, and face recognition pipelines",
      "Voice AI: Whisper transcription, diarization, and call analytics",
      "Retrieval-Augmented Generation (RAG) with vector search",
      "Local inference stacks (Ollama, GGUF) for cost-controlled deployments",
      "Model integration via OpenAI-compatible and open-weight APIs",
    ],
  },
  {
    icon: Code2,
    name: "Web Development",
    image: "/website-development-links-seo-webinar-cyberspace-concept.jpg",
    body: "Fast, type-safe, production-grade web apps. We follow patterns we'd defend in a code review — not what's trending on Twitter.",
    bullets: [
      "React, Next.js, TanStack Start — component-driven frontends",
      "FastAPI, Node.js — high-performance backends",
      "PostgreSQL, MongoDB — data architecture",
      "REST & GraphQL APIs with full documentation",
      "Authentication: JWT, OAuth2, RBAC systems",
    ],
  },
  {
    icon: Smartphone,
    name: "Mobile App Development",
    // TODO: replace with a real mobile app screenshot
    image: "/services-mobile-development.jpg",
    body: "Cross-platform apps with native-quality UX. We scope honestly — mobile is in our stack where the product calls for it.",
    bullets: [
      "React Native and Flutter cross-platform apps",
      "App Store and Play Store deployment support",
      "Offline-first architecture with sync",
      "Push notifications, biometrics, camera integrations",
      "Performance profiling and optimization",
    ],
  },
  {
    icon: Cloud,
    name: "Cloud & DevOps",
    image: "/cloud.png",
    body: "Infrastructure that scales when you do and costs what it should. Real observability, rollback paths, and deployment automation.",
    bullets: [
      "AWS, GCP, Azure — architecture and cost optimization",
      "Docker and Kubernetes container orchestration",
      "CI/CD pipelines (GitHub Actions, GitLab)",
      "Infrastructure as Code (Terraform)",
      "Monitoring: Grafana, Prometheus, Sentry",
    ],
  },
  {
    icon: Palette,
    name: "UI/UX Design",
    image: "/UI_UX.png",
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
    // TODO: replace with a real API dashboard or integration diagram screenshot
    image: "/services-api-integrations.jpg",
    body: "APIs that other engineers actually enjoy using. Documented, versioned, and built to last.",
    bullets: [
      "RESTful API design following OpenAPI 3.0 spec",
      "GraphQL schemas and resolvers",
      "Webhook systems and event-driven architecture",
      "Third-party integrations: Stripe, Twilio, SendGrid",
      "API gateway and rate limiting setup",
    ],
  },
];

const ENGAGEMENT_MODELS = [
  {
    name: "Fixed-scope build",
    desc: "A defined MVP or feature set with agreed deliverables, timeline, and acceptance criteria. Best when requirements are clear.",
  },
  {
    name: "Ongoing product partnership",
    desc: "A retained engineering team embedded in your roadmap — sprints, demos, and continuous delivery. Best for products in active growth.",
  },
  {
    name: "Discovery / PoC",
    desc: "A short, focused engagement to validate feasibility — architecture review, prototype, or technical spike. Best before committing to a full build.",
  },
];

const TECH = ["React", "Next.js", "FastAPI", "Python", "PostgreSQL", "Docker", "AWS", "Whisper", "YOLO", "OpenCV", "Figma", "TanStack", "Ollama", "PyTorch"];

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
                {PRIMARY_CTA} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/15 blur-3xl rounded-3xl" aria-hidden />
              <div className="relative bg-surface border border-border rounded-2xl overflow-hidden aspect-[4/3]">
                <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Section eyebrow="HOW WE WORK" title="Engagement Models">
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10 -mt-8">
          Pick the shape that fits your stage. We scope honestly — no dollar figures here, just what each model includes.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {ENGAGEMENT_MODELS.map((m) => (
            <div key={m.name} className="bg-surface border border-border rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-3">{m.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="STACK" title="Technologies We Work With">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
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
