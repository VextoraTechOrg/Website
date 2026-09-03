/**
 * Non-project media paths (services, OG, blog). Project images live only in
 * src/content/projects.tsx.
 */

/** Product UI screenshots used by the services page — not project case studies. */
export const PRODUCT_SHOTS = {
  nexaWatch: "/nexawatch.png",
  nexaDesk: "/nexadesk-ai.png",
  voiceHub: "/voice_hub.png",
  pyli: "/PYli.png",
  surveillance: "/surveillance-data-security-technology.png",
  cloud: "/cloud.png",
} as const;

export const SERVICE_IMAGES = {
  aiMl: PRODUCT_SHOTS.surveillance,
  web: PRODUCT_SHOTS.nexaDesk,
  mobile: PRODUCT_SHOTS.nexaWatch,
  cloud: PRODUCT_SHOTS.cloud,
  uiUx: PRODUCT_SHOTS.pyli,
  api: PRODUCT_SHOTS.voiceHub,
} as const;

export const OG_DEFAULT = "/og/default.png";

export function blogCoverPath(slug: string): string {
  return `/og/blog/${slug}.png`;
}
