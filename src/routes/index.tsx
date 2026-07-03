import { createFileRoute, Link } from "@tanstack/react-router";
import SiteLayout, { Section } from "@/components/site/SiteLayout";
import RotatingHeadline from "@/components/site/RotatingHeadline";
import RotatingCodeWindow from "@/components/site/RotatingCodeWindow";
import {
  ArrowRight, Brain, Code2, Smartphone, Cloud, Palette, Plug,
  Search, PenTool, Hammer, Rocket, Eye, Mic, Layers,
} from "lucide-react";
import { PRIMARY_CTA, SECONDARY_CTA, PROJECTS_HEADLINE } from "@/lib/site-copy";
import { PROJECTS } from "@/content/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VextoraTech — AI-Powered Software Development" },
      { name: "description", content: "We build intelligent, scalable digital products — AI, web, mobile, and cloud infrastructure for startups and enterprises." },
      { property: "og:title", content: "VextoraTech — We Build Software That Thinks" },
      { property: "og:description", content: "AI-powered software development for ambitious teams." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <LogosBar />
      <ServicesOverview />
      <Domains />
      <FeaturedProjects />
      <Process />
      <TrustLine />
      <CtaBanner />
    </SiteLayout>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[92vh] flex items-center">
      <div className="absolute inset-0 dot-grid opacity-[0.06]" aria-hidden />
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" aria-hidden />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[120px]" aria-hidden />

      <div className="container-px relative grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center py-24">
        <div className="animate-fade-up">
          <span className="mono text-xs text-primary inline-block mb-5">⬡ AI-POWERED SOFTWARE DEVELOPMENT</span>
          <RotatingHeadline />
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            VextoraTech engineers intelligent, scalable digital products — from AI models and web platforms
            to mobile apps and cloud infrastructure. Built for startups and enterprises alike.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-brand text-white font-semibold rounded-xl px-6 py-3.5 shadow-[0_0_24px_rgba(79,142,247,0.4)] hover:scale-[1.03] transition-transform"
            >
              {PRIMARY_CTA} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 border border-border rounded-xl px-6 py-3.5 font-semibold hover:border-primary transition-colors"
            >
              {SECONDARY_CTA}
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs mono text-muted-foreground">
            <span>✦ FOUNDED 2026</span>
            <span>✦ BASED IN LAHORE</span>
          </div>
        </div>

        <RotatingCodeWindow />
      </div>
    </section>
  );
}

const LOGOS = ["React", "FastAPI", "Python", "PostgreSQL", "LLMs", "Docker", "TanStack", "Tailwind"];

