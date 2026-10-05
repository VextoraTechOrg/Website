import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { Logo } from "./Navbar";
import { COMPANY } from "@/lib/site-copy";

/** Layout adapted from 21st Agency Footer (shadcnspace/footer-01). */
const services = [
  ["AI & Machine Learning", "/services"],
  ["Web Development", "/services"],
  ["Mobile Apps", "/services"],
  ["Cloud & DevOps", "/services"],
  ["UI/UX Design", "/services"],
  ["API Development", "/services"],
] as const;

const company = [
  ["About Us", "/about"],
  ["Projects", "/projects"],
  ["Careers", "/careers"],
  ["Blog", "/blog"],
  ["Contact Us", "/contact"],
] as const;

const legal = [
  ["Privacy Policy", "/privacy"],
  ["Terms of Service", "/terms"],
] as const;

export default function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden border-t border-border bg-surface">
      <div className="pointer-events-none absolute inset-0 brand-wash opacity-50" aria-hidden />
      <div className="container-px relative">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-12 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-12 md:py-14">
          <div className="col-span-full flex flex-col gap-5 lg:col-span-4">
            <Logo variant="full" />
            <p className="max-w-sm text-base text-muted-foreground leading-relaxed">
              Smart solutions that grow with your business. We engineer AI, web,
              and cloud products for teams that ship.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/vextoratech"
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="hidden lg:col-span-1 lg:block" aria-hidden />

          <div className="col-span-2 flex flex-col gap-4">
            <p className="text-sm font-medium text-foreground">Services</p>
            <ul className="flex flex-col gap-3">
              {services.map(([label, to]) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 flex flex-col gap-4">
            <p className="text-sm font-medium text-foreground">Company</p>
            <ul className="flex flex-col gap-3">
              {company.map(([label, to]) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-2 flex flex-col gap-3 border-t border-border pt-4">
              {legal.map(([label, to]) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 flex flex-col gap-4 sm:col-span-3 lg:col-span-3">
            <p className="text-sm font-medium text-foreground">Contact</p>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  {COMPANY.phone}
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                Lahore, Pakistan
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border py-6 text-center text-sm text-muted-foreground md:text-left md:flex md:justify-between">
          <span>© 2026 VextoraTech. All rights reserved.</span>
          <span className="mt-2 block md:mt-0">Built for teams that ship.</span>
        </div>
      </div>
    </footer>
  );
}
