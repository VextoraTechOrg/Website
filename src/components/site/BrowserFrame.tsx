import OptimizedImage from "@/components/site/OptimizedImage";

type Props = {
  imageSrc: string;
  alt: string;
  priority?: boolean;
  className?: string;
};

/** Browser chrome wrapper for product screenshots. */
export default function BrowserFrame({
  imageSrc,
  alt,
  priority = false,
  className = "",
}: Props) {
  return (
    <div
      className={`border border-border bg-surface-2 overflow-hidden rounded ${className}`}
    >
      <div
        className="flex items-center gap-2 px-3 py-2.5 border-b border-border bg-surface"
        aria-hidden
      >
        <span className="w-2.5 h-2.5 rounded-full bg-border" />
        <span className="w-2.5 h-2.5 rounded-full bg-border" />
        <span className="w-2.5 h-2.5 rounded-full bg-border" />
        <span className="ml-2 flex-1 h-5 rounded bg-background/80 border border-border text-[10px] text-muted-foreground flex items-center px-2 truncate">
          app.vextoratech.com
        </span>
      </div>
      <div className="bg-background aspect-[16/10] overflow-hidden">
        <OptimizedImage
          src={imageSrc}
          alt={alt}
          className="w-full h-full object-cover object-top"
          width={1280}
          height={800}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
      </div>
    </div>
  );
}
