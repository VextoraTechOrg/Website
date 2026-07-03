import { createFileRoute, Link } from "@tanstack/react-router";
import SiteLayout, { PageHero, Section } from "@/components/site/SiteLayout";
import { SITE_URL } from "@/content/projects";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — VextoraTech" },
      {
        name: "description",
        content: "Terms governing use of the VextoraTech website and services.",
      },
      { property: "og:title", content: "Terms of Service — VextoraTech" },
      { property: "og:url", content: `${SITE_URL}/terms` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/terms` }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="LEGAL"
        title="Terms of Service"
        subtitle="Rules for using this website and engaging our services."
      />
      <Section>
        <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground leading-relaxed">
          <p className="text-foreground font-medium">
            Content pending — legal review in progress.
          </p>
          <p>
            This page will set out the terms under which you may use vextoratech.com, submit
            inquiries, and engage VextoraTech for software development services.
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
