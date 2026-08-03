import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/** Shared cycle length for hero tagline + featured project. */
export const HERO_HOLD_MS = 3200;

/** Cycles `0 … count-1` on an interval; freezes at 0 when reduced-motion is on. */
export function useHeroCycle(count: number) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || count <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, HERO_HOLD_MS);
    return () => clearInterval(id);
  }, [reduced, count]);

  return { index: reduced ? 0 : index, reduced };
}
