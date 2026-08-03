import { createFileRoute } from "@tanstack/react-router";
import SiteLayout, { PageHero, Section, CtaBand } from "@/components/site/SiteLayout";
import { RevealItem, RevealStagger } from "@/components/site/Reveal";
import { Linkedin } from "lucide-react";
import { PRIMARY_CTA } from "@/lib/site-copy";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — VextoraTech" },
      { name: "description", content: "Built by engineers, for founders. The story, team, values, and journey behind VextoraTech." },
      { property: "og:title", content: "About — VextoraTech" },
      { property: "og:description", content: "We exist to close the gap between great ideas and trusted technical execution." },
    ],
  }),
  component: AboutPage,
});

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  linkedin?: string;
  hiring?: boolean;
};

const TEAM: TeamMember[] = [
  {
    name: "Farjad Kareem",
    role: "CEO",
    bio: "Leads product architecture and full-stack delivery — from FastAPI backends and React frontends to AI feature integration in production.",
    linkedin: "https://www.linkedin.com/in/farjad-kareem-3a73aa2b6/",
  },
  {
    name: "Umar Azhar",
    role: "Product Manager",
    bio: "Owns discovery through launch: scopes MVPs, writes clear requirements, and keeps engineering aligned with business outcomes.",
  },
  {
    name: "Irfan Ahmad",
    role: "Sr. AI Engineer",
    bio: "Ten years across ML systems, LLMs, and production deployments. Sets the technical bar for our AI practice and owns model architecture end to end.",
    linkedin: "https://www.linkedin.com/in/irfan-ahmed-4ba99911b/",
  },
  {
    name: "Mateen Abid",
    role: "AI Engineer",
    bio: "Builds and deploys RAG pipelines, local LLM inference, and model integrations on client projects — from prototype to production.",
  },
  {
    name: "Taimoor Amir",
    role: "AI Engineer",
    bio: "Owns backend AI services: Whisper transcription, NLP pipelines, and the FastAPI layers that expose them to products.",
  },
  {
    name: "Saad Ishaq",
    role: "Full Stack Developer",
    bio: "Ships end-to-end product features — React and TanStack frontends, REST APIs, database design, and deployment.",
    linkedin: "https://www.linkedin.com/in/muhammad-saad-454431373/",
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

      <Section eyebrow="The people" title="Meet the team">
        <RevealStagger className="border-t border-border">
          {TEAM.map((m) => (
            <RevealItem
              key={m.name}
              className="grid md:grid-cols-[12rem_8rem_1fr_auto] gap-4 md:gap-6 items-start py-8 border-b border-border"
            >
              <h3 className="font-display text-lg">{m.name}</h3>
              <div className="text-sm text-primary">{m.role}</div>
              <p className="text-sm text-muted-foreground">{m.bio}</p>
              {m.linkedin ? (
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${m.name} on LinkedIn`}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              ) : (
                <span />
              )}
            </RevealItem>
          ))}
        </RevealStagger>
      </Section>

      <Section eyebrow="Our values" title="What we stand for">
        <RevealStagger className="border-t border-border">
          {VALUES.map((v) => (
            <RevealItem key={v.name} className="grid md:grid-cols-[14rem_1fr] gap-4 py-8 border-b border-border">
              <h3 className="font-display text-lg text-gradient">{v.name}</h3>
              <p className="text-muted-foreground">{v.body}</p>
            </RevealItem>
          ))}
        </RevealStagger>
      </Section>

      <Section eyebrow="Day one" title="Where we're starting">
        <RevealStagger className="border-t border-border max-w-3xl">
          {TIMELINE.map(([year, event]) => (
            <RevealItem key={year} className="grid md:grid-cols-[6rem_1fr] gap-4 py-8 border-b border-border">
              <div className="font-display text-xl text-primary">{year}</div>
              <p className="text-sm text-muted-foreground">{event}</p>
            </RevealItem>
          ))}
        </RevealStagger>
      </Section>

      <CtaBand title="Let's build your next chapter together" primaryLabel={PRIMARY_CTA} />
    </SiteLayout>
  );
}
