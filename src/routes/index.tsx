import { createFileRoute, Link } from "@tanstack/react-router";
import SiteLayout, { Section } from "@/components/site/SiteLayout";
import {
  ArrowRight, Brain, Code2, Smartphone, Cloud, Palette, Plug,
  Sparkles, Search, PenTool, Hammer, Rocket,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

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


export function WhatsAppButton() {
  const tag = "a";
  const El = tag as "a";
  return (
    <El
      href="https://wa.me/923198562747"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50"
      style={{ position: "fixed", bottom: 24, right: 24, zIndex: 50 }}
    >
      <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#25D366", opacity: 0.3 }} className="animate-ping" />
      <span style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: "50%", background: "#25D366", boxShadow: "0 4px 24px rgba(37,211,102,0.5)" }}>
        <svg viewBox="0 0 32 32" width={28} height={28} fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.648 4.827 1.782 6.86L2 30l7.347-1.755A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 0 1-5.834-1.596l-.418-.248-4.36 1.042 1.074-4.25-.273-.437A11.46 11.46 0 0 1 4.5 16C4.5 9.649 9.649 4.5 16 4.5S27.5 9.649 27.5 16 22.351 27.5 16 27.5zm6.29-8.61c-.345-.172-2.04-1.006-2.356-1.12-.316-.115-.547-.172-.777.172-.23.344-.892 1.12-1.093 1.35-.2.23-.402.258-.747.086-.345-.172-1.456-.537-2.773-1.71-1.025-.913-1.717-2.04-1.918-2.385-.2-.344-.021-.53.151-.702.154-.154.345-.402.517-.603.172-.2.23-.344.345-.573.115-.23.057-.43-.029-.603-.086-.172-.777-1.873-1.065-2.564-.28-.672-.565-.58-.777-.591l-.662-.011c-.23 0-.603.086-.918.43s-1.207 1.178-1.207 2.873 1.236 3.332 1.408 3.562c.172.23 2.433 3.714 5.895 5.208.824.356 1.467.569 1.969.728.827.263 1.58.226 2.174.137.663-.1 2.04-.834 2.327-1.638.287-.804.287-1.493.2-1.638-.086-.144-.315-.23-.66-.402z" />
        </svg>
      </span>
    </El>
  );
}

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <LogosBar />
      <ServicesOverview />
      <Stats />
      <FeaturedProjects />
      <Process />
      <Testimonials />
      <WhatsAppButton />
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
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
            We Build Software<br />That <span className="text-gradient">Thinks.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            VextoraTech engineers intelligent, scalable digital products — from AI models and web platforms
            to mobile apps and cloud infrastructure. Built for startups and enterprises alike.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-brand text-white font-semibold rounded-xl px-6 py-3.5 shadow-[0_0_24px_rgba(79,142,247,0.4)] hover:scale-[1.03] transition-transform"
            >
              Start Your Project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 border border-border rounded-xl px-6 py-3.5 font-semibold hover:border-primary transition-colors"
            >
              See Our Work
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs mono text-muted-foreground">
            <span>✦ FOUNDED 2026</span>
            <span>✦ 6-PERSON TEAM</span>
            <span>✦ BASED IN LAHORE</span>
          </div>
        </div>

        <CodeWindow />
      </div>
    </section>
  );
}

function CodeWindow() {
  return (
    <div className="relative animate-fade-up">
      <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-3xl" aria-hidden />
      <div className="relative bg-[#0A1220] border border-border rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(79,142,247,0.18)]">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-black/30">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-3 mono text-[11px] text-muted-foreground normal-case tracking-normal">vextoratech_ai.py</span>
        </div>
        <pre className="p-5 text-[13px] leading-relaxed font-mono text-foreground/90 overflow-x-auto">
          <span className="text-secondary">from</span> <span className="text-primary">vextoratech</span> <span className="text-secondary">import</span> AIEngine{"\n"}
          {"\n"}
          <span className="text-muted-foreground"># Initialize smart assistant</span>{"\n"}
          engine = <span className="text-primary">AIEngine</span>(model=<span className="text-[#10B981]">"vxt-pro-v2"</span>){"\n"}
          {"\n"}
          <span className="text-muted-foreground"># Deploy in 3 lines</span>{"\n"}
          app = engine.<span className="text-primary">build</span>({"\n"}
          {"    "}stack=[<span className="text-[#10B981]">"FastAPI"</span>, <span className="text-[#10B981]">"React"</span>, <span className="text-[#10B981]">"PostgreSQL"</span>],{"\n"}
          {"    "}ai_features=[<span className="text-[#10B981]">"RAG"</span>, <span className="text-[#10B981]">"NLP"</span>, <span className="text-[#10B981]">"Vision"</span>],{"\n"}
          {"    "}deploy_target=<span className="text-[#10B981]">"cloud"</span>{"\n"}
          ){"\n"}
          {"\n"}
          app.<span className="text-primary">launch</span>(){"\n"}
          <span className="text-muted-foreground"># ✓ Live at vextoratech.com/client-demo</span>
          <span className="cursor-blink text-primary">▌</span>
        </pre>
      </div>
    </div>
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

function useCountUp(target: number, suffix = "", duration = 1500) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return { ref, display: `${value}${suffix}` };
}

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, display } = useCountUp(value, suffix);
  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-black text-gradient">{display}</div>
      <div className="mt-2 mono text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function Stats() {
  return (
    <section className="py-20 border-y border-border relative">
      <div className="absolute inset-0 dot-grid opacity-[0.04]" />
      <div className="container-px relative grid grid-cols-2 md:grid-cols-4 gap-10">
        <StatItem value={6} suffix="" label="TEAM MEMBERS" />
        <StatItem value={3} suffix="" label="AI ENGINEERS" />
        <StatItem value={1} suffix="" label="PRODUCT LEAD" />
        <StatItem value={1} suffix="" label="FULL-STACK DEV" />
      </div>
    </section>
  );
}

