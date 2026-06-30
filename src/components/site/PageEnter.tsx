import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

/** Scroll-down enter when navigating between pages. Skips animation on first load. */
export default function PageEnter({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [visible, setVisible] = useState(true);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    setVisible(false);
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <div
      className={
        visible
          ? "page-enter-to opacity-100 translate-y-0"
          : "page-enter-from opacity-0 -translate-y-8"
      }
    >
      {children}
    </div>
  );
}
