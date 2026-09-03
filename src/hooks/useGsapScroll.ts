import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useScrollContext } from "@/components/site/ScrollProvider";
import { createMotionMedia, registerMotionMedia } from "@/lib/gsap/motion-media";
import type { MotionMediaHandlers } from "@/lib/gsap/motion-media";

type UseGsapScrollOptions = {
  /** When false, the effect is skipped (e.g. element not mounted). Default true. */
  enabled?: boolean;
  dependencies?: unknown[];
} & MotionMediaHandlers;

/**
 * Scoped GSAP scroll hook — waits for Lenis/ScrollTrigger, runs matchMedia tiers,
 * and cleans up triggers automatically via useGSAP scope.
 */
export function useGsapScroll<T extends HTMLElement>(
  handlers: UseGsapScrollOptions,
) {
  const scopeRef = useRef<T>(null);
  const { ready, runtime } = useScrollContext();
  const { enabled = true, dependencies = [], reduced, mobile, desktop } = handlers;

  useGSAP(
    () => {
      if (!runtime || !enabled) return;

      const { gsap } = runtime;
      const mm = createMotionMedia(gsap);

      registerMotionMedia(mm, { reduced, mobile, desktop });

      return () => mm.revert();
    },
    {
      scope: scopeRef,
      dependencies: [ready, runtime, enabled, reduced, mobile, desktop, ...dependencies],
    },
  );

  return scopeRef;
}
