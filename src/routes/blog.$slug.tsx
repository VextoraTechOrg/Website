import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import SiteLayout, { CtaBand } from "@/components/site/SiteLayout";
import { ArrowLeft, Clock, Calendar, ChevronRight } from "lucide-react";
import { SITE_URL, getPostBySlug, getRelatedPosts, getPostCoverImage } from "@/content/blog-posts";
import { PRIMARY_CTA } from "@/lib/site-copy";

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
    const ogImage = `${SITE_URL}${getPostCoverImage(post)}`;
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
        { property: "og:image", content: ogImage },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.description },
        { name: "twitter:image", content: ogImage },
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
        <div className="container-px py-32">
          <h1 className="font-display text-3xl mb-4">Article not found</h1>
          <p className="text-muted-foreground mb-8">
            This post may have moved or no longer exists.
          </p>
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to the blog
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const url = `${SITE_URL}/blog/${post.slug}`;
  const coverImage = `${SITE_URL}${getPostCoverImage(post)}`;
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
    image: coverImage,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
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
              <Link to="/blog" className="hover:text-foreground">Blog</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground truncate max-w-[60vw]">{post.title}</span>
            </nav>

            <div className="max-w-3xl">
              <span className="label-quiet">{post.category}</span>
              <h1 className="font-display text-3xl md:text-5xl tracking-tight mt-3 mb-5 leading-[1.1]">
                {post.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">{post.description}</p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <div>
                  <span className="text-foreground font-medium">{post.author}</span>
                  <span className="block text-xs">{post.authorRole}</span>
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

        <div className="container-px py-14 md:py-20">
          <div className="article max-w-3xl">{post.Content()}</div>

          <div className="max-w-3xl mt-14 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
            <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-medium">
              <ArrowLeft className="w-4 h-4" /> All articles
            </Link>
            <span className="text-sm text-muted-foreground">
              Written by {post.author} · {post.authorRole}
            </span>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="container-px pb-8">
          <div className="max-w-3xl">
            <h2 className="font-display text-2xl mb-8">Keep reading</h2>
            <div className="border-t border-border">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group grid md:grid-cols-[7rem_1fr] gap-4 py-6 border-b border-border hover:bg-surface/40 -mx-2 px-2 transition-colors"
                >
                  <span className="text-xs text-primary">{p.category}</span>
                  <h3 className="font-display text-base group-hover:text-primary transition-colors leading-snug">
                    {p.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container-px pb-4">
        <div className="max-w-3xl flex flex-wrap gap-6 text-sm">
          <Link to="/services" className="text-primary font-medium hover:underline">Our services</Link>
          <Link to="/projects" className="text-primary font-medium hover:underline">Case studies</Link>
        </div>
      </section>

      <CtaBand
        title="Have a project that needs this kind of engineering?"
        body="We turn ideas into production software — AI, web, mobile, and cloud."
        primaryLabel={PRIMARY_CTA}
      />
    </SiteLayout>
  );
}
