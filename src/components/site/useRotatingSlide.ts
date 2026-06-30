import { useEffect, useState } from "react";

const CYCLE_MS = 3000;
const FADE_MS = 400;
const HOLD_MS = CYCLE_MS - FADE_MS * 2;

export type SlideDirection = "up" | "down";
export type SlidePhase = "idle" | "exit" | "enter";

export function useRotatingSlide(count: number) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<SlidePhase>("idle");
  const [direction, setDirection] = useState<SlideDirection>("up");

  useEffect(() => {
    let holdTimer: ReturnType<typeof setTimeout>;
    let exitTimer: ReturnType<typeof setTimeout>;

    const scheduleCycle = () => {
      holdTimer = setTimeout(() => {
        setPhase("exit");
        exitTimer = setTimeout(() => {
          setDirection((d) => (d === "up" ? "down" : "up"));
          setIndex((i) => (i + 1) % count);
          setPhase("enter");
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setPhase("idle");
              scheduleCycle();
            });
          });
        }, FADE_MS);
      }, HOLD_MS);
    };

    scheduleCycle();

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
    };
  }, [count]);

  return { index, phase, direction, fadeMs: FADE_MS };
}

export function slideMotionClasses(phase: SlidePhase, direction: SlideDirection) {
  const transition = phase === "enter" ? "transition-none" : "transition-all ease-in-out";

  if (phase === "idle") {
    return `${transition} opacity-100 translate-y-0`;
  }

  if (phase === "exit") {
    const exitY = direction === "up" ? "-translate-y-8" : "translate-y-8";
    return `${transition} opacity-0 ${exitY}`;
  }

  const enterY = direction === "up" ? "translate-y-8" : "-translate-y-8";
  return `${transition} opacity-0 ${enterY}`;
}

export { FADE_MS };
