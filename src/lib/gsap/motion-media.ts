import type gsap from "gsap";
import { MOTION_MEDIA } from "./constants";

export type GsapMatchMedia = ReturnType<typeof gsap.matchMedia>;

export type MotionMediaHandlers = {
  /** prefers-reduced-motion — static layout only. */
  reduced?: () => void;
  /** Mobile — lightweight fade/translate. */
  mobile?: () => void;
  /** Desktop — full enter animations. */
  desktop?: () => void;
};

/**
 * Register gsap.matchMedia() handlers for all three motion tiers.
 * matchMedia auto-reverts on breakpoint / preference change — do not hand-roll.
 */
export function registerMotionMedia(
  mm: GsapMatchMedia,
  handlers: MotionMediaHandlers,
): void {
  if (handlers.reduced) {
    mm.add(MOTION_MEDIA.reduced, handlers.reduced);
  }
  if (handlers.mobile) {
    mm.add(MOTION_MEDIA.mobile, handlers.mobile);
  }
  if (handlers.desktop) {
    mm.add(MOTION_MEDIA.desktop, handlers.desktop);
  }
}

/** Convenience: create a scoped matchMedia instance inside useGSAP. */
export function createMotionMedia(gsapInstance: typeof gsap): GsapMatchMedia {
  return gsapInstance.matchMedia();
}
