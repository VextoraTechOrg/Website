import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { easeOutExpo } from "@/lib/motion";

/** Fade/rise on route change. Skips animation on first load. */
export default function PageEnter({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isFirst = useRef(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    isFirst.current = false;
  }, []);

  const skip = reduced || isFirst.current;

  return (
    <motion.div
      key={pathname}
      initial={skip ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        skip
          ? { duration: 0 }
          : { duration: 0.4, ease: easeOutExpo }
      }
    >
      {children}
    </motion.div>
  );
}
