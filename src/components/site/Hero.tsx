import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import HeroVisual from "@/components/site/HeroVisual";
import { getHeroCarouselProjects, getProjectBySlug } from "@/content/projects";
import { useHeroCycle } from "@/hooks/useHeroCycle";
import { HERO_CYCLE_MS, HERO_ROTATION, PRIMARY_CTA, SECONDARY_CTA } from "@/lib/site-copy";

const CAROUSEL_PROJECTS = getHeroCarouselProjects();

export default function Hero() {
  const slideCount = HERO_ROTATION.length;
  const index = useHeroCycle(slideCount, HERO_CYCLE_MS);
  const slide = HERO_ROTATION[index];
  const project =
    getProjectBySlug(slide.slug) ?? CAROUSEL_PROJECTS[index] ?? CAROUSEL_PROJECTS[0];

  if (!project) return null;

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="container-px relative grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12 items-center py-8 md:py-10 lg:py-12 animate-fade-up">
        <div aria-live="polite" aria-atomic="true">
          <h1 className="font-display text-4xl md:text-5xl lg:text-[3rem] tracking-tight leading-[1.1] max-w-xl">
            <span className="text-primary">VextoraTech</span>
            <span key={slide.slug} className="block mt-1.5 animate-hero-in">
              {slide.headline}
            </span>
          </h1>
          <p key={`${slide.slug}-sub`} className="mt-4 text-base md:text-lg text-muted-foreground max-w-md animate-hero-in">
            {slide.subline}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium rounded px-5 py-2.5 text-sm hover:opacity-90 transition-opacity"
            >
              {PRIMARY_CTA} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 border border-border rounded px-5 py-2.5 text-sm font-medium hover:border-primary transition-colors"
            >
              {SECONDARY_CTA}
            </Link>
          </div>
        </div>

        <HeroVisual
          key={project.slug}
          featuredSlug={project.slug}
          featuredName={project.name}
          imageSrc={project.image}
        />
      </div>
    </section>
  );
}
