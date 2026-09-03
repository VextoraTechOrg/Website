import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import SiteLayout, { CtaBand } from "@/components/site/SiteLayout";
import {
  ArrowLeft,
  ChevronRight,
  Check,
  AlertTriangle,
  Lightbulb,
  Layers,
  Briefcase,
  Clock,
  Tag,
} from "lucide-react";
import {
  SITE_URL,
  getProjectBySlug,
  getRelatedProjects,
  workOriginLabel,
} from "@/content/projects";
import { PRIMARY_CTA } from "@/lib/site-copy";
import CaseStudyVideo from "@/components/site/CaseStudyVideo";
import OptimizedImage from "@/components/site/OptimizedImage";

export const Route = createFileRoute("/projects_/$slug")({
  head: ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) {
      return {
        meta: [
          { title: "Project not found — VextoraTech" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const url = `${SITE_URL}/projects/${project.slug}`;
    const ogImage = project.image ? `${SITE_URL}${project.image}` : undefined;
    return {
      meta: [
        { title: `${project.name} — Case Study | VextoraTech` },
        { name: "description", content: project.summary },
        { name: "keywords", content: project.keywords.join(", ") },
        { property: "og:type", content: "article" },
        { property: "og:title", content: `${project.name} — VextoraTech Case Study` },
        { property: "og:description", content: project.summary },
        { property: "og:url", content: url },
        ...(ogImage
          ? [
              { property: "og:image", content: ogImage },
              { name: "twitter:image", content: ogImage },
            ]
          : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${project.name} — VextoraTech` },
        { name: "twitter:description", content: project.summary },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  loader: ({ params }) => {
    if (!getProjectBySlug(params.slug)) throw notFound();
  },
  component: ProjectCasePage,
});

function ProjectCasePage() {
  const { slug } = Route.useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <SiteLayout>
        <div className="container-px py-32">
          <h1 className="font-display text-3xl mb-4">Project not found</h1>
          <p className="text-muted-foreground mb-8">
            This case study may have moved or no longer exists.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-primary font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to projects
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const url = `${SITE_URL}/projects/${project.slug}`;
  const related = getRelatedProjects(project.slug);

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.summary,
    keywords: project.keywords.join(", "),
    about: project.industry,
    creator: {
      "@type": "Organization",
      name: "VextoraTech",
      url: SITE_URL,
    },
    url,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
      { "@type": "ListItem", position: 3, name: project.name, item: url },
    ],
  };

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article>
        <header className="border-b border-border">
          <div className="container-px relative pt-12 pb-10 md:pt-16">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs text-muted-foreground mb-8"
            >
              <Link to="/" className="hover:text-foreground">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/projects" className="hover:text-foreground">Projects</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground truncate max-w-[60vw]">{project.name}</span>
            </nav>

            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="label-quiet">{project.category}</span>
                {project.workOrigin !== "vextoratech" && (
                  <span className="text-[11px] text-muted-foreground border-b border-border pb-0.5">
                    {workOriginLabel(project.workOrigin)}
                  </span>
                )}
              </div>
              <h1 className="font-display text-3xl md:text-5xl tracking-tight mt-1 mb-5 leading-[1.1]">
                {project.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">{project.overview}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {project.tags.map((t) => (
                  <span key={t} className="text-[12px] text-muted-foreground border-b border-border pb-0.5">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </header>

        <div className="container-px mt-10 space-y-8 max-w-5xl">
          <div className="relative overflow-hidden aspect-[21/9] border border-border bg-surface-2">
            <OptimizedImage
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
              width={1600}
              height={686}
              priority
            />
          </div>

          {project.demoSlot ? (
            <div>
              <h2 className="font-display text-xl mb-4">Product demo</h2>
              <CaseStudyVideo
                title={project.name}
                poster={project.image}
                webm={project.video?.webm}
                mp4={project.video?.mp4}
              />
            </div>
          ) : null}
        </div>

        <div className="container-px py-14 md:py-20">
          <div className="max-w-5xl grid lg:grid-cols-[1fr_260px] gap-12">
            <div className="space-y-14">
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <h2 className="font-display text-2xl md:text-3xl">The challenge</h2>
                </div>
                <ul className="space-y-3 border-t border-border pt-5">
                  {project.challenges.map((c) => (
                    <li key={c} className="flex gap-3 text-muted-foreground">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                      <span className="leading-relaxed">{c}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-5">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  <h2 className="font-display text-2xl md:text-3xl">Our solution</h2>
                </div>
                <ul className="space-y-3 border-t border-border pt-5">
                  {project.solutions.map((s) => (
                    <li key={s} className="flex gap-3 text-muted-foreground">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-5">
                  <Layers className="w-5 h-5 text-primary" />
                  <h2 className="font-display text-2xl md:text-3xl">Key features</h2>
                </div>
                <div className="border-t border-border">
                  {project.features.map((f) => (
                    <div key={f.title} className="grid sm:grid-cols-[12rem_1fr] gap-3 py-5 border-b border-border">
                      <h3 className="font-display text-base">{f.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.detail}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="font-display text-2xl md:text-3xl mb-5">What it does</h2>
                <div className="grid sm:grid-cols-3 gap-px bg-border border border-border">
                  {project.results.map((r) => (
                    <div key={r.label} className="bg-background p-6">
                      <div className="font-display text-2xl text-gradient mb-1">{r.metric}</div>
                      <div className="text-sm text-muted-foreground">{r.label}</div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="lg:sticky lg:top-28 self-start space-y-0 border border-border divide-y divide-border">
              <div className="p-6 space-y-5 bg-surface">
                <h3 className="font-display text-lg">Project details</h3>
                <SidebarItem icon={Briefcase} label="Domain" value={project.industry} />
                <SidebarItem icon={Clock} label="Build duration" value={project.timeline} />
                <SidebarItem icon={Tag} label="Work type" value={workOriginLabel(project.workOrigin)} />
                <div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Layers className="w-4 h-4 text-primary" /> Services
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {project.services.map((s) => (
                      <span key={s} className="text-xs text-muted-foreground border-b border-border pb-0.5">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-background">
                <h3 className="font-display text-lg mb-4">Tech stack</h3>
                <div className="space-y-4">
                  {project.stack.map((group) => (
                    <div key={group.group}>
                      <div className="text-xs text-muted-foreground mb-2">{group.group}</div>
                      <div className="flex flex-wrap gap-x-3 gap-y-1">
                        {group.items.map((item) => (
                          <span key={item} className="text-[12px] text-foreground/80">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          <div className="max-w-5xl mt-14 pt-8 border-t border-border">
            <Link to="/projects" className="inline-flex items-center gap-2 text-primary font-medium">
              <ArrowLeft className="w-4 h-4" /> All projects
            </Link>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="container-px pb-8">
          <div className="max-w-5xl">
            <h2 className="font-display text-2xl mb-8">More case studies</h2>
            <div className="border-t border-border">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  className="group grid md:grid-cols-[8rem_1fr] gap-4 py-6 border-b border-border hover:bg-surface/40 -mx-2 px-2 transition-colors"
                >
                  <span className="text-xs text-primary">{p.category}</span>
                  <h3 className="font-display text-base group-hover:text-primary transition-colors">
                    {p.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title="Have a project like this in mind?"
        body="We turn ideas into production software — AI, web, mobile, and cloud."
        primaryLabel={PRIMARY_CTA}
      />
    </SiteLayout>
  );
}

function SidebarItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Briefcase;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
        <Icon className="w-4 h-4 text-primary" /> {label}
      </div>
      <div className="font-medium text-sm">{value}</div>
    </div>
  );
}
