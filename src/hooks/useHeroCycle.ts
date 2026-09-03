import { useEffect, useState } from "react";

/**
 * Cycles `0 … count-1` on an interval.
 * Pauses when reduced-motion is preferred or count ≤ 1.
 */
export function useHeroCycle(count: number, intervalMs: number): number {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (count <= 1) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [count, intervalMs]);

  return index;
}
