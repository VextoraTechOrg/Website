import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import SiteLayout, { Section, CtaBand } from "@/components/site/SiteLayout";
import { Reveal, RevealItem, RevealOl, RevealLi, RevealStagger } from "@/components/site/Reveal";
import RotatingHeroLines, { HERO_LINES } from "@/components/site/RotatingHeroLines";
import RotatingHeroFeature from "@/components/site/RotatingHeroFeature";
import { useHeroCycle } from "@/components/site/useHeroCycle";
import {
  ArrowRight, Brain, Code2, Smartphone, Cloud, Palette, Plug,
  Search, PenTool, Hammer, Rocket, Eye, Mic, Layers,
} from "lucide-react";
import { PRIMARY_CTA, SECONDARY_CTA, PROJECTS_HEADLINE } from "@/lib/site-copy";
import { PROJECTS } from "@/content/projects";
import {
  fadeTransition,
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/motion";

const HERO_PROJECTS = PROJECTS.filter((p) => p.image);
const HERO_CYCLE_LEN = Math.max(HERO_LINES.length, HERO_PROJECTS.length);

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
      <CtaBand
        title="Ready to build something remarkable?"
        body="Let's talk about your project. No commitment, no sales pitch — just an honest conversation about what's possible."
        primaryLabel={PRIMARY_CTA}
        secondaryTo="/projects"
        secondaryLabel={SECONDARY_CTA}
      />
    </SiteLayout>
  );
}

function Hero() {
  const { index, reduced } = useHeroCycle(HERO_CYCLE_LEN);
  const lineIndex = index % HERO_LINES.length;
  const projectIndex = index % Math.max(HERO_PROJECTS.length, 1);

  return (
    <section className="relative overflow-hidden min-h-[88vh] flex items-center border-b border-border">
      <div className="absolute inset-0 line-texture opacity-30" aria-hidden />

      <div className="container-px relative grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16 items-center py-20 md:py-28">
        <motion.div
          variants={staggerContainerVariants(reduced)}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={staggerItemVariants(reduced)}
            className="font-display text-4xl md:text-5xl lg:text-[3.25rem] tracking-tight leading-[1.1] max-w-xl"
          >
            <span className="text-primary">VextoraTech</span>
            <RotatingHeroLines index={lineIndex} />
          </motion.h1>
          <motion.p
            variants={staggerItemVariants(reduced)}
            className="mt-6 text-lg text-muted-foreground max-w-md"
          >
            Intelligent products from models to infrastructure. Built in Lahore for startups and enterprises.
          </motion.p>
          <motion.div
            variants={staggerItemVariants(reduced)}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium rounded px-6 py-3 text-sm hover:opacity-90 transition-opacity"
            >
              {PRIMARY_CTA} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 border border-border rounded px-6 py-3 text-sm font-medium hover:border-primary transition-colors"
            >
              {SECONDARY_CTA}
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? { duration: 0 } : { ...fadeTransition, delay: 0.15 }}
        >
          <RotatingHeroFeature
            projects={HERO_PROJECTS.length ? HERO_PROJECTS : PROJECTS}
            index={projectIndex}
            reduced={reduced}
          />
        </motion.div>
      </div>
    </section>
  );
}

const LOGOS = ["React", "FastAPI", "Python", "PostgreSQL", "LLMs", "Docker", "TanStack", "Tailwind"];

