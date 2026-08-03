import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  fadeUpVariants,
  revealStaggerContainerVariants,
  staggerItemVariants,
  viewOnce,
} from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
};

/** Single element fade-up when scrolled into view. */
export function Reveal({ children, className }: RevealProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={fadeUpVariants(reduced)}
      initial="hidden"
      whileInView="visible"
      viewport={viewOnce}
    >
      {children}
    </motion.div>
  );
}

type RevealStaggerProps = {
  children: ReactNode;
  className?: string;
};

/** Stagger children on scroll — wrap list rows as RevealItem. */
export function RevealStagger({ children, className }: RevealStaggerProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={revealStaggerContainerVariants(reduced)}
      initial="hidden"
      whileInView="visible"
      viewport={viewOnce}
    >
      {children}
    </motion.div>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
};

export function RevealItem({ children, className }: RevealItemProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div className={className} variants={staggerItemVariants(reduced)}>
      {children}
    </motion.div>
  );
}

type RevealListProps = {
  children: ReactNode;
  className?: string;
};

export function RevealOl({ children, className }: RevealListProps) {
  const reduced = useReducedMotion();
  return (
    <motion.ol
      className={className}
      variants={revealStaggerContainerVariants(reduced)}
      initial="hidden"
      whileInView="visible"
      viewport={viewOnce}
    >
      {children}
    </motion.ol>
  );
}

export function RevealLi({ children, className }: RevealItemProps) {
  const reduced = useReducedMotion();
  return (
    <motion.li className={className} variants={staggerItemVariants(reduced)}>
      {children}
    </motion.li>
  );
}
