import { useGSAP } from "@gsap/react";
import { useRef, type ReactNode } from "react";
import { useScrollContext } from "@/components/site/ScrollProvider";
import { MOTION_MEDIA } from "@/lib/gsap/constants";

type Props = {
  children: ReactNode;
};

/**
 * Process steps — accent line + step fade on enter (once).
 */
export default function ProcessReveal({ children }: Props) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const { ready, runtime } = useScrollContext();

  useGSAP(
    () => {
      if (!runtime || !scopeRef.current) return;

      const { gsap } = runtime;
      const line = scopeRef.current.querySelector<HTMLElement>("[data-process-line]");
      const steps = scopeRef.current.querySelectorAll<HTMLElement>("[data-process-step]");
      if (!line || !steps.length) return;

      const mm = gsap.matchMedia();

      mm.add(MOTION_MEDIA.reduced, () => {
        gsap.set(line, { clearProps: "all" });
        gsap.set(steps, { clearProps: "all" });
      });

      mm.add(MOTION_MEDIA.mobile, () => {
        gsap.set(line, { scaleX: 1 });
        gsap.from(steps, {
          opacity: 0,
          y: 12,
          duration: 0.5,
          stagger: 0.09,
          ease: "power2.out",
          scrollTrigger: {
            trigger: scopeRef.current,
            start: "top 82%",
            once: true,
          },
        });
      });

      mm.add(MOTION_MEDIA.desktop, () => {
        gsap.set(line, { scaleX: 0, transformOrigin: "left center" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scopeRef.current,
            start: "top 78%",
            once: true,
          },
        });

        tl.to(line, {
          scaleX: 1,
          duration: 0.65,
          ease: "power2.out",
        }).from(
          steps,
          {
            opacity: 0,
            y: 16,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.35",
        );
      });

      return () => mm.revert();
    },
    { scope: scopeRef, dependencies: [ready, runtime] },
  );

  return <div ref={scopeRef}>{children}</div>;
}
