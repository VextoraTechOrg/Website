import { useReducedMotion } from "motion/react";
import { useState } from "react";
import { Play } from "lucide-react";
import OptimizedImage from "@/components/site/OptimizedImage";

type Props = {
  title: string;
  poster: string;
  webm?: string;
  mp4?: string;
};

/**
 * Case-study media slot — plays a real recording when `webm`/`mp4` are set;
 * otherwise shows the project screenshot (no fake Ken Burns loop).
 */
export default function CaseStudyVideo({ title, poster, webm, mp4 }: Props) {
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const hasVideo = Boolean(webm || mp4);

  if (reduced || !hasVideo) {
    return (
      <div className="border border-border overflow-hidden">
        <OptimizedImage
          src={poster}
          alt={`${title} product screenshot`}
          className="w-full aspect-video object-cover"
          width={1280}
          height={720}
        />
      </div>
    );
  }

  if (playing) {
    return (
      <div className="border border-border overflow-hidden bg-black">
        <video
          className="w-full aspect-video"
          controls
          autoPlay
          playsInline
          poster={poster}
        >
          {webm ? <source src={webm} type="video/webm" /> : null}
          {mp4 ? <source src={mp4} type="video/mp4" /> : null}
        </video>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative w-full border border-border overflow-hidden text-left"
      aria-label={`Play ${title} demo`}
    >
      <OptimizedImage
        src={poster}
        alt={`${title} demo poster`}
        className="w-full aspect-video object-cover opacity-90 group-hover:opacity-100 transition-opacity"
        width={1280}
        height={720}
      />
      <span className="absolute inset-0 grid place-items-center bg-background/30 group-hover:bg-background/20 transition-colors">
        <span className="w-14 h-14 rounded-full bg-primary text-primary-foreground grid place-items-center">
          <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
        </span>
      </span>
    </button>
  );
}
