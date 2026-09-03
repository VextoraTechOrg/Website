import { createFileRoute, Link } from "@tanstack/react-router";
import SiteLayout, { Section, CtaBand } from "@/components/site/SiteLayout";
import Hero from "@/components/site/Hero";
import TechLogoStrip from "@/components/site/TechLogoStrip";
import OptimizedImage from "@/components/site/OptimizedImage";
import DomainsScroll from "@/components/site/scroll/DomainsScroll";
import FeaturedWorkScroll from "@/components/site/scroll/FeaturedWorkScroll";
import ProcessReveal from "@/components/site/scroll/ProcessReveal";
import {
  ArrowRight, Brain, Code2, Smartphone, Cloud, Palette, Plug,
  Search, PenTool, Hammer, Rocket, Eye, Mic, Layers,
} from "lucide-react";
import { PRIMARY_CTA, SECONDARY_CTA, PROJECTS_HEADLINE } from "@/lib/site-copy";
import { PROJECTS, SITE_URL } from "@/content/projects";
import { OG_DEFAULT } from "@/lib/media";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VextoraTech — AI-Powered Software Development" },
      { name: "description", content: "We build intelligent, scalable digital products — AI, web, mobile, and cloud infrastructure for startups and enterprises." },
      { property: "og:title", content: "VextoraTech — We Build Software That Thinks" },
      { property: "og:description", content: "AI-powered software development for ambitious teams." },
      { property: "og:image", content: `${SITE_URL}${OG_DEFAULT}` },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <TechLogoStrip />
      <ServicesOverview />
      <Domains />
      <FeaturedProjects />
      <Process />
      <CtaBand
        note="Incorporated in 2026 — you work directly with the engineers building your product."
        title="Ready to build something remarkable?"
        body="Let's talk about your project. No commitment, no sales pitch — just an honest conversation about what's possible."
        primaryLabel={PRIMARY_CTA}
        secondaryTo="/projects"
        secondaryLabel={SECONDARY_CTA}
      />
    </SiteLayout>
  );
}

const SERVICES = [
  { icon: Brain, name: "AI & Machine Learning", desc: "Custom AI models, LLM integrations, RAG pipelines, computer vision, and predictive analytics tailored to your business." },
  { icon: Code2, name: "Web Development", desc: "Full-stack web applications built with React, Next.js, FastAPI, and Node — fast, SEO-ready, scalable from day one." },
  { icon: Smartphone, name: "Mobile App Development", desc: "Cross-platform iOS & Android apps with React Native and Flutter. Native-quality performance, single codebase." },
  { icon: Cloud, name: "Cloud & DevOps", desc: "AWS, GCP, and Azure architecture. Docker, Kubernetes, CI/CD pipelines. Infrastructure that never sleeps." },
  { icon: Palette, name: "UI/UX Design", desc: "User research, wireframes, Figma prototypes, and design systems. Interfaces that convert and delight." },
  { icon: Plug, name: "API Development & Integrations", desc: "RESTful and GraphQL APIs, third-party integrations, webhook systems, and microservice architecture." },
];

