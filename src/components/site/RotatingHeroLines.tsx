import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { easeOutExpo } from "@/lib/motion";

export const HERO_LINES = [
  "Software engineered for precision — AI, web, and cloud.",
  "Models that learn. Systems that scale. Products that ship.",
  "From vision pipelines to voice AI — built for production.",
  "Intelligent products from idea to infrastructure.",
  "Engineering that closes the gap between idea and delivery.",
] as const;

/** Rotating hero tagline — index driven by parent `useHeroCycle` so it stays in sync with the feature frame. */
export default function RotatingHeroLines({ index }: { index: number }) {
  const reduced = useReducedMotion();
  const i = index % HERO_LINES.length;
  const line = HERO_LINES[i];

  return (
    <span className="relative mt-3 block min-h-[3.3em] md:min-h-[3.2em] overflow-hidden">
      <span className="invisible block select-none" aria-hidden>
        {HERO_LINES.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={reduced ? 0 : i}
          aria-live="polite"
          className="absolute inset-x-0 top-0 block text-foreground"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -18 }}
          transition={{ duration: 0.4, ease: easeOutExpo }}
        >
          {reduced ? HERO_LINES[0] : line}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
