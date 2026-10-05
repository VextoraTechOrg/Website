import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import HeroVisual from "@/components/site/HeroVisual";
import { getHeroCarouselProjects, getProjectBySlug } from "@/content/projects";
import { useHeroCycle } from "@/hooks/useHeroCycle";
import { HERO_CYCLE_MS, HERO_ROTATION, PRIMARY_CTA, SECONDARY_CTA } from "@/lib/site-copy";

const CAROUSEL_PROJECTS = getHeroCarouselProjects();

/**
 * Split hero adapted from 21st Agency / Enterprise hero patterns:
 * brand eyebrow, dual CTAs, product frame — no fake avatars or stat pills.
 */
export default function Hero() {
  const slideCount = HERO_ROTATION.length;
  const index = useHeroCycle(slideCount, HERO_CYCLE_MS);
  const slide = HERO_ROTATION[index];
  const project =
    getProjectBySlug(slide.slug) ?? CAROUSEL_PROJECTS[index] ?? CAROUSEL_PROJECTS[0];

  if (!project) return null;

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 brand-wash" aria-hidden />
      <div className="absolute inset-0 line-texture opacity-25" aria-hidden />
      <div className="container-px relative grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1fr_1.15fr] lg:gap-14 lg:py-20 animate-fade-up">
        <div aria-live="polite" aria-atomic="true" className="max-w-xl">
          <p className="label-quiet mb-4">
            Smart solutions that grow with your business
          </p>
          <h1 className="font-display text-[2.35rem] leading-[1.08] tracking-tight text-foreground md:text-5xl lg:text-[3.35rem]">
            <span className="text-gradient">VextoraTech</span>
            <span key={slide.slug} className="mt-2 block animate-hero-in">
              {slide.headline}
            </span>
          </h1>
          <p
            key={`${slide.slug}-sub`}
            className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg animate-hero-in"
          >
            {slide.subline}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_8px_24px_-12px_oklch(0.55_0.1_230)] transition-[opacity,transform] hover:opacity-90 active:scale-[0.98]"
            >
              {PRIMARY_CTA} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded border border-border bg-surface/80 px-6 py-3 text-sm font-medium backdrop-blur-sm transition-colors hover:border-primary"
            >
              {SECONDARY_CTA}
            </Link>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            AI · web · mobile · cloud — engineered in Lahore for teams worldwide.
          </p>
        </div>

        <div className="relative">
          <div
            className="pointer-events-none absolute -inset-6 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-primary/5 blur-2xl"
            aria-hidden
          />
          <HeroVisual
            key={project.slug}
            featuredSlug={project.slug}
            featuredName={project.name}
            imageSrc={project.image}
          />
        </div>
      </div>
    </section>
  );
}
