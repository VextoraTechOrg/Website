import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -999, y: -999 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      if (glowRef.current) {
        glowRef.current.style.transform =
          `translate(${pos.current.x - 300}px, ${pos.current.y - 300}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden
    >
      {/* soft outer bloom */}
      <div
        ref={glowRef}
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(79,142,247,0.13) 0%, rgba(124,58,237,0.07) 45%, transparent 70%)",
          willChange: "transform",
        }}
      />
      {/* tight inner dot */}
      <div
        ref={(el) => {
          if (!el) return;
          const sync = () => {
            el.style.transform =
              `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
            requestAnimationFrame(sync);
          };
          sync();
        }}
        className="absolute w-2 h-2 rounded-full"
        style={{
          background: "rgba(79,142,247,0.7)",
          boxShadow: "0 0 12px 4px rgba(79,142,247,0.5)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