function LogosBar() {
  return (
    <section className="py-14 border-b border-border">
      <div className="container-px">
        <Reveal>
          <span className="label-quiet">Tech we build with</span>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {LOGOS.map((name) => (
              <span key={name} className="font-display text-lg text-muted-foreground/70">
                {name}
              </span>
            ))}
          </div>
        </Reveal>
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
    <Section eyebrow="What we do" title="End-to-end digital solutions" subtitle="From idea to deployment — we cover the full stack.">
      <RevealStagger className="border-t border-border">
        {SERVICES.map(({ icon: Icon, name, desc }, i) => (
          <RevealItem
            key={name}
            className="grid md:grid-cols-[3rem_1fr_auto] gap-4 md:gap-8 items-start py-8 border-b border-border"
          >
            <span className="font-display text-sm text-primary tabular-nums pt-1">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Icon className="w-5 h-5 text-primary shrink-0" />
                <h3 className="font-display text-xl">{name}</h3>
              </div>
              <p className="text-sm text-muted-foreground max-w-xl">{desc}</p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-1 text-sm text-primary font-medium pt-1"
            >
              Learn more <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </RevealItem>
        ))}
      </RevealStagger>
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
    <section className="py-16 border-y border-border">
      <RevealStagger className="container-px grid md:grid-cols-3 gap-10 md:gap-0 md:divide-x divide-border">
        {domains.map(({ icon: Icon, label, detail }) => (
          <RevealItem key={label} className="md:px-10 first:md:pl-0 last:md:pr-0">
            <Icon className="w-6 h-6 text-primary mb-4" />
            <div className="font-display text-xl mb-1">{label}</div>
            <div className="text-sm text-muted-foreground">{detail}</div>
          </RevealItem>
        ))}
      </RevealStagger>
    </section>
  );
}

const FEATURED = PROJECTS.slice(0, 5);

function FeaturedProjects() {
  return (
    <Section eyebrow="What we build" title={PROJECTS_HEADLINE} subtitle="Real systems across vision, voice, and full-stack — explore the full portfolio.">
      <RevealStagger className="grid md:grid-cols-2 gap-px bg-border mb-px">
        {FEATURED.slice(0, 2).map((p) => (
          <RevealItem key={p.slug}>
            <ProjectCard p={p} />
          </RevealItem>
        ))}
      </RevealStagger>
      <RevealStagger className="grid md:grid-cols-3 gap-px bg-border">
        {FEATURED.slice(2).map((p) => (
          <RevealItem key={p.slug}>
            <ProjectCard p={p} />
          </RevealItem>
        ))}
      </RevealStagger>
      <div className="mt-12">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 border border-border rounded px-5 py-2.5 text-sm font-medium hover:border-primary transition-colors"
        >
          {SECONDARY_CTA} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </Section>
  );
}

function ProjectCard({ p }: { p: typeof FEATURED[number] }) {
  const reduced = useReducedMotion();
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: p.slug }}
      className="group block bg-background hover:bg-surface transition-colors"
    >
      <div className="aspect-[16/10] relative overflow-hidden bg-surface-2">
        {p.image ? (
          <motion.img
            src={p.image}
            alt={p.name}
            className="w-full h-full object-cover"
            loading="lazy"
            whileHover={reduced ? undefined : { scale: 1.02 }}
            transition={{ duration: 0.35 }}
          />
        ) : (
          <div className="absolute inset-0 flex items-end p-6 line-texture">
            <span className="font-display text-3xl text-muted-foreground/40">{p.name.charAt(0)}</span>
          </div>
        )}
      </div>
      <div className="p-6 border-t border-border">
        <div className="flex flex-wrap gap-2 mb-3">
          {p.tags.slice(0, 3).map((t) => (
            <span key={t} className="text-[11px] text-muted-foreground border-b border-border pb-0.5">
              {t}
            </span>
          ))}
        </div>
        <h3 className="font-display text-xl mb-1.5 group-hover:text-primary transition-colors">{p.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{p.desc}</p>
        <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
          View case study <ArrowRight className="w-3.5 h-3.5" />
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
    <Section eyebrow="Our process" title="How we turn your idea into a live product">
      <RevealOl className="border-t border-border">
        {STEPS.map((s, i) => (
          <RevealLi
            key={s.name}
            className="grid md:grid-cols-[4rem_1fr] gap-4 md:gap-8 py-8 border-b border-border"
          >
            <span className="font-display text-2xl text-primary tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <s.icon className="w-5 h-5 text-muted-foreground" />
                <h3 className="font-display text-xl">{s.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground max-w-2xl">{s.desc}</p>
            </div>
          </RevealLi>
        ))}
      </RevealOl>
    </Section>
  );
}

function TrustLine() {
  return (
    <section className="py-14">
      <div className="container-px">
        <Reveal>
          <p className="text-muted-foreground max-w-2xl border-l-2 border-primary pl-6">
            Incorporated in 2026 — you work directly with the engineers building your product.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
