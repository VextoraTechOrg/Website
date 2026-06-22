import { createFileRoute, Link } from "@tanstack/react-router";
import SiteLayout, { PageHero } from "@/components/site/SiteLayout";
import { ArrowRight, Mail, Phone, MapPin, Clock, MessageCircle, Check, Linkedin, Github, Twitter } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — VextoraTech" },
      { name: "description", content: "Tell us about your project. We respond within 24 hours with an honest assessment and a path forward." },
      { property: "og:title", content: "Contact — VextoraTech" },
      { property: "og:description", content: "Let's talk about what you're building." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="GET IN TOUCH"
        title={<>Let's Talk About <span className="text-gradient">Your Project</span></>}
        subtitle="Tell us what you're building. We'll respond within 24 hours with an honest assessment and a path forward."
      />

      <section className="pb-20">
        <div className="container-px grid lg:grid-cols-[1.2fr_1fr] gap-8">
          <div className="bg-surface border border-border rounded-3xl p-8 md:p-10">
            {sent ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-brand grid place-items-center mb-6">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-extrabold text-gradient mb-3">Message Sent!</h2>
                <p className="text-muted-foreground mb-6">We'll be in touch within 24 hours. Check your inbox for a confirmation.</p>
                <Link to="/" className="inline-flex items-center gap-2 text-primary font-semibold">Back to Home <ArrowRight className="w-4 h-4" /></Link>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5">
                <div>
                  <h2 className="text-2xl font-bold">Start a Conversation</h2>
                  <p className="text-sm text-muted-foreground">No commitment. Just an honest conversation.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Full Name*"><input required className="input" /></Field>
                  <Field label="Company Name"><input className="input" /></Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Email Address*"><input type="email" required className="input" /></Field>
                  <Field label="Phone Number"><input type="tel" className="input" /></Field>
                </div>
                <Field label="Service Interested In*">
                  <select required className="input" defaultValue="">
                    <option value="" disabled>Select a service...</option>
                    <option>AI & Machine Learning</option>
                    <option>Web Development</option>
                    <option>Mobile App</option>
                    <option>Cloud & DevOps</option>
                    <option>UI/UX Design</option>
                    <option>API Development</option>
                    <option>Not Sure Yet</option>
                  </select>
                </Field>
                <Field label="Project Budget">
                  <select className="input" defaultValue="">
                    <option value="" disabled>Select a range...</option>
                    <option>Under $5,000</option>
                    <option>$5k–$15k</option>
                    <option>$15k–$50k</option>
                    <option>$50k+</option>
                    <option>Let's Discuss</option>
                  </select>
                </Field>
                <Field label="Tell us about your project*">
                  <textarea required rows={6} className="input" placeholder="Describe what you're building, what problem it solves, and any technical requirements or constraints..." />
                </Field>
                <Field label="How did you hear about us?"><input className="input" /></Field>
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <input type="checkbox" required className="accent-primary" />
                  I agree to the Privacy Policy
                </label>
                <button className="w-full bg-gradient-brand text-white font-semibold rounded-xl py-4 inline-flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(79,142,247,0.4)] hover:scale-[1.01] transition-transform">
                  Send Message <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-xs text-muted-foreground text-center">We respond within 24 hours on business days.</p>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-surface-2 border border-border rounded-2xl p-7 space-y-4">
              <h3 className="font-bold text-lg mb-2">Contact Details</h3>
              <Info icon={Mail} label="Email" value="info@vextoratech.com" />
              <Info icon={Phone} label="Phone" value="+92 3198562747" />
              <Info icon={MapPin} label="Location" value="Lahore, Pakistan" />
              <Info icon={Clock} label="Hours" value="Mon–Fri, 10am–8pm PKT" />
            </div>

            <div className="bg-surface border border-border rounded-2xl p-7">
              <div className="flex items-start gap-3 mb-4">
                <Clock className="w-6 h-6 text-primary shrink-0 mt-1" />
                <p className="text-sm text-muted-foreground">We respond to every inquiry within 24 hours. For urgent projects, use WhatsApp.</p>
              </div>
              <a
                href="https://wa.me/923198562747?text=Hi%20there,%20I%20would%20like%20to%20know%20more%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold rounded-lg py-3"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-7">
              <h3 className="font-bold text-lg mb-4">Why Work With Us?</h3>
              <ul className="space-y-3 text-sm">
                {[
                  "Fixed-price or time-and-materials — your choice",
                  "Weekly progress updates and live demo environment",
                  "Full source code ownership from day one",
                  "30-day post-launch support included",
                ].map((b) => (
                  <li key={b} className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span>{b}</span></li>
                ))}
              </ul>
              <div className="flex gap-3 mt-5 pt-5 border-t border-border">
                {[Linkedin, Github, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 grid place-items-center rounded-full border border-border text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-colors">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .input {
          width: 100%;
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          color: var(--foreground);
          font: inherit;
          outline: none;
          transition: border-color .2s;
        }
        .input:focus { border-color: var(--primary); }
      `}</style>
    </SiteLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1.5">{label}</span>
      {children}
    </label>
  );
}

function Info({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-lg bg-primary/10 grid place-items-center shrink-0">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="font-medium text-sm">{value}</div>
      </div>
    </div>
  );
}