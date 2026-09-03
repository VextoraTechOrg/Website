import { createFileRoute } from "@tanstack/react-router";
import SiteLayout, { PageHero, Section, CtaBand } from "@/components/site/SiteLayout";
import { Brain, Eye, Layers, Mic } from "lucide-react";
import { PRIMARY_CTA } from "@/lib/site-copy";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — VextoraTech" },
      { name: "description", content: "Built by engineers, for founders. The story, expertise, values, and journey behind VextoraTech." },
      { property: "og:title", content: "About — VextoraTech" },
      { property: "og:description", content: "We exist to close the gap between great ideas and trusted technical execution." },
    ],
  }),
  component: AboutPage,
});

const EXPERTISE = [
  {
    icon: Eye,
    name: "Computer Vision",
    body: "Object detection, OCR, ANPR, face recognition, and multi-camera surveillance — pipelines built for real-world accuracy and latency, not lab demos.",
  },
  {
    icon: Mic,
    name: "Voice AI",
    body: "Whisper transcription, speaker diarization, and call analytics that turn raw audio into searchable, actionable insight for operations and support teams.",
  },
  {
    icon: Brain,
    name: "RAG & LLM Systems",
    body: "Grounded assistants with vector search, citations, and guardrails — so answers stay factual, auditable, and safe to ship in production.",
  },
  {
    icon: Layers,
    name: "Full-Stack Products",
    body: "React and FastAPI platforms, APIs, auth, and cloud deployment — the complete stack from prototype through launch and scale.",
  },
];

const VALUES = [
  { name: "Radical Honesty", body: "We tell you what we'd tell a co-founder. If your architecture is wrong, we say so. Clear > comfortable." },
  { name: "Ownership Mentality", body: "We treat your product like it's ours. Late nights, second opinions, and edge cases included." },
  { name: "Technical Depth", body: "We go deep. Pattern design, performance profiling, security hardening — not just \"it works.\"" },
  { name: "Long-Term Thinking", body: "We build for your next 10 users and your next 10,000. Decisions today should not create debt tomorrow." },
];

const TIMELINE = [
  ["2026", "VextoraTech incorporated. Team assembled, site live, and open for our first client conversations."],
  ["Next", "Ship our first projects, refine how we work, and earn the reputation we want — one delivery at a time."],
];

function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Our story"
        title={<>Built by engineers, <br /><span className="text-gradient">for founders</span></>}
        subtitle="Great ideas die in execution. VextoraTech exists to make sure yours doesn't."
      />

      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <blockquote className="font-display text-2xl md:text-3xl leading-snug border-l-2 border-primary pl-6">
            "Technology should accelerate your vision, not complicate it. We build the
            infrastructure that makes <span className="text-gradient">ambitious ideas inevitable.</span>"
          </blockquote>
          <div className="space-y-4 text-muted-foreground">
            <p>
              VextoraTech is a brand-new startup. We incorporated in 2026 — no legacy agency,
              no rebrand, no borrowed history. We are a small team in Lahore building this
              company in public from day one.
            </p>
            <p>
              Our people have shipped AI features, web products, and full-stack systems before —
              just not under this name yet. We work with founding partners who want direct access
              to the engineers doing the work, not a sales layer in between.
            </p>
            <p>
              We lead with what we can demonstrate: computer vision, voice AI, RAG systems, and
              production-grade web platforms. No inflated backstory — just honest engineering.
            </p>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="What we build"
        title="Where we go deep"
        subtitle="Production systems across vision, voice, AI, and full-stack — the areas we lead with and can demonstrate."
      >
        <div className="border-t border-border">
          {EXPERTISE.map(({ icon: Icon, name, body }) => (
            <div
              key={name}
              className="grid md:grid-cols-[3rem_14rem_1fr] gap-4 md:gap-8 items-start py-8 border-b border-border"
            >
              <Icon className="w-6 h-6 text-primary mt-1" />
              <h3 className="font-display text-lg">{name}</h3>
              <p className="text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Our values" title="What we stand for">
        <div className="border-t border-border">
          {VALUES.map((v) => (
            <div key={v.name} className="grid md:grid-cols-[14rem_1fr] gap-4 py-8 border-b border-border">
              <h3 className="font-display text-lg text-gradient">{v.name}</h3>
              <p className="text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Day one" title="Where we're starting">
        <div className="border-t border-border max-w-3xl">
          {TIMELINE.map(([year, event]) => (
            <div key={year} className="grid md:grid-cols-[6rem_1fr] gap-4 py-8 border-b border-border">
              <div className="font-display text-xl text-primary">{year}</div>
              <p className="text-sm text-muted-foreground">{event}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand title="Let's build your next chapter together" primaryLabel={PRIMARY_CTA} />
    </SiteLayout>
  );
}
