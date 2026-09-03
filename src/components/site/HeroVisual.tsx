import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import BrowserFrame from "@/components/site/BrowserFrame";

type Props = {
  featuredSlug: string;
  featuredName: string;
  imageSrc: string;
};

/**
 * Hero product frame — one uncropped screenshot in a simple browser chrome.
 */
export default function HeroVisual({
  featuredSlug,
  featuredName,
  imageSrc,
}: Props) {
  return (
    <figure className="w-full animate-hero-in">
      <BrowserFrame
        imageSrc={imageSrc}
        alt={`${featuredName} product screenshot`}
        priority
      />
      <figcaption className="mt-3 flex items-center justify-between gap-4">
        <div>
          <span className="label-quiet text-[10px]">Featured work</span>
          <div className="font-display text-base mt-0.5">{featuredName}</div>
        </div>
        <Link
          to="/projects/$slug"
          params={{ slug: featuredSlug }}
          className="inline-flex items-center gap-1 text-sm text-primary font-medium shrink-0 hover:underline"
        >
          Case study <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </figcaption>
    </figure>
  );
}
