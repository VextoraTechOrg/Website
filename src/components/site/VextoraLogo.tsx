/** Steel-cyan wordmark — matches site palette, no purple. */
export function VextoraLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 40"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="VextoraTech"
    >
      <g fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <path d="M4 32 L16 8" />
        <path d="M16 8 L28 32" />
        <path d="M24 8 L28 8 L28 12" />
      </g>
      <text
        x="36"
        y="27"
        fontFamily="var(--font-display), 'Space Grotesk', system-ui, sans-serif"
        fontSize="18"
        fontWeight="600"
        letterSpacing="-0.02em"
        fill="currentColor"
        className="text-foreground"
      >
        Vextora
        <tspan fill="#5b9fd4">Tech</tspan>
      </text>
    </svg>
  );
}
