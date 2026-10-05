import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { VextoraLogo } from "./VextoraLogo";
import { PRIMARY_CTA } from "@/lib/site-copy";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
] as const;

/** Sticky agency header patterns from 21st Agency Hero (shadcnspace/hero-01). */
const quoteBtnClass =
  "inline-flex items-center gap-2 rounded bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_6px_20px_-10px_oklch(0.55_0.1_230)] transition-[opacity,transform] hover:opacity-90 active:scale-[0.98]";

export function Logo({
  className = "",
  variant = "nav",
}: {
  className?: string;
  variant?: "nav" | "full";
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const handleClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link
      to="/"
      resetScroll
      onClick={handleClick}
      className={`inline-flex shrink-0 items-center ${className}`}
      aria-label="VextoraTech home"
    >
      <VextoraLogo variant={variant} />
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const solidHeader = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
          solidHeader
            ? "border-b border-border/80 bg-background/90 shadow-[0_1px_0_oklch(0.32_0.045_245_/_0.06)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-px flex h-[4.5rem] items-center justify-between md:h-20">
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => {
              const active = pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground ${
                    active ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {l.label}
                  {active && (
                    <span
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary"
                      aria-hidden
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="hidden lg:block">
            <Link to="/contact" className={quoteBtnClass}>
              {PRIMARY_CTA} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <button
            type="button"
            className="rounded-md p-2 text-foreground transition-colors hover:bg-muted lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {open && (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-[55] bg-background/98 backdrop-blur-md lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="h-[4.5rem] shrink-0" aria-hidden />
          <nav className="h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-t border-border px-6 pb-10 pt-4">
            <div className="flex flex-col gap-1">
              {links.map((l) => {
                const active = pathname === l.to;
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={`border-b border-border py-3.5 font-display text-xl transition-colors ${
                      active ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className={`mt-8 self-start ${quoteBtnClass} px-6 py-3`}
              >
                {PRIMARY_CTA} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
