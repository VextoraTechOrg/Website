/** Tailwind `md` breakpoint — keep in sync with styles.css / Tailwind config. */
export const MOBILE_MAX_WIDTH_PX = 767;

/** gsap.matchMedia() queries — used by every scroll animation (3b). */
export const MOTION_MEDIA = {
  /** No motion; content stays fully visible and static. */
  reduced: "(prefers-reduced-motion: reduce)",
  /** Lighter motion — simple fade/translate only. */
  mobile: `(max-width: ${MOBILE_MAX_WIDTH_PX}px) and (prefers-reduced-motion: no-preference)`,
  /** Full enter animations (fade, translate, scale — no pin). */
  desktop: `(min-width: ${MOBILE_MAX_WIDTH_PX + 1}px) and (prefers-reduced-motion: no-preference)`,
} as const;
