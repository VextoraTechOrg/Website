type Props = {
  className?: string;
  /** `nav` = compact header mark; `full` = larger footer lockup. */
  variant?: "nav" | "full";
};

/** Official lockup — navy wordmark + cyan hexagon (designed for light backgrounds). */
export function VextoraLogo({ className = "", variant = "nav" }: Props) {
  const size =
    variant === "full"
      ? "h-[4.5rem] md:h-20 w-auto max-w-[13rem]"
      : "h-12 md:h-14 w-auto max-w-[10.5rem] md:max-w-[12rem]";

  return (
    <img
      src="/vextoratech_logo_white.png"
      alt="VextoraTech"
      className={`object-contain object-left ${size} ${className}`}
      decoding="async"
    />
  );
}
