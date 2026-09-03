import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageEnter from "./PageEnter";
import WhatsAppButton from "./WhatsAppButton";
import { ArrowRight } from "lucide-react";
import { ruleDrawVariants, viewOnceRule } from "@/lib/motion";

function AccentRule({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={`h-px bg-primary origin-left ${className}`}
      variants={ruleDrawVariants(reduced)}
      initial="hidden"
      whileInView="visible"
      viewport={viewOnceRule}
      aria-hidden
    />
  );
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-[4.25rem]">
        <PageEnter>
          {children}
        </PageEnter>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 line-texture opacity-40" aria-hidden />
      <div className="container-px relative section-y-md">
        <span className="label-quiet inline-block mb-2">{eyebrow}</span>
        <AccentRule className="w-12 mb-4" />
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight max-w-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">{subtitle}</p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}

export function Section({
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}: {
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`section-y ${className}`}>
      <div className="container-px">
        {(eyebrow || title) && (
          <div className="max-w-2xl mb-8">
            {eyebrow && <span className="label-quiet inline-block mb-2">{eyebrow}</span>}
            {eyebrow && <AccentRule className="w-12 mb-3" />}
            {title && (
              <h2 className="font-display text-3xl md:text-4xl tracking-tight">{title}</h2>
            )}
            {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

/** Shared industrial CTA band — surface + accent rule, no glow gradient slab. */
export function CtaBand({
  title,
  body,
  note,
  primaryTo = "/contact",
  primaryLabel,
  secondaryTo,
  secondaryLabel,
}: {
  title: ReactNode;
  body?: string;
  note?: string;
  primaryTo?: "/contact" | "/projects" | "/";
  primaryLabel: string;
  secondaryTo?: "/contact" | "/projects" | "/";
  secondaryLabel?: string;
}) {
  return (
    <section className="section-y-sm">
      <div className="container-px">
        <div className="border border-border bg-surface px-6 py-8 md:px-10 md:py-10 relative overflow-hidden">
          <AccentRule className="absolute top-0 left-0 right-0 w-full" />
          {note && (
            <p className="text-sm text-muted-foreground border-l-2 border-primary pl-4 mb-5 max-w-xl">
              {note}
            </p>
          )}
          <h2 className="font-display text-2xl md:text-3xl tracking-tight max-w-2xl">
            {title}
          </h2>
          {body && (
            <p className="mt-3 text-muted-foreground max-w-xl">{body}</p>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={primaryTo}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium rounded px-5 py-3 text-sm hover:opacity-90 transition-opacity"
            >
              {primaryLabel} <ArrowRight className="w-4 h-4" />
            </Link>
            {secondaryTo && secondaryLabel && (
              <Link
                to={secondaryTo}
                className="inline-flex items-center gap-2 border border-border rounded px-5 py-3 text-sm font-medium hover:border-primary transition-colors"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
