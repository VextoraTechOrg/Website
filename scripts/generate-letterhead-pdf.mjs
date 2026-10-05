/**
 * Generate a blank A4 VextoraTech company letterhead PDF.
 * Uses the same lockup as the site navbar: public/vextoratech_logo_white.png
 *
 * Run: node scripts/generate-letterhead-pdf.mjs
 * Out:  docs/VextoraTech-Letterhead.pdf
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  PDFDocument,
  rgb,
  StandardFonts,
} from "pdf-lib";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const LOGO_PATH = join(ROOT, "public", "vextoratech_logo_white.png");
const OUT_PATH = join(ROOT, "docs", "VextoraTech-Letterhead.pdf");

// Brand palette (light letterhead — matches current site / logo)
const NAVY = rgb(0x1b / 255, 0x3b / 255, 0x5a / 255);
const CYAN = rgb(0x4e / 255, 0x9a / 255, 0xbf / 255);
const MUTED = rgb(0x5a / 255, 0x6b / 255, 0x7a / 255);

const A4_W = 595.28;
const A4_H = 841.89;
const MARGIN_X = 54; // ~0.75"
const MARGIN_TOP = 40;
const MARGIN_BOTTOM = 42;

const COMPANY = {
  name: "VextoraTech",
  tagline: "Smart solutions that grow with your business.",
  email: "info@vextoratech.com",
  phone: "+92 371 2331344",
  location: "Lahore, Pakistan",
  web: "www.vextoratech.com",
};

async function main() {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([A4_W, A4_H]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const logoBytes = readFileSync(LOGO_PATH);
  const logo = await pdf.embedPng(logoBytes);
  const logoMaxW = 168;
  const logoMaxH = 78;
  const logoScale = Math.min(logoMaxW / logo.width, logoMaxH / logo.height);
  const logoW = logo.width * logoScale;
  const logoH = logo.height * logoScale;

  // Header logo (left-aligned, same asset as navbar)
  const logoX = MARGIN_X;
  const logoY = A4_H - MARGIN_TOP - logoH;
  page.drawImage(logo, {
    x: logoX,
    y: logoY,
    width: logoW,
    height: logoH,
  });

  // Accent rule under header
  const ruleY = logoY - 16;
  page.drawRectangle({
    x: MARGIN_X,
    y: ruleY,
    width: A4_W - MARGIN_X * 2,
    height: 1.5,
    color: CYAN,
  });

  // Thin secondary navy hairline
  page.drawRectangle({
    x: MARGIN_X,
    y: ruleY - 3,
    width: 72,
    height: 0.75,
    color: NAVY,
  });

  // Footer rule + contact strip
  const footerTop = MARGIN_BOTTOM + 28;
  page.drawRectangle({
    x: MARGIN_X,
    y: footerTop,
    width: A4_W - MARGIN_X * 2,
    height: 1,
    color: CYAN,
  });

  const footerText = [
    COMPANY.email,
    COMPANY.phone,
    COMPANY.location,
    COMPANY.web,
  ].join("  ·  ");

  const footerSize = 8.5;
  const footerWidth = font.widthOfTextAtSize(footerText, footerSize);
  page.drawText(footerText, {
    x: (A4_W - footerWidth) / 2,
    y: footerTop - 16,
    size: footerSize,
    font,
    color: MUTED,
  });

  // Small brand mark in footer corner
  page.drawText(COMPANY.name, {
    x: MARGIN_X,
    y: MARGIN_BOTTOM - 4,
    size: 8,
    font: fontBold,
    color: NAVY,
  });
  page.drawText(COMPANY.tagline, {
    x: MARGIN_X + fontBold.widthOfTextAtSize(COMPANY.name, 8) + 8,
    y: MARGIN_BOTTOM - 4,
    size: 7.5,
    font,
    color: MUTED,
  });

  // Empty body region is intentional — letterhead only.
  // Optional faint guide note (commented out for a clean blank page):
  // page.drawText(" ", { x: MARGIN_X, y: ruleY - 48, size: 10, font, color: MUTED });

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, await pdf.save());
  console.log(`Wrote ${OUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
