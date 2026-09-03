import { createFileRoute, Link } from "@tanstack/react-router";
import SiteLayout, { PageHero } from "@/components/site/SiteLayout";
import OptimizedImage from "@/components/site/OptimizedImage";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import {
  PROJECTS,
  PROJECT_CATEGORIES,
  SITE_URL,
  workOriginLabel,
  type ProjectCat,
} from "@/content/projects";
import { PROJECTS_SUBHEAD } from "@/lib/site-copy";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — VextoraTech" },
      { name: "description", content: "Case studies from VextoraTech — AI, web, mobile, and cloud products shipped for real teams." },
      { property: "og:title", content: "Projects — VextoraTech" },
      { property: "og:description", content: PROJECTS_SUBHEAD },
      { property: "og:url", content: `${SITE_URL}/projects` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/projects` }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [active, setActive] = useState<ProjectCat>("All");
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.cats.includes(active));

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Case studies"
        title={<>Work our team has <span className="text-gradient">shipped</span></>}
        subtitle={PROJECTS_SUBHEAD}
      />

      <div className="container-px pb-20">
        <div className="flex flex-wrap gap-1 border-b border-border mb-10">
          {PROJECT_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                active === c
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {filtered.map((p) => (
            <Link
              key={p.slug}
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="group bg-background hover:bg-surface transition-colors block h-full"
            >
              <div className="aspect-[16/10] relative overflow-hidden bg-surface-2">
                {p.workOrigin !== "vextoratech" && (
                  <span className="absolute top-3 left-3 z-10 text-[10px] px-2 py-1 bg-background/90 border border-border text-muted-foreground">
                    {workOriginLabel(p.workOrigin)}
                  </span>
                )}
                {p.image ? (
                  <OptimizedImage
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    width={800}
                    height={500}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-end p-6 bg-surface-2">
                    <span className="font-display text-4xl text-muted-foreground/30">{p.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="p-6 border-t border-border">
                <div className="flex flex-wrap gap-2 mb-3">
                  {p.tags.slice(0, 4).map((t) => (
                    <span key={t} className="tag-quiet border-b border-border/80 pb-0.5">
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
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-muted-foreground py-20">No projects in this category yet.</p>
        )}
      </div>
    </SiteLayout>
  );
}
