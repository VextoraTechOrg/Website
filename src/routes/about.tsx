import { createFileRoute, Link } from "@tanstack/react-router";
import SiteLayout, { PageHero, Section } from "@/components/site/SiteLayout";
import { ArrowRight, Linkedin } from "lucide-react";

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

const TEAM = [
  { name: "Farjad kareem", role: "CEO", bio: "Full-stack AI Engineer. Obsessed with developer experience and scalable product design." },
  { name: "Umar Azhar", role: "Product Manager", bio: "Product manager who turns founder vision into clear roadmaps. Aligns user needs, business goals, and engineering delivery from discovery to launch." },
  { name: "Irfan Ahmad", role: "Sr. AI Engineer", bio: "Senior AI engineer with a decade of experience across ML systems, LLMs, and production deployments. Leads architecture and sets the technical bar for our AI practice." },
  { name: "Mateen Abid", role: "AI Engineer", bio: "AI engineer with one year in LLMs and local inference. Learning fast and shipping real integrations on client projects." },
  { name: "Taimoor Amir", role: "AI Engineer", bio: "AI engineer focused on model APIs and backend integration. A year into AI, already deploying RAG and inference pipelines." },
  { name: "Saad Ishaq", role: "Full Stack Developer", bio: "Full-stack developer shipping end-to-end product features. Builds React frontends, APIs, and the integrations that tie them together." },
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
        eyebrow="OUR STORY"
        title={<>Built by Engineers, <br /><span className="text-gradient">for Founders</span></>}
        subtitle="Great ideas die in execution. VextoraTech exists to make sure yours doesn't."
      />

      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <blockquote className="text-2xl md:text-3xl font-bold leading-snug">
            "Technology should accelerate your vision, not complicate it. We build the
            infrastructure that makes <span className="text-gradient">ambitious ideas inevitable.</span>"
          </blockquote>
          <div className="space-y-4 text-muted-foreground">
            <p>VextoraTech is brand new Startup. We incorporated in 2026,no legacy agency, no rebrand, no borrowed history. We're a small team in Lahore building this company in public from day one.</p>
            <p>Our people have shipped AI features, web products, and full-stack systems before, just not under this name yet. We're looking for founding partners who want direct access to the engineers doing the work, not a sales layer in between.</p>
            <p>If you're building something you care about and want an honest technical partner from the start, we'd love to talk.</p>
          </div>
        </div>
      </Section>

      <Section eyebrow="THE PEOPLE" title="Meet the Team">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((m) => (
            <div key={m.name} className="bg-surface border border-border rounded-2xl p-6 text-center">
              <div className="mx-auto w-24 h-24 rounded-full bg-gradient-brand grid place-items-center text-3xl font-black text-white mb-4">
                {m.name.charAt(0)}
              </div>
              <h3 className="text-lg font-bold">{m.name}</h3>
              <div className="mono text-xs text-primary mb-3">{m.role}</div>
              <p className="text-sm text-muted-foreground">{m.bio}</p>
              {m.hiring ? (
                <Link to="/careers" className="mt-4 inline-flex items-center gap-1 text-xs mono px-3 py-1.5 rounded-full bg-gradient-brand text-white">
                  We're Hiring <ArrowRight className="w-3 h-3" />
                </Link>
              ) : (
                <a href="#" className="mt-4 inline-block text-muted-foreground hover:text-primary"><Linkedin className="w-4 h-4 mx-auto" /></a>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="OUR VALUES" title="What We Stand For">
        <div className="grid md:grid-cols-2 gap-6">
          {VALUES.map((v) => (
            <div key={v.name} className="bg-surface border border-border rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-2 text-gradient">{v.name}</h3>
              <p className="text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="DAY ONE" title="Where We're Starting">
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-10">
            {TIMELINE.map(([year, event], i) => (
              <div key={`${year}-${i}`} className={`relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-10 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className={`md:text-right ${i % 2 ? "md:text-left" : ""}`}>
                  <div className="mono text-2xl font-black text-gradient">{year}</div>
                </div>
                <div className="bg-surface border border-border rounded-xl p-5 mt-2 md:mt-0">
                  <p className="text-sm text-muted-foreground">{event}</p>
                </div>
                <div className="absolute left-2.5 md:left-1/2 top-2 w-3 h-3 rounded-full bg-gradient-brand -translate-x-1/2 ring-4 ring-background" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      <section className="py-20">
        <div className="container-px">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-brand p-12 md:p-16 text-center">
            <div className="absolute inset-0 dot-grid opacity-10" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">Let's Build Your Next Chapter Together</h2>
              <Link to="/contact" className="mt-6 inline-flex items-center gap-2 bg-white text-[#1a1a2e] font-semibold rounded-xl px-6 py-3 hover:scale-[1.03] transition-transform">
                Start a Conversation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}