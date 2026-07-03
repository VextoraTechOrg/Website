import { createFileRoute, Link } from "@tanstack/react-router";
import SiteLayout, { PageHero, Section } from "@/components/site/SiteLayout";
import { SITE_URL } from "@/content/projects";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — VextoraTech" },
      {
        name: "description",
        content: "How VextoraTech collects, uses, and protects your personal information.",
      },
      { property: "og:title", content: "Privacy Policy — VextoraTech" },
      { property: "og:url", content: `${SITE_URL}/privacy` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/privacy` }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="LEGAL"
        title="Privacy Policy"
        subtitle="How we handle your data when you contact us or use this site."
      />
      <Section>
        <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground leading-relaxed">
          <p className="text-foreground font-medium">
            Content pending — legal review in progress.
          </p>
          <p>
            This page will describe what information we collect through our contact form and
            website analytics, how we use it, how long we retain it, and your rights regarding
            access and deletion.
          </p>
          <p>
            Questions in the meantime? Email{" "}
            <a href="mailto:info@vextoratech.com" className="text-primary hover:underline">
              info@vextoratech.com
            </a>
            .
          </p>
          <Link to="/contact" className="inline-flex text-primary font-semibold hover:underline">
            Contact us
          </Link>
        </div>
      </Section>
    </SiteLayout>
  );
}
