import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { ProjectCase } from "@/content/projects";
import { easeOutExpo } from "@/lib/motion";

type Props = {
  projects: ProjectCase[];
  index: number;
  reduced: boolean | null;
};

/** Crossfading featured project frame for the home hero. */
export default function RotatingHeroFeature({ projects, index, reduced }: Props) {
  const project = projects[index % projects.length] ?? projects[0];
  if (!project) return null;

  return (
    <div className="relative border border-border bg-surface overflow-hidden aspect-[16/10] lg:aspect-[4/3]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={reduced ? project.slug : `${project.slug}-${index}`}
          className="absolute inset-0"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.45, ease: easeOutExpo }}
        >
          <Link
            to="/projects/$slug"
            params={{ slug: project.slug }}
            className="group absolute inset-0 block"
          >
            {project.image ? (
              <motion.img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover opacity-90"
                whileHover={reduced ? undefined : { scale: 1.02, opacity: 1 }}
                transition={{ duration: 0.35 }}
              />
            ) : (
              <div className="w-full h-full bg-surface-2 flex items-end p-8">
                <span className="font-display text-2xl">{project.name}</span>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent p-6 pt-16">
              <span className="label-quiet text-[10px]">Featured work</span>
              <div className="font-display text-xl mt-1 group-hover:text-primary transition-colors">
                {project.name}
              </div>
              <span className="inline-flex items-center gap-1 text-sm text-muted-foreground mt-2">
                View case study <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
