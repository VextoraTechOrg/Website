/**
 * Generates OG images, hero montage, and placeholder demo videos from product screenshots.
 * Run: npm run generate-media
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { execSync } from "node:child_process";
import ffmpegPath from "ffmpeg-static";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");

const BRAND = {
  bg: "#0d0f12",
  surface: "#161a20",
  primary: "#5B9FD4",
  muted: "#8b949e",
  text: "#e8eaed",
};

const BLOG_POSTS = [
  {
    slug: "rag-pipeline-from-scratch-chromadb-llama",
    title: "Building a RAG Pipeline from Scratch",
    category: "AI & ML",
    color: "#5B9FD4",
  },
  {
    slug: "repository-pattern-in-every-fastapi-project",
    title: "The Repository Pattern in Every FastAPI Project",
    category: "Web Dev",
    color: "#22c55e",
  },
  {
    slug: "rbac-done-right-4-roles-16-permissions",
    title: "RBAC Done Right: 4 Roles, 16 Permissions",
    category: "Engineering",
    color: "#a78bfa",
  },
  {
    slug: "local-ai-vs-api-ollama-vs-openai",
    title: "Local AI vs API: Ollama vs OpenAI",
    category: "AI & ML",
    color: "#5B9FD4",
  },
  {
    slug: "docker-compose-full-stack-production-template",
    title: "Docker Compose Full-Stack Production Template",
    category: "DevOps",
    color: "#38bdf8",
  },
  {
    slug: "designing-for-developers-ui-engineers-use",
    title: "Designing for Developers",
    category: "Design",
    color: "#f472b6",
  },
  {
    slug: "mermaid-js-ai-diagrams-from-natural-language",
    title: "Mermaid.js + AI Diagrams from Natural Language",
    category: "Engineering",
    color: "#a78bfa",
  },
  {
    slug: "jwt-auth-fastapi-battle-tested",
    title: "JWT Auth in FastAPI — Battle Tested",
    category: "Web Dev",
    color: "#22c55e",
  },
];

function escapeXml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrapTitle(title, maxChars = 42) {
  const words = title.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function renderOgPng(outPath, { title, subtitle, accent }) {
  const lines = wrapTitle(title);
  const lineEls = lines
    .map(
      (l, i) =>
        `<text x="80" y="${220 + i * 72}" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="700" fill="${BRAND.text}">${escapeXml(l)}</text>`,
    )
    .join("\n");

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${BRAND.bg}"/>
  <rect x="0" y="0" width="1200" height="6" fill="${accent}"/>
  <rect x="80" y="80" width="120" height="4" fill="${accent}"/>
  <text x="80" y="130" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="600" letter-spacing="3" fill="${accent}">${escapeXml(subtitle)}</text>
  ${lineEls}
  <text x="80" y="560" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="600" fill="${BRAND.muted}">vextoratech.com</text>
</svg>`;

  await sharp(Buffer.from(svg)).png().toFile(outPath);
}

async function buildHeroMontage() {
  const heroDir = path.join(PUBLIC, "hero");
  await ensureDir(heroDir);

  const shots = ["nexawatch.png", "nexadesk-ai.png", "voice_hub.png"].map((f) =>
    path.join(PUBLIC, f),
  );

  const tileW = 540;
  const tileH = 340;
  const tiles = await Promise.all(
    shots.map((src) =>
      sharp(src)
        .resize(tileW, tileH, { fit: "cover", position: "centre" })
        .toBuffer(),
    ),
  );

  const gap = 12;
  const pad = 24;
  const width = tileW * 3 + gap * 2 + pad * 2;
  const height = tileH + pad * 2;

  const composites = tiles.map((buf, i) => ({
    input: buf,
    left: pad + i * (tileW + gap),
    top: pad,
  }));

  const base = await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: BRAND.surface,
    },
  })
    .composite(composites)
    .webp({ quality: 82 })
    .toFile(path.join(heroDir, "product-montage.webp"));

  await sharp(path.join(heroDir, "product-montage.webp"))
    .resize(1600, 1000, { fit: "cover" })
    .webp({ quality: 80 })
    .toFile(path.join(heroDir, "ambient-loop-poster.webp"));

  return base;
}

function hasFfmpeg() {
  return Boolean(ffmpegPath);
}

function ffmpegCmd(args) {
  if (!ffmpegPath) throw new Error("ffmpeg-static not available");
  execSync(`"${ffmpegPath}" ${args}`, { stdio: "inherit" });
}

async function buildVideoLoop(inputImage, outBase, duration = 6) {
  if (!hasFfmpeg()) {
    console.warn(`ffmpeg not found — skipping ${outBase}`);
    return;
  }
  const webm = path.join(PUBLIC, `${outBase}.webm`);
  const mp4 = path.join(PUBLIC, `${outBase}.mp4`);
  const vf = `scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,zoompan=z='min(zoom+0.0004,1.08)':d=${duration * 25}:s=1280x720:fps=25`;

  ffmpegCmd(
    `-y -loop 1 -i "${inputImage}" -vf "${vf}" -t ${duration} -an -c:v libvpx-vp9 -b:v 800k -pix_fmt yuv420p "${webm}"`,
  );
  ffmpegCmd(
    `-y -loop 1 -i "${inputImage}" -vf "${vf}" -t ${duration} -an -c:v libx264 -pix_fmt yuv420p -movflags +faststart "${mp4}"`,
  );
}

async function renderProjectPlaceholder(outPath, { name, tagline }) {
  const titleLines = wrapTitle(name, 28);
  const titleEls = titleLines
    .map(
      (l, i) =>
        `<text x="80" y="${200 + i * 56}" font-family="Arial, Helvetica, sans-serif" font-size="44" font-weight="700" fill="${BRAND.text}">${escapeXml(l)}</text>`,
    )
    .join("\n");

  const tagLines = wrapTitle(tagline, 48);
  const tagEls = tagLines
    .map(
      (l, i) =>
        `<text x="80" y="${320 + i * 36}" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="${BRAND.muted}">${escapeXml(l)}</text>`,
    )
    .join("\n");

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BRAND.bg}"/>
      <stop offset="100%" stop-color="${BRAND.surface}"/>
    </linearGradient>
  </defs>
  <rect width="1280" height="720" fill="url(#bg)"/>
  <rect x="0" y="0" width="1280" height="5" fill="${BRAND.primary}"/>
  <rect x="80" y="80" width="96" height="4" fill="${BRAND.primary}"/>
  <text x="80" y="130" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="600" letter-spacing="4" fill="${BRAND.primary}">VEXTORATECH</text>
  ${titleEls}
  ${tagEls}
  <text x="80" y="660" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="${BRAND.muted}">Case study cover — screenshot pending</text>
</svg>`;

  await sharp(Buffer.from(svg)).webp({ quality: 85 }).toFile(outPath);
}

const PROJECT_PLACEHOLDERS = [
  {
    slug: "qclose-inventory",
    name: "QClose Inventory",
    tagline: "Scanner-driven inventory dashboard",
  },
  {
    slug: "swgnp-iot-portal",
    name: "SWGNP",
    tagline: "Government IoT sensing portal",
  },
  {
    slug: "restaurant-management-system",
    name: "Restaurant RMS",
    tagline: "Full-stack restaurant operations",
  },
  {
    slug: "facial-recognition-attendance",
    name: "Facial Recognition Attendance",
    tagline: "Touchless workforce check-in",
  },
  {
    slug: "medical-knowledge-assistant",
    name: "Medical Knowledge Assistant",
    tagline: "Private RAG for clinical teams",
  },
  {
    slug: "medassist-ai",
    name: "MedAssist AI",
    tagline: "Healthcare workflow automation",
  },
];

async function buildProjectPlaceholders() {
  const dir = path.join(PUBLIC, "projects", "placeholders");
  await ensureDir(dir);

  for (const project of PROJECT_PLACEHOLDERS) {
    const out = path.join(dir, `${project.slug}.webp`);
    await renderProjectPlaceholder(out, project);
    console.log(`✓ projects/placeholders/${project.slug}.webp`);
  }
}

async function main() {
  const ogDir = path.join(PUBLIC, "og");
  const blogOgDir = path.join(ogDir, "blog");
  await ensureDir(blogOgDir);

  await renderOgPng(path.join(ogDir, "default.png"), {
    title: "We Build Software That Thinks",
    subtitle: "VEXTORATECH",
    accent: BRAND.primary,
  });
  console.log("✓ og/default.png");

  for (const post of BLOG_POSTS) {
    const out = path.join(blogOgDir, `${post.slug}.png`);
    await renderOgPng(out, {
      title: post.title,
      subtitle: post.category.toUpperCase(),
      accent: post.color,
    });
    console.log(`✓ og/blog/${post.slug}.png`);
  }

  await buildHeroMontage();
  console.log("✓ hero/product-montage.webp");

  await buildProjectPlaceholders();

  await buildVideoLoop(path.join(PUBLIC, "nexawatch.png"), "hero/ambient-loop", 6);

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
