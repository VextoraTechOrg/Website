import type { Transition, Variants } from "motion/react";

/** Shared industrial easing — restrained, not bouncy. */
export const easeOutExpo: Transition["ease"] = [0.22, 1, 0.36, 1];

export const fadeTransition: Transition = {
  duration: 0.45,
  ease: easeOutExpo,
};

const instant: Transition = { duration: 0 };

/** Fade + slight rise for single elements. */
export function fadeUpVariants(reduced: boolean | null): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0, transition: instant },
    };
  }
  return {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: fadeTransition },
  };
}

/** Parent for staggered children. */
export function staggerContainerVariants(reduced: boolean | null): Variants {
  if (reduced) {
    return {
      hidden: {},
      visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
    };
  }
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.04 },
    },
  };
}

/** Child of stagger container. */
export function staggerItemVariants(reduced: boolean | null): Variants {
  return fadeUpVariants(reduced);
}

/** List/row stagger — slightly tighter than hero. */
export function revealStaggerContainerVariants(reduced: boolean | null): Variants {
  if (reduced) {
    return {
      hidden: {},
      visible: { transition: { staggerChildren: 0 } },
    };
  }
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.06, delayChildren: 0.02 },
    },
  };
}

/** Accent rule draw left → right. */
export function ruleDrawVariants(reduced: boolean | null): Variants {
  if (reduced) {
    return {
      hidden: { scaleX: 1 },
      visible: { scaleX: 1, transition: instant },
    };
  }
  return {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.55, ease: easeOutExpo },
    },
  };
}

export const viewOnce = { once: true, amount: 0.25 as const };
export const viewOnceRule = { once: true, amount: 0.4 as const };
