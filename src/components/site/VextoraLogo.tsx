import { useId } from "react";

export function VextoraLogo({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const vMarkId = `vMark-${id}`;
  const glowId = `glow-${id}`;

  return (
    <svg
      viewBox="0 0 600 150"
      xmlns="http://www.w3.org/2000/svg"
      fontFamily="'Poppins','Plus Jakarta Sans','Segoe UI',system-ui,sans-serif"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={vMarkId} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#3B82F6" />
          <stop offset="0.5" stopColor="#6366F1" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
        <filter id={glowId} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect x="0" y="0" width="600" height="150" rx="20" fill="#0B1120" />

      <g
        fill="none"
        stroke={`url(#${vMarkId})`}
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#${glowId})`}
      >
        <path d="M 50 44 L 88 112" />
        <path d="M 88 112 L 152 24" />
        <path d="M 130 24 L 152 24 L 152 47" />
      </g>

      <text x="196" y="92" fontSize="50" fontWeight="700" letterSpacing="-1">
        <tspan fill="#F8FAFC">Vextora</tspan>
        <tspan fill="#8B9CFF"> Tech</tspan>
      </text>
    </svg>
  );
}
