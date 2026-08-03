import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { Logo } from "./Navbar";
import { COMPANY } from "@/lib/site-copy";

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

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-24">
      <div className="container-px py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              We build intelligent software that scales with your ambition.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.linkedin.com/company/vextoratech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 grid place-items-center rounded border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="label-quiet mb-4">Services</h4>
            <ul className="space-y-3">
              {services.map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label-quiet mb-4">Company</h4>
            <ul className="space-y-3">
              {company.map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label-quiet mb-4">Get In Touch</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> {COMPANY.email}</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> {COMPANY.phone}</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Lahore, Pakistan</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between gap-3 text-xs text-muted-foreground">
          <span>© 2026 VextoraTech. All rights reserved.</span>
          <span className="flex flex-wrap gap-x-3 gap-y-1">
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <span aria-hidden>·</span>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
