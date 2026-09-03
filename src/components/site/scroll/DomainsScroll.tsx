import { useGSAP } from "@gsap/react";
import { useRef, type ReactNode } from "react";
import { useScrollContext } from "@/components/site/ScrollProvider";
import { MOTION_MEDIA } from "@/lib/gsap/constants";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Domains band — alternating column slide-in on desktop; light fade on mobile. */
export default function DomainsScroll({ children, className = "" }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const { ready, runtime } = useScrollContext();

  useGSAP(
    () => {
      if (!runtime || !sectionRef.current) return;

      const { gsap } = runtime;
      const items = sectionRef.current.querySelectorAll<HTMLElement>("[data-domain-item]");
      if (!items.length) return;

      const mm = gsap.matchMedia();

      mm.add(MOTION_MEDIA.reduced, () => {
        gsap.set(items, { clearProps: "all" });
      });

      mm.add(MOTION_MEDIA.mobile, () => {
        gsap.set(items, { opacity: 1, y: 0 });
        gsap.from(items, {
          opacity: 0,
          y: 14,
          duration: 0.55,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true,
          },
        });
      });

      mm.add(MOTION_MEDIA.desktop, () => {
        const offsets = [-28, 0, 28];
        items.forEach((item, i) => {
          const x = offsets[i % offsets.length];
          gsap.from(item, {
            opacity: 0,
            x,
            duration: 0.65,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 78%",
              once: true,
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [ready, runtime] },
  );

  return (
    <section
      ref={sectionRef}
      className={`section-y-sm bg-surface border-y border-border ${className}`}
    >
      {children}
    </section>
  );
}
