import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Instagram, ArrowRight } from "lucide-react";
import { Logo } from "./Navbar";

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
    <footer className="bg-[#030810] border-t border-border mt-32">
      <div className="container-px py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              We build intelligent software that scales with your ambition.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Linkedin, href: "https://www.linkedin.com/company/vextoratech", label: "LinkedIn" },
                { Icon: Github, href: "#", label: "GitHub" },
                { Icon: Twitter, href: "#", label: "Twitter" },
                { Icon: Instagram, href: "#", label: "Instagram" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-10 h-10 grid place-items-center rounded-full border border-border text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mono text-xs font-semibold text-primary mb-4">Services</h4>
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
            <h4 className="mono text-xs font-semibold text-primary mb-4">Company</h4>
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
            <h4 className="mono text-xs font-semibold text-primary mb-4">Get In Touch</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> info@vextoratech.com</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +92 3198562747</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Lahore, Pakistan</li>
            </ul>
            <form className="mt-5 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:border-primary outline-none"
              />
              <button className="bg-gradient-brand text-white rounded-lg px-3 grid place-items-center" aria-label="Subscribe">
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-border flex flex-col md:flex-row justify-between gap-3 text-xs text-muted-foreground">
          <span>© 2026 VextoraTech. All rights reserved.</span>
          <span>Privacy Policy · Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
