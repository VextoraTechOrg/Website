import { Image } from "@unpic/react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  priority?: boolean;
};

/**
 * Responsive image via @unpic — auto WebP/AVIF where the CDN/source supports it.
 * For static /public assets, unpic still handles sizing and lazy loading cleanly.
 */
export default function OptimizedImage({
  src,
  alt,
  className,
  width = 1600,
  height = 1000,
  loading = "lazy",
  priority = false,
}: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? "eager" : loading}
      decoding="async"
    />
  );
}
