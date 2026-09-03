import { createFileRoute, Link } from "@tanstack/react-router";
import SiteLayout, { PageHero, Section } from "@/components/site/SiteLayout";
import OptimizedImage from "@/components/site/OptimizedImage";
import { ArrowRight, Clock } from "lucide-react";
import { useState } from "react";
import { BLOG_POSTS, SITE_URL, getPostCoverImage } from "@/content/blog-posts";
import { OG_DEFAULT } from "@/lib/media";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — VextoraTech" },
      {
        name: "description",
        content:
          "Engineering insights on AI, full-stack patterns, and DevOps from the VextoraTech team. Practical, production-tested writing on what we build.",
      },
      { name: "keywords", content: "AI, machine learning, web development, DevOps, FastAPI, RAG, engineering blog" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "VextoraTech Engineering Blog" },
      { property: "og:description", content: "We write about what we build." },
      { property: "og:url", content: `${SITE_URL}/blog` },
      { property: "og:image", content: `${SITE_URL}${OG_DEFAULT}` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
  }),
  component: BlogPage,
});

const CATEGORIES = ["All", "AI & ML", "Web Dev", "DevOps", "Design", "Engineering"] as const;
type Cat = (typeof CATEGORIES)[number];

function BlogPage() {
  const [active, setActive] = useState<Cat>("All");
  const filtered =
    active === "All" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === active);
  const featured = BLOG_POSTS[0];

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Insights"
        title={
          <>
            The VextoraTech <span className="text-gradient">engineering blog</span>
          </>
        }
        subtitle="We write about what we build. AI, full-stack patterns, DevOps, and the occasional hard lesson."
      />

      <Section>
        <Link
          to="/blog/$slug"
          params={{ slug: featured.slug }}
          className="group block border border-border mb-12 hover:border-primary transition-colors overflow-hidden"
        >
          <div className="grid lg:grid-cols-[1.2fr_1fr]">
            <OptimizedImage
              src={getPostCoverImage(featured)}
              alt=""
              className="w-full h-full min-h-[200px] object-cover"
              width={800}
              height={420}
              priority
            />
            <div className="p-8 md:p-10 flex flex-col justify-end">
              <span className="label-quiet mb-3 block">
                Featured · {featured.category}
              </span>
              <h2 className="font-display text-2xl md:text-3xl leading-tight group-hover:text-primary transition-colors">
                {featured.title}
              </h2>
              <p className="text-muted-foreground mt-4 mb-5">{featured.excerpt}</p>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                <span>{featured.author}</span> · <span>{featured.date}</span> ·{" "}
                <span>{featured.readTime}</span>
              </div>
              <span className="inline-flex items-center gap-2 text-primary font-medium">
                Read article <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </Link>

        <div className="flex flex-wrap gap-1 border-b border-border mb-10">
          {CATEGORIES.map((c) => (
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

        <div className="border-t border-border">
          {filtered.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group grid md:grid-cols-[10rem_1fr_auto] gap-4 md:gap-8 items-center py-8 border-b border-border hover:bg-surface/50 -mx-2 px-2 transition-colors"
            >
              <OptimizedImage
                src={getPostCoverImage(p)}
                alt=""
                className="w-full aspect-[16/10] object-cover border border-border hidden md:block"
                width={320}
                height={200}
              />
              <div>
                <span className="text-xs text-primary">{p.category}</span>
                <h3 className="font-display text-lg group-hover:text-primary transition-colors leading-snug mt-1">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{p.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-3">
                  <span>{p.author}</span>
                  <span>{p.date}</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" /> {p.readTime}
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
