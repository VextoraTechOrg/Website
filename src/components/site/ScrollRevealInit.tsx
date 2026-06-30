import { useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";

const REVEAL_BASE =
  "main .container-px, footer .container-px, main section > .overflow-hidden";

function collectRevealTargets() {
  const targets = new Set<Element>();

  document.querySelectorAll(REVEAL_BASE).forEach((el) => {
    // Skip outer wrappers when inner sections will animate individually
    if (el.querySelector(":scope .space-y-14 > section")) return;
    targets.add(el);
  });

  document.querySelectorAll("main .space-y-14 > section, main section section").forEach((el) => {
    targets.add(el);
  });

  document.querySelectorAll("main section").forEach((section) => {
    if (section.querySelector(":scope > .container-px")) return;

    const content = section.querySelector(":scope > div:not([aria-hidden])");
    if (content) targets.add(content);
  });

  return [...targets];
}

/** Applies scroll-down reveal when content enters the viewport. */
export default function ScrollRevealInit() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let observer: IntersectionObserver | undefined;

    const frame = requestAnimationFrame(() => {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const el = entry.target;
            el.classList.remove("scroll-reveal-pending");
            requestAnimationFrame(() => {
              el.classList.add("scroll-reveal-visible");
            });
            observer?.unobserve(el);
          }
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
      );

      const nodes = collectRevealTargets();
      nodes.forEach((node, i) => {
        node.classList.remove("scroll-reveal-visible", "scroll-reveal-pending");
        (node as HTMLElement).style.setProperty(
          "--reveal-delay",
          `${Math.min(i, 8) * 70}ms`,
        );

        const rect = node.getBoundingClientRect();
        const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;

        if (inView) {
          node.classList.add("scroll-reveal-visible");
        } else {
          node.classList.add("scroll-reveal-pending");
          observer?.observe(node);
        }
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