/** 2-column card grid — denser than the default eyebrow/list pattern. */
function ServicesOverview() {
  return (
    <Section eyebrow="What we do" title="End-to-end digital solutions" subtitle="From idea to deployment — we cover the full stack.">
      <div className="grid sm:grid-cols-2 gap-px bg-border border border-border">
        {SERVICES.map(({ icon: Icon, name, desc }) => (
          <div key={name} className="bg-background p-5 md:p-6 hover:bg-surface/60 transition-colors">
            <Icon className="w-5 h-5 text-primary mb-3" />
            <h3 className="font-display text-lg mb-1.5">{name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <Link to="/services" className="inline-flex items-center gap-1.5 text-sm text-primary font-medium">
          All services <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </Section>
  );
}

const DOMAINS = [
  { icon: Eye, label: "Computer Vision", detail: "ANPR, face recognition, surveillance" },
  { icon: Mic, label: "Voice AI", detail: "Transcription, diarization, call analytics" },
  { icon: Layers, label: "Full-Stack", detail: "Web platforms, APIs, cloud deployment" },
];

/** Full-width surface band — breaks the repeating section rhythm. */
function Domains() {
  return (
    <DomainsScroll>
      <div className="container-px grid md:grid-cols-3 gap-6 md:gap-8">
        {DOMAINS.map(({ icon: Icon, label, detail }) => (
          <div key={label} data-domain-item className="flex gap-4 items-start">
            <div className="w-10 h-10 shrink-0 border border-border bg-background grid place-items-center">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-display text-lg mb-0.5">{label}</div>
              <div className="text-sm text-muted-foreground">{detail}</div>
            </div>
          </div>
        ))}
      </div>
    </DomainsScroll>
  );
}

const FEATURED = PROJECTS.slice(0, 5);
const FEATURED_LEAD = FEATURED[0];
const FEATURED_REST = FEATURED.slice(1);

/** Asymmetric layout — lead project large, others compact beside/below. */
function FeaturedProjects() {
  return (
    <FeaturedWorkScroll>
      <div className="container-px">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div className="max-w-2xl">
            <span className="label-quiet inline-block mb-2">What we build</span>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight">{PROJECTS_HEADLINE}</h2>
            <p className="mt-2 text-muted-foreground text-sm md:text-base">
              Real systems across vision, voice, and full-stack — explore the full portfolio.
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 border border-border rounded px-4 py-2 text-sm font-medium hover:border-primary transition-colors shrink-0"
          >
            {SECONDARY_CTA} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-[1.35fr_1fr] gap-px bg-border border border-border">
          <div className="bg-background" data-featured-lead>
            <ProjectCard p={FEATURED_LEAD} large />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-px bg-border">
            {FEATURED_REST.slice(0, 2).map((p) => (
              <div key={p.slug} data-featured-card className="bg-background">
                <ProjectCard p={p} compact />
              </div>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-px bg-border border border-border border-t-0">
          {FEATURED_REST.slice(2).map((p) => (
            <div key={p.slug} data-featured-card className="bg-background">
              <ProjectCard p={p} compact />
            </div>
          ))}
        </div>
      </div>
    </FeaturedWorkScroll>
  );
}

function ProjectCard({
  p,
  large = false,
  compact = false,
}: {
  p: typeof FEATURED[number];
  large?: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: p.slug }}
      className="group block bg-background hover:bg-surface transition-colors h-full"
    >
      <div className={`relative overflow-hidden bg-surface-2 ${large ? "aspect-[16/10]" : compact ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
        <OptimizedImage
          src={p.image}
          alt={p.name}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          width={800}
          height={500}
        />
      </div>
      <div className={`border-t border-border ${compact ? "p-4" : "p-5"}`}>
        <div className="flex flex-wrap gap-2 mb-2">
          {p.tags.slice(0, compact ? 2 : 3).map((t) => (
            <span key={t} className="tag-quiet border-b border-border pb-0.5">
              {t}
            </span>
          ))}
        </div>
        <h3 className={`font-display group-hover:text-primary transition-colors ${compact ? "text-base mb-1" : "text-xl mb-1.5"}`}>
          {p.name}
        </h3>
        {!compact && <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{p.desc}</p>}
        <span className="inline-flex items-center gap-1 text-xs text-primary font-medium">
          View case study <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </Link>
  );
}

const STEPS = [
  { icon: Search, name: "Discovery", desc: "Goals, constraints, scope, and success metrics." },
  { icon: PenTool, name: "Design", desc: "Wireframes and Figma prototypes before code." },
  { icon: Hammer, name: "Build", desc: "Agile sprints with weekly demos and real deploys." },
  { icon: Rocket, name: "Launch", desc: "Production rollout, monitoring, and support." },
];

/** Horizontal step cards — different density from services list. */
function Process() {
  return (
    <Section eyebrow="Our process" title="How we turn your idea into a live product" className="!pb-0">
      <ProcessReveal>
        <div
          data-process-line
          className="h-px w-full bg-primary mb-6 origin-left"
          aria-hidden
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
          {STEPS.map((s, i) => (
            <div key={s.name} data-process-step className="bg-background p-5 md:p-6">
              <span className="font-display text-sm text-primary tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <s.icon className="w-5 h-5 text-muted-foreground mt-3 mb-2" />
              <h3 className="font-display text-lg mb-1">{s.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </ProcessReveal>
    </Section>
  );
}
