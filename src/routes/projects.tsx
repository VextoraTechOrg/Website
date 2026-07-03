import { createFileRoute, Link } from "@tanstack/react-router";
import SiteLayout, { PageHero } from "@/components/site/SiteLayout";
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
        eyebrow="CASE STUDIES"
        title={<>Work our team has <span className="text-gradient">shipped</span></>}
        subtitle={PROJECTS_SUBHEAD}
      />

      <div className="container-px">
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {PROJECT_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                active === c
                  ? "bg-gradient-brand text-white"
                  : "border border-border text-muted-foreground hover:text-foreground hover:border-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {filtered.map((p) => (
            <Link
              key={p.slug}
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="group bg-surface border border-border rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:border-primary transition-all"
            >
              <div
                className="aspect-[16/10] relative overflow-hidden"
                style={p.image ? undefined : { background: `linear-gradient(135deg, ${p.color}33, ${p.color}11)` }}
              >
                {p.workOrigin !== "vextoratech" && (
                  <span className="absolute top-3 left-3 z-10 mono text-[10px] px-2 py-1 rounded-full bg-background/90 border border-border text-muted-foreground">
                    {workOriginLabel(p.workOrigin)}
                  </span>
                )}
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
                  {p.tags.slice(0, 4).map((t) => (
                    <span key={t} className="mono text-[10px] px-2 py-1 rounded-full bg-surface-2 text-muted-foreground border border-border">{t}</span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-1.5">{p.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{p.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                  View Case Study <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground pb-20">No projects in this category yet.</p>
        )}
      </div>
    </SiteLayout>
  );
}
