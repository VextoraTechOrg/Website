import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import SiteLayout from "@/components/site/SiteLayout";
import { ArrowLeft, ArrowRight, Clock, Calendar, ChevronRight } from "lucide-react";
import { SITE_URL, getPostBySlug, getRelatedPosts } from "@/content/blog-posts";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) {
      return {
        meta: [
          { title: "Article not found — VextoraTech Blog" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const url = `${SITE_URL}/blog/${post.slug}`;
    return {
      meta: [
        { title: `${post.title} — VextoraTech` },
        { name: "description", content: post.description },
        { name: "keywords", content: post.keywords.join(", ") },
        { name: "author", content: post.author },
        { property: "article:published_time", content: post.datePublished },
        { property: "article:modified_time", content: post.dateModified },
        { property: "article:author", content: post.author },
        { property: "article:section", content: post.category },
        { property: "og:type", content: "article" },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.description },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  loader: ({ params }) => {
    if (!getPostBySlug(params.slug)) throw notFound();
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { slug } = Route.useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <SiteLayout>
        <div className="container-px py-32 text-center">
          <h1 className="text-3xl font-extrabold mb-4">Article not found</h1>
          <p className="text-muted-foreground mb-8">
            This post may have moved or no longer exists.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary font-semibold"
          >
            <ArrowLeft className="w-4 h-4" /> Back to the blog
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const url = `${SITE_URL}/blog/${post.slug}`;
  const related = getRelatedPosts(post.slug);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    keywords: post.keywords.join(", "),
    articleSection: post.category,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "VextoraTech",
      url: SITE_URL,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <SiteLayout>
      {/* Structured data for rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
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
            style={{ background: post.color }}
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
              <Link to="/blog" className="hover:text-foreground">
                Blog
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground truncate max-w-[60vw]">
                {post.title}
              </span>
            </nav>

            <div className="max-w-3xl">
              <span className="mono text-xs text-primary">{post.category}</span>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight mt-3 mb-5 leading-[1.1]">
                {post.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {post.description}
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="w-9 h-9 rounded-full bg-gradient-brand grid place-items-center text-white font-bold">
                    {post.author.charAt(0)}
                  </span>
                  <span>
                    <span className="text-foreground font-medium">
                      {post.author}
                    </span>
                    <span className="block text-xs">{post.authorRole}</span>
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.datePublished}>{post.date}</time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Hero banner */}
        <div className="container-px">
          <div
            className="relative rounded-3xl overflow-hidden aspect-[21/9] max-w-4xl mx-auto border border-border"
            style={{
              background: `linear-gradient(135deg, ${post.color}40, ${post.color}10)`,
            }}
          >
            <div className="absolute inset-0 dot-grid opacity-30" />
            <div className="absolute inset-0 grid place-items-center">
              <div
                className="w-24 h-24 rounded-3xl grid place-items-center text-4xl font-black text-white"
                style={{ background: post.color }}
              >
                {post.title.charAt(0)}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="container-px py-14 md:py-20">
          <div className="article max-w-3xl mx-auto">{post.Content()}</div>

          {/* Share / back */}
          <div className="max-w-3xl mx-auto mt-14 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-primary font-semibold"
            >
              <ArrowLeft className="w-4 h-4" /> All articles
            </Link>
            <span className="text-sm text-muted-foreground">
              Written by {post.author} · {post.authorRole}
            </span>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="container-px pb-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-extrabold mb-8">Keep reading</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
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
                  </div>
                  <div className="p-5">
                    <span className="mono text-[10px] text-primary">
                      {p.category}
                    </span>
                    <h3 className="text-base font-bold mt-2 leading-snug">
                      {p.title}
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
                Have a project that needs this kind of engineering?
              </h2>
              <p className="text-white/80 mt-3 max-w-xl mx-auto">
                We turn ideas into production software — AI, web, mobile, and
                cloud.
              </p>
              <Link
                to="/contact"
                className="mt-7 inline-flex items-center gap-2 bg-white text-[#1a1a2e] font-semibold rounded-xl px-6 py-3 hover:scale-[1.03] transition-transform"
              >
                Start a Conversation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
