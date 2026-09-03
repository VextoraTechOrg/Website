/** Site-wide CTA labels — keep consistent across all pages. */
export const PRIMARY_CTA = "Start a Conversation";
export const SECONDARY_CTA = "See Our Work";

/** Honest framing for projects / case studies (used on home, projects index, and detail pages). */
export const PROJECTS_HEADLINE = "Work our team has shipped";
export const PROJECTS_SUBHEAD =
  "Some of this was delivered by our people before VextoraTech was incorporated; some we are building now. Same engineers, same standards — under one name from 2026 onward.";

/** Home hero carousel interval (left taglines + right project stay in sync). */
export const HERO_CYCLE_MS = 3000;

/** Rotating headline + subline — `slug` must match a `HERO_CAROUSEL_SLUGS` entry. */
export const HERO_ROTATION = [
  {
    slug: "nexawatch",
    headline: "builds software that thinks.",
    subline:
      "Real-time field visibility for teams, routes, and client visits — live GPS, geofences, and route history.",
  },
  {
    slug: "nexadesk-ai",
    headline: "powers AI-first support desks.",
    subline:
      "Smarter ticket analysis, context-aware replies, and knowledge suggestions in one secure dashboard.",
  },
  {
    slug: "voice-intelligence-hub",
    headline: "turns voice into intelligence.",
    subline:
      "Transcription, diarization, and NLP analytics — sentiment, topics, and action items from every call.",
  },
  {
    slug: "pyli-business-profiles",
    headline: "unifies business profiles.",
    subline:
      "One bespoke platform to manage every client profile — tailored UI built to exact workflow requirements.",
  },
  {
    slug: "ai-surveillance-system",
    headline: "sees what cameras miss.",
    subline:
      "Real-time object and anomaly detection across feeds — instant alerts for zone breaches and loitering.",
  },
] as const;

/** Company contact details used in footer and contact page. */
export const COMPANY = {
  phone: "+92 371 2331344",
  email: "info@vextoratech.com",
} as const;
