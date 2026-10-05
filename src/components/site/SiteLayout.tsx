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
      <main className="flex-1 pt-[4.5rem] md:pt-20">
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
      <div className="absolute inset-0 brand-wash" aria-hidden />
      <div className="absolute inset-0 line-texture opacity-30" aria-hidden />
      <div className="container-px relative section-y-md">
        <span className="label-quiet inline-block mb-2">{eyebrow}</span>
        <AccentRule className="w-12 mb-4" />
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight max-w-3xl text-foreground">
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

/** Shared CTA band — agency-style dual actions + brand wash. */
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
        <div className="relative overflow-hidden rounded-xl border border-border bg-surface px-6 py-10 md:px-12 md:py-12">
          <div className="pointer-events-none absolute inset-0 brand-wash opacity-80" aria-hidden />
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/15 blur-3xl"
            aria-hidden
          />
          <AccentRule className="absolute left-0 right-0 top-0 z-[1] w-full" />
          <div className="relative z-[1] max-w-2xl">
            {note && (
              <p className="mb-5 max-w-xl border-l-2 border-primary pl-4 text-sm text-muted-foreground">
                {note}
              </p>
            )}
            <h2 className="font-display max-w-2xl text-2xl tracking-tight text-foreground md:text-4xl">
              {title}
            </h2>
            {body && (
              <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">{body}</p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={primaryTo}
                className="inline-flex items-center gap-2 rounded bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_8px_24px_-12px_oklch(0.55_0.1_230)] transition-[opacity,transform] hover:opacity-90 active:scale-[0.98]"
              >
                {primaryLabel} <ArrowRight className="h-4 w-4" />
              </Link>
              {secondaryTo && secondaryLabel && (
                <Link
                  to={secondaryTo}
                  className="inline-flex items-center gap-2 rounded border border-border bg-background/80 px-6 py-3 text-sm font-medium backdrop-blur-sm transition-colors hover:border-primary"
                >
                  {secondaryLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
