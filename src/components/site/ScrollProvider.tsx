import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouterState } from "@tanstack/react-router";
import type Lenis from "lenis";
import type gsap from "gsap";
import type { ScrollTrigger } from "gsap/ScrollTrigger";

export type ScrollRuntime = {
  lenis: Lenis;
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
};

type ScrollContextValue = {
  /** True once Lenis + ScrollTrigger are initialized client-side. */
  ready: boolean;
  /** Runtime handles — null during SSR and before init. */
  runtime: ScrollRuntime | null;
};

const ScrollContext = createContext<ScrollContextValue>({
  ready: false,
  runtime: null,
});

export function useScrollContext(): ScrollContextValue {
  return useContext(ScrollContext);
}

/** Scroll Lenis to top + refresh ScrollTrigger after route content mounts. */
function RouteScrollSync({
  runtime,
  ready,
}: {
  runtime: ScrollRuntime | null;
  ready: boolean;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!ready || !runtime || typeof window === "undefined") return;

    const { lenis, ScrollTrigger } = runtime;

    lenis.scrollTo(0, { immediate: true });

    // Let the new route paint before recalculating trigger positions.
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, ready, runtime]);

  return null;
}

/**
 * Single Lenis instance + ScrollTrigger wiring for the whole app.
 * All GSAP/Lenis code runs inside this client effect — never at module scope.
 */
export default function ScrollProvider({ children }: { children: ReactNode }) {
  const [runtime, setRuntime] = useState<ScrollRuntime | null>(null);
  const [ready, setReady] = useState(false);
  const destroyedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    destroyedRef.current = false;
    let lenis: Lenis | null = null;
    let tickerCallback: ((time: number) => void) | null = null;
    let gsapInstance: typeof gsap | null = null;
    let ScrollTriggerPlugin: typeof ScrollTrigger | null = null;

    async function init() {
      const [gsapMod, stMod, lenisMod] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);

      if (destroyedRef.current) return;

      gsapInstance = gsapMod.default;
      ScrollTriggerPlugin = stMod.ScrollTrigger;
      gsapInstance.registerPlugin(ScrollTriggerPlugin);

      lenis = new lenisMod.default({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        smoothWheel: true,
      });

      lenis.on("scroll", ScrollTriggerPlugin.update);

      tickerCallback = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsapInstance.ticker.add(tickerCallback);
      gsapInstance.ticker.lagSmoothing(0);

      const nextRuntime: ScrollRuntime = {
        lenis,
        gsap: gsapInstance,
        ScrollTrigger: ScrollTriggerPlugin,
      };

      setRuntime(nextRuntime);
      setReady(true);
    }

    void init();

    return () => {
      destroyedRef.current = true;
      setReady(false);
      setRuntime(null);

      if (tickerCallback && gsapInstance) {
        gsapInstance.ticker.remove(tickerCallback);
      }
      lenis?.destroy();
      ScrollTriggerPlugin?.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ ready, runtime }}>
      <RouteScrollSync runtime={runtime} ready={ready} />
      {children}
    </ScrollContext.Provider>
  );
}
