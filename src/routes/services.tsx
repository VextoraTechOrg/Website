import { createFileRoute, Link } from "@tanstack/react-router";
import SiteLayout, { PageHero, Section, CtaBand } from "@/components/site/SiteLayout";
import { ArrowRight, Brain, Code2, Smartphone, Cloud, Palette, Plug, Check } from "lucide-react";
import { PRIMARY_CTA } from "@/lib/site-copy";
import OptimizedImage from "@/components/site/OptimizedImage";
import { SERVICE_IMAGES } from "@/lib/media";

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
    image: SERVICE_IMAGES.aiMl,
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
    image: SERVICE_IMAGES.web,
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
    image: SERVICE_IMAGES.mobile,
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
    image: SERVICE_IMAGES.cloud,
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
    image: SERVICE_IMAGES.uiUx,
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
    image: SERVICE_IMAGES.api,
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
        eyebrow="Services"
        title={<>Everything you need to <span className="text-gradient">ship great software</span></>}
        subtitle="We cover the full product lifecycle — from strategy and design to development, AI integration, and cloud deployment."
      />

      <div className="container-px">
        {SERVICES.map((s, i) => (
          <div
            key={s.name}
            className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center py-16 md:py-20 border-b border-border ${
              i % 2 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div>
              <span className="label-quiet">
                {String(i + 1).padStart(2, "0")} — Service
              </span>
              <h2 className="font-display text-3xl md:text-4xl mt-3 mb-4">{s.name}</h2>
              <p className="text-muted-foreground mb-6">{s.body}</p>
              <ul className="space-y-3 mb-7">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-sm">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="inline-flex items-center gap-2 text-primary font-medium">
                {PRIMARY_CTA} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="border border-border overflow-hidden aspect-[4/3] bg-surface">
              <OptimizedImage
                src={s.image}
                alt={s.name}
                className="w-full h-full object-cover"
                width={1200}
                height={900}
              />
            </div>
          </div>
        ))}
      </div>

      <Section eyebrow="How we work" title="Engagement models">
        <p className="text-muted-foreground max-w-2xl mb-10 -mt-8">
          Pick the shape that fits your stage. We scope honestly — no dollar figures here, just what each model includes.
        </p>
        <dl className="border-t border-border">
          {ENGAGEMENT_MODELS.map((m) => (
            <div key={m.name} className="grid md:grid-cols-[14rem_1fr] gap-4 py-8 border-b border-border">
              <dt className="font-display text-lg">{m.name}</dt>
              <dd className="text-sm text-muted-foreground leading-relaxed">{m.desc}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section eyebrow="Stack" title="Technologies we work with">
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {TECH.map((t) => (
            <span
              key={t}
              className="text-sm text-muted-foreground border-b border-border pb-1 hover:text-foreground hover:border-primary transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
      </Section>

      <CtaBand title="Have a project in mind?" primaryLabel={PRIMARY_CTA} />
    </SiteLayout>
  );
}