function LogosBar() {
  return (
    <section className="py-20 bg-surface">
      <div className="container-px text-center mb-10">
        <span className="mono text-xs text-muted-foreground">TECH WE BUILD WITH</span>
      </div>
      <div className="overflow-hidden">
        <div className="flex gap-16 animate-marquee whitespace-nowrap w-max">
          {[...LOGOS, ...LOGOS, ...LOGOS].map((name, i) => (
            <span key={i} className="text-2xl font-semibold text-muted-foreground/50 hover:text-foreground transition-colors">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
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

function ServicesOverview() {
  return (
    <Section eyebrow="WHAT WE DO" title="End-to-End Digital Solutions" subtitle="From idea to deployment — we cover the full stack.">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map(({ icon: Icon, name, desc }) => (
          <div key={name} className="group bg-surface border border-border rounded-2xl p-8 hover:-translate-y-1 hover:border-primary hover:shadow-[0_0_40px_rgba(79,142,247,0.18)] transition-all">
            <div className="w-16 h-16 rounded-2xl bg-gradient-brand grid place-items-center mb-5">
              <Icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">{name}</h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
            <Link to="/services" className="mt-4 inline-flex items-center gap-1 text-sm text-primary font-medium">
              Learn more <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Domains() {
  const domains = [
    { icon: Eye, label: "Computer Vision", detail: "ANPR, face recognition, surveillance" },
    { icon: Mic, label: "Voice AI", detail: "Transcription, diarization, call analytics" },
    { icon: Layers, label: "Full-Stack", detail: "Web platforms, APIs, cloud deployment" },
  ];

  return (
    <section className="py-20 border-y border-border relative">
      <div className="absolute inset-0 dot-grid opacity-[0.04]" />
      <div className="container-px relative grid md:grid-cols-3 gap-10">
        {domains.map(({ icon: Icon, label, detail }) => (
          <div key={label} className="text-center">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/10 grid place-items-center mb-4">
              <Icon className="w-7 h-7 text-primary" />
            </div>
            <div className="text-xl font-bold mb-1">{label}</div>
            <div className="mono text-xs text-muted-foreground">{detail}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

const FEATURED = PROJECTS.slice(0, 5);

function FeaturedProjects() {
  return (
    <Section eyebrow="WHAT WE BUILD" title={PROJECTS_HEADLINE} subtitle="Real systems across vision, voice, and full-stack — explore the full portfolio.">
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {FEATURED.slice(0, 2).map((p) => <ProjectCard key={p.slug} p={p} />)}
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {FEATURED.slice(2).map((p) => <ProjectCard key={p.slug} p={p} />)}
      </div>
      <div className="text-center mt-12">
        <Link to="/projects" className="inline-flex items-center gap-2 border border-primary text-primary rounded-xl px-6 py-3 font-semibold hover:bg-primary/10 transition-colors">
          {SECONDARY_CTA} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </Section>
  );
}

function ProjectCard({ p }: { p: typeof FEATURED[number] }) {
  return (
    <Link to="/projects/$slug" params={{ slug: p.slug }} className="group block bg-surface border border-border rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:border-primary transition-all">
      <div
        className="aspect-[16/10] relative overflow-hidden"
        style={p.image ? undefined : { background: `linear-gradient(135deg, ${p.color}33, ${p.color}11)` }}
      >
        {p.image ? (
          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
        ) : (
          <>
            <div className="absolute inset-0 dot-grid opacity-30" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="w-20 h-20 rounded-2xl grid place-items-center text-2xl font-black text-white" style={{ background: p.color }}>
                {p.name.charAt(0)}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {p.tags.map((t) => (
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
  );
}

const STEPS = [
  { icon: Search, name: "Discovery", desc: "We deep-dive into your goals, user needs, and technical constraints. Define scope, stack, timeline, and success metrics together." },
  { icon: PenTool, name: "Design", desc: "Wireframes → high-fidelity Figma prototypes. User flows tested before a single line of code is written." },
  { icon: Hammer, name: "Build", desc: "Agile sprints, weekly demos. Full-stack development with code reviews, automated tests, and real deployment from sprint one." },
  { icon: Rocket, name: "Launch & Scale", desc: "Production deployment, performance monitoring, and ongoing support. We don't disappear after go-live." },
];

function Process() {
  return (
    <Section eyebrow="OUR PROCESS" title="How We Turn Your Idea Into a Live Product">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {STEPS.map((s, i) => (
          <div key={s.name} className="bg-surface border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="mono text-3xl font-black text-gradient">0{i + 1}</span>
              <s.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">{s.name}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function TrustLine() {
  return (
    <section className="py-16">
      <div className="container-px">
        <p className="text-center text-lg text-muted-foreground max-w-2xl mx-auto">
          Incorporated in 2026 — you work directly with the engineers building your product.
        </p>
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="py-24">
      <div className="container-px">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-brand p-12 md:p-20 text-center">
          <div className="absolute inset-0 dot-grid opacity-10" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Ready to Build Something Remarkable?
            </h2>
            <p className="mt-5 text-white/90 max-w-xl mx-auto">
              Let's talk about your project. No commitment, no sales pitch — just an honest conversation about what's possible.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-[#1a1a2e] font-semibold rounded-xl px-6 py-3 hover:scale-[1.03] transition-transform">
                {PRIMARY_CTA} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/projects" className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold rounded-xl px-6 py-3">
                {SECONDARY_CTA}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}