import { FADE_MS, slideMotionClasses, useRotatingSlide } from "@/components/site/useRotatingSlide";

const HEADLINES = [
  { prefix: "We Build Software That", highlight: "Thinks." },
  { prefix: "We Engineer Systems That", highlight: "Scale." },
  { prefix: "We Train Models That", highlight: "Learn." },
  { prefix: "We Ship Products That", highlight: "Perform." },
  { prefix: "We Build Vision That", highlight: "Sees." },
] as const;

export default function RotatingHeadline() {
  const { index, phase, direction } = useRotatingSlide(HEADLINES.length);
  const { prefix, highlight } = HEADLINES[index];

  return (
    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] relative min-h-[2.2em] md:min-h-[2.15em] lg:min-h-[2.1em] overflow-hidden">
      <span className="invisible block select-none" aria-hidden>
        We Engineer Systems That
        <br />
        <span className="text-gradient">Perform.</span>
      </span>
      <span
        aria-live="polite"
        className={`absolute inset-0 block ${slideMotionClasses(phase, direction)}`}
        style={{ transitionDuration: `${FADE_MS}ms` }}
      >
        {prefix}
        <br />
        <span className="text-gradient">{highlight}</span>
      </span>
    </h1>
  );
}