const PROJECTS = [
  {
    name: "QClose Inventory",
    cats: ["Web Apps"],
    tags: ["Next.js 13", "TypeScript", "Node.js", "Tailwind"],
    desc: "Inventory management dashboard with hardware scanner integration for product addition and retrieval, plus reporting modules for opening and closing stock levels.",
    color: "#06B6D4",
    image: "/variety-people-multitasking-3d-cartoon-scene.jpg",
  },
  {
    name: "SWGNP",
    cats: ["Web Apps"],
    tags: ["Angular", "TypeScript", "Chart.js", "PrimeNG"],
    desc: "IoT-based web portal for remote sensing devices used by government stakeholders, with advanced search and dynamic data visualization features.",
    color: "#4F8EF7",
    image: "/thanit2022february_53.jpg",
  },
  {
    name: "PYLI",
    cats: ["Web Apps"],
    tags: ["React.js 18", "TypeScript", "MUI", "Emotion"],
    desc: "Centralized platform for managing multiple business profiles with a customized UI tailored to client requirements.",
    color: "#7C3AED",
    image: "/PYli.png",
  },
  {
    name: "Facial Recognition Attendance System",
    cats: ["AI / ML"],
    tags: ["Python", "OpenCV", "DeepFace", "FastAPI"],
    desc: "Automated employee attendance system using real-time facial recognition. Detects and identifies faces from live camera feeds, logs check-ins and check-outs, and generates attendance reports — eliminating manual tracking.",
    color: "#6366F1",
    image: "/2462340.jpg",
  },
  {
    name: "AI Surveillance System",
    cats: ["AI / ML"],
    tags: ["Python", "YOLOv8", "OpenCV", "WebSocket"],
    desc: "Intelligent video surveillance platform with real-time object and anomaly detection across multiple camera feeds. Triggers instant alerts for restricted zone breaches, loitering, and suspicious activity.",
    color: "#EF4444",
    image: "/surveillance-data-security-technology.jpg",
  },
];

function FeaturedProjects() {
  return (
    <Section eyebrow="WHAT WE BUILD" title="Example Products We Can Deliver">
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {PROJECTS.slice(0, 2).map((p) => <ProjectCard key={p.name} p={p} />)}
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {PROJECTS.slice(2).map((p) => <ProjectCard key={p.name} p={p} />)}
      </div>
      <div className="text-center mt-12">
        <Link to="/projects" className="inline-flex items-center gap-2 border border-primary text-primary rounded-xl px-6 py-3 font-semibold hover:bg-primary/10 transition-colors">
          View All Projects <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </Section>
  );
}

function ProjectCard({ p }: { p: typeof PROJECTS[number] }) {
  return (
    <Link to="/projects" className="group block bg-surface border border-border rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:border-primary transition-all">
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

function Testimonials() {
  return (
    <Section eyebrow="WHY WE STARTED" title="Honest From Day One">
      <div className="max-w-3xl mx-auto bg-surface-2 border border-border rounded-2xl p-8 md:p-10 text-center">
        <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
        <p className="text-lg text-foreground/90 leading-relaxed">
          We didn't spin up another agency with fake case studies and inflated stats. VextoraTech is a new company —
          incorporated in 2026 — built by engineers who'd rather tell you the truth on day one than oversell on day one.
        </p>
        <p className="mt-4 text-muted-foreground">
          If you want a founding technical partner, not a vendor with a ten-year backstory we don't have, we're your team.
        </p>
      </div>
    </Section>
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
                Start the Conversation <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold rounded-xl px-6 py-3">
                See Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}