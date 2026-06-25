import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CursorGlow from "./CursorGlow";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <CursorGlow />
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
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
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-[0.06]" aria-hidden />
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" aria-hidden />
      <div className="container-px relative py-24 md:py-32 text-center">
        <span className="mono text-xs text-primary inline-block mb-5">⬡ {eyebrow}</span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight max-w-4xl mx-auto">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
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
    <section className={`py-20 md:py-28 ${className}`}>
      <div className="container-px">
        {(eyebrow || title) && (
          <div className="text-center max-w-2xl mx-auto mb-14">
            {eyebrow && <span className="mono text-xs text-primary inline-block mb-3">{eyebrow}</span>}
            {title && <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">{title}</h2>}
            {subtitle && <p className="mt-4 text-muted-foreground">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
