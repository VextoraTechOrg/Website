import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { VextoraLogo } from "./VextoraLogo";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
] as const;

const quoteBtnClass =
  "inline-flex items-center gap-2 bg-gradient-brand text-white font-semibold rounded-lg animate-cta-attention hover:scale-[1.03] transition-transform shadow-[0_0_20px_rgba(79,142,247,0.35)]";

export function Logo({ className = "" }: { className?: string }) {
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
      <VextoraLogo className="h-9 w-auto md:h-10" />
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-background/80 border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container-px flex items-center justify-between h-16 md:h-20">
        <Logo />
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden lg:block">
          <Link to="/contact" className={`${quoteBtnClass} px-5 py-2.5 text-sm`}>
            Get a Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-0 top-16 bg-background/98 backdrop-blur-xl">
          <div className="flex flex-col items-center justify-center gap-6 pt-12">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="text-2xl font-semibold text-foreground">
                {l.label}
              </Link>
            ))}
            <Link to="/contact" className={`mt-4 ${quoteBtnClass} px-6 py-3`}>
              Get a Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
