import { useGSAP } from "@gsap/react";
import { useRef, type ReactNode } from "react";
import { useScrollContext } from "@/components/site/ScrollProvider";
import { MOTION_MEDIA } from "@/lib/gsap/constants";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Featured work grid — lead card scale reveal + compact card stagger. */
export default function FeaturedWorkScroll({ children, className = "" }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const { ready, runtime } = useScrollContext();

  useGSAP(
    () => {
      if (!runtime || !sectionRef.current) return;

      const { gsap } = runtime;
      const lead = sectionRef.current.querySelector<HTMLElement>("[data-featured-lead]");
      const cards = sectionRef.current.querySelectorAll<HTMLElement>("[data-featured-card]");

      const mm = gsap.matchMedia();

      mm.add(MOTION_MEDIA.reduced, () => {
        if (lead) gsap.set(lead, { clearProps: "all" });
        gsap.set(cards, { clearProps: "all" });
      });

      mm.add(MOTION_MEDIA.mobile, () => {
        if (lead) {
          gsap.set(lead, { opacity: 1, y: 0 });
          gsap.from(lead, {
            opacity: 0,
            y: 16,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          });
        }
      });

      mm.add(MOTION_MEDIA.desktop, () => {
        if (lead) {
          gsap.from(lead, {
            opacity: 0,
            scale: 0.96,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
          });
        }

        if (cards.length) {
          gsap.from(cards, {
            opacity: 0,
            y: 20,
            duration: 0.55,
            stagger: 0.08,
            ease: "power2.out",
            delay: 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 72%",
              once: true,
            },
          });
        }
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [ready, runtime] },
  );

  return (
    <section ref={sectionRef} className={`section-y ${className}`}>
      {children}
    </section>
  );
}
