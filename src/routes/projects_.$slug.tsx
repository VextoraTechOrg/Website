import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import SiteLayout from "@/components/site/SiteLayout";
import {
  ArrowLeft,
  ArrowRight,
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
        <div className="container-px py-32 text-center">
          <h1 className="text-3xl font-extrabold mb-4">Project not found</h1>
          <p className="text-muted-foreground mb-8">
            This case study may have moved or no longer exists.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-primary font-semibold"
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
        {/* Header */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 dot-grid opacity-[0.06]" aria-hidden />
          <div
            className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-[120px] opacity-30"
            style={{ background: project.color }}
            aria-hidden
          />
          <div className="container-px relative pt-12 pb-10 md:pt-16">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs text-muted-foreground mb-8"
            >
              <Link to="/" className="hover:text-foreground">
                Home
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/projects" className="hover:text-foreground">
                Projects
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground truncate max-w-[60vw]">
                {project.name}
              </span>
            </nav>

            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="mono text-xs text-primary">{project.category}</span>
                {project.workOrigin !== "vextoratech" && (
                  <span className="mono text-[10px] px-2 py-1 rounded-full bg-surface-2 border border-border text-muted-foreground">
                    {workOriginLabel(project.workOrigin)}
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight mt-1 mb-5 leading-[1.1]">
                {project.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {project.overview}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="mono text-[11px] px-2.5 py-1 rounded-full bg-surface-2 text-muted-foreground border border-border"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Hero banner */}
        <div className="container-px">
          <div
            className="relative rounded-3xl overflow-hidden aspect-[21/9] max-w-5xl mx-auto border border-border"
            style={
              project.image
                ? undefined
                : { background: `linear-gradient(135deg, ${project.color}40, ${project.color}10)` }
            }
          >
            {project.image ? (
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <div className="absolute inset-0 dot-grid opacity-30" />
                <div className="absolute inset-0 grid place-items-center">
                  <div
                    className="w-24 h-24 rounded-3xl grid place-items-center text-4xl font-black text-white"
                    style={{ background: project.color }}
                  >
                    {project.name.charAt(0)}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="container-px py-14 md:py-20">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_280px] gap-12">
            {/* Main column */}
            <div className="space-y-14">
              {/* Challenge */}
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-10 h-10 rounded-xl bg-amber-500/10 grid place-items-center shrink-0">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold">The Challenge</h2>
                </div>
                <ul className="space-y-3">
                  {project.challenges.map((c) => (
                    <li key={c} className="flex gap-3 text-muted-foreground">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                      <span className="leading-relaxed">{c}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Solution */}
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-10 h-10 rounded-xl bg-primary/10 grid place-items-center shrink-0">
                    <Lightbulb className="w-5 h-5 text-primary" />
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold">Our Solution</h2>
                </div>
                <ul className="space-y-3">
                  {project.solutions.map((s) => (
                    <li key={s} className="flex gap-3 text-muted-foreground">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Features */}
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-10 h-10 rounded-xl bg-primary/10 grid place-items-center shrink-0">
                    <Layers className="w-5 h-5 text-primary" />
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold">Key Features</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.features.map((f) => (
                    <div
                      key={f.title}
                      className="bg-surface border border-border rounded-2xl p-5 hover:border-primary transition-colors"
                    >
                      <h3 className="font-bold mb-1.5">{f.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {f.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Capabilities */}
              <section>
                <h2 className="text-2xl md:text-3xl font-extrabold mb-5">
                  What It Does
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {project.results.map((r) => (
                    <div
                      key={r.label}
                      className="bg-surface-2 border border-border rounded-2xl p-6 text-center"
                    >
                      <div className="text-2xl md:text-3xl font-black text-gradient mb-1">
                        {r.metric}
                      </div>
                      <div className="text-sm text-muted-foreground">{r.label}</div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-28 self-start space-y-6">
              <div className="bg-surface border border-border rounded-2xl p-6 space-y-5">
                <h3 className="font-bold text-lg">Project Details</h3>
                <SidebarItem icon={Briefcase} label="Domain" value={project.industry} />
                <SidebarItem icon={Clock} label="Build duration" value={project.timeline} />
                <SidebarItem icon={Tag} label="Work type" value={workOriginLabel(project.workOrigin)} />
                <div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Layers className="w-4 h-4 text-primary" /> Services
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.services.map((s) => (
                      <span
                        key={s}
                        className="text-xs px-2.5 py-1 rounded-full bg-surface-2 border border-border"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4">Tech Stack</h3>
                <div className="space-y-4">
                  {project.stack.map((group) => (
                    <div key={group.group}>
                      <div className="text-xs text-muted-foreground mb-2">
                        {group.group}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="mono text-[11px] px-2.5 py-1 rounded-full bg-surface-2 border border-border"
                          >
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

          {/* Back link */}
          <div className="max-w-5xl mx-auto mt-14 pt-8 border-t border-border">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-primary font-semibold"
            >
              <ArrowLeft className="w-4 h-4" /> All projects
            </Link>
          </div>
        </div>
      </article>

      {/* Related projects */}
      {related.length > 0 && (
        <section className="container-px pb-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-extrabold mb-8">More case studies</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  className="group bg-surface border border-border rounded-2xl overflow-hidden hover:-translate-y-1 hover:border-primary transition-all"
                >
                  <div
                    className="aspect-[16/9] relative"
                    style={{
                      background: `linear-gradient(135deg, ${p.color}40, ${p.color}10)`,
                    }}
                  >
                    <div className="absolute inset-0 dot-grid opacity-30" />
                    <div className="absolute inset-0 grid place-items-center">
                      <div
                        className="w-14 h-14 rounded-2xl grid place-items-center text-xl font-black text-white"
                        style={{ background: p.color }}
                      >
                        {p.name.charAt(0)}
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="mono text-[10px] text-primary">
                      {p.category}
                    </span>
                    <h3 className="text-base font-bold mt-2 leading-snug">
                      {p.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20">
        <div className="container-px">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-brand p-12 md:p-16 text-center">
            <div className="absolute inset-0 dot-grid opacity-10" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                Have a project like this in mind?
              </h2>
              <p className="text-white/80 mt-3 max-w-xl mx-auto">
                We turn ideas into production software — AI, web, mobile, and
                cloud.
              </p>
              <Link
                to="/contact"
                className="mt-7 inline-flex items-center gap-2 bg-white text-[#1a1a2e] font-semibold rounded-xl px-6 py-3 hover:scale-[1.03] transition-transform"
              >
                {PRIMARY_CTA} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
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
