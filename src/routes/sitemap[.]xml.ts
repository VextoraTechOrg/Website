import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { BLOG_POSTS, SITE_URL } from "@/content/blog-posts";
import { PROJECTS } from "@/content/projects";

const BASE_URL = SITE_URL;

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = [
          "/",
          "/services",
          "/projects",
          "/about",
          "/blog",
          "/careers",
          "/contact",
        ];
        const staticUrls = staticPaths.map(
          (p) =>
            `  <url>\n    <loc>${BASE_URL}${p}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`,
        );
        const postUrls = BLOG_POSTS.map(
          (post) =>
            `  <url>\n    <loc>${BASE_URL}/blog/${post.slug}</loc>\n    <lastmod>${post.dateModified}</lastmod>\n    <changefreq>monthly</changefreq>\n  </url>`,
        );
        const projectUrls = PROJECTS.map(
          (project) =>
            `  <url>\n    <loc>${BASE_URL}/projects/${project.slug}</loc>\n    <changefreq>monthly</changefreq>\n  </url>`,
        );
        const urls = [...staticUrls, ...postUrls, ...projectUrls].join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});