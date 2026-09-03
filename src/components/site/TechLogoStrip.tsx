import {
  siReact,
  siFastapi,
  siPython,
  siPostgresql,
  siDocker,
  siKubernetes,
  siPytorch,
  siTypescript,
} from "simple-icons";

type IconData = { title: string; path: string };

const STACK: IconData[] = [
  siReact,
  siTypescript,
  siFastapi,
  siPython,
  siPostgresql,
  siDocker,
  siKubernetes,
  siPytorch,
];

function BrandIcon({ icon }: { icon: IconData }) {
  return (
    <span
      className="inline-flex items-center justify-center w-9 h-9 text-foreground/75 hover:text-primary transition-colors"
      title={icon.title}
      aria-label={icon.title}
    >
      <svg
        role="img"
        viewBox="0 0 24 24"
        className="w-5 h-5 fill-current"
        aria-hidden
      >
        <path d={icon.path} />
      </svg>
    </span>
  );
}

export default function TechLogoStrip() {
  return (
    <section className="section-y-sm border-b border-border bg-surface/40">
      <div className="container-px flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
        <span className="label-quiet shrink-0">Tech we build with</span>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {STACK.map((icon) => (
            <BrandIcon key={icon.title} icon={icon} />
          ))}
        </div>
      </div>
    </section>
  );
}
