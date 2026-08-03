/**
 * Single source of truth for the VextoraTech project case studies.
 * Each project carries SEO metadata + a structured, detailed case study
 * (overview, challenge, solution, features, results, tech stack).
 * The projects index, the /projects/$slug route, and the sitemap read from here.
 */

export const SITE_URL = "https://vextoratech.com";

export const PROJECT_CATEGORIES = [
  "All",
  "AI / ML",
  "Web Apps",
  "Mobile",
  "Cloud",
  "Design",
] as const;
export type ProjectCat = (typeof PROJECT_CATEGORIES)[number];

/** How this work relates to VextoraTech — drives honest labeling site-wide. */
export type ProjectWorkOrigin = "prior-team" | "prototype" | "internal" | "vextoratech";

export function workOriginLabel(origin: ProjectWorkOrigin): string {
  switch (origin) {
    case "prior-team":
      return "Prior team work";
    case "prototype":
      return "Prototype";
    case "internal":
      return "Internal build";
    case "vextoratech":
      return "VextoraTech delivery";
  }
}

export interface ProjectFeature {
  title: string;
  detail: string;
}

export interface ProjectResult {
  /** Headline number or short phrase, e.g. "90%" or "Real-time". */
  metric: string;
  /** What the metric describes. */
  label: string;
}

export interface ProjectCase {
  slug: string;
  name: string;
  /** Categories used for filtering on the index. */
  cats: ProjectCat[];
  /** Primary category label shown in the UI. */
  category: string;
  /** Technology chips shown on the card. */
  tags: string[];
  /** Short description used on the index card. */
  desc: string;
  /** <=160 chars, written for the SERP snippet. */
  summary: string;
  keywords: string[];
  industry: string;
  timeline: string;
  /** Honest origin label — avoids implying a VextoraTech client engagement when untrue. */
  workOrigin: ProjectWorkOrigin;
  /** Services VextoraTech provided. */
  services: string[];
  color: string;
  /** Optional cover image path under /public, e.g. "/photo.jpg". */
  image?: string;
  /** One-paragraph framing of the project. */
  overview: string;
  /** The problems / constraints the client faced. */
  challenges: string[];
  /** How VextoraTech approached and solved it. */
  solutions: string[];
  /** Headline capabilities that were shipped. */
  features: ProjectFeature[];
  /** Outcome metrics for the results band. */
  results: ProjectResult[];
  /** Grouped, detailed technology breakdown. */
  stack: { group: string; items: string[] }[];
}

export const PROJECTS: ProjectCase[] = [
  // ── Web Apps ───────────────────────────────────────────────────────────────
  {
    slug: "qclose-inventory",
    name: "QClose Inventory",
    cats: ["Web Apps"],
    category: "Web Application",
    tags: ["Next.js 13", "TypeScript", "Node.js", "Tailwind"],
    desc: "Inventory management dashboard with hardware scanner integration for product addition and retrieval, plus reporting modules for opening and closing stock levels.",
    summary:
      "QClose is a barcode-scanner-driven inventory management dashboard built with Next.js 13 — real-time stock tracking, opening/closing reports, and zero manual counting.",
    keywords: [
      "inventory management system",
      "barcode scanner integration",
      "Next.js dashboard",
      "stock tracking software",
      "warehouse management",
      "opening closing stock report",
    ],
    industry: "Retail & Warehousing",
    timeline: "4 months",
    workOrigin: "prior-team",
    services: ["Web Application", "Frontend Engineering", "API Development"],
    color: "#06B6D4",
    image: "/website-development-links-seo-webinar-cyberspace-concept.jpg",
    overview:
      "QClose Inventory is a web-based stock control platform that replaces spreadsheets and manual counts with a fast, scanner-driven workflow. Staff add and retrieve products by scanning physical barcodes, while managers get accurate opening- and closing-stock reports at the end of every shift.",
    challenges: [
      "Manual stock counts were slow, error-prone, and impossible to reconcile at the end of each day.",
      "Hardware barcode scanners had to integrate seamlessly with a browser-based UI without custom drivers.",
      "Managers needed reliable opening- and closing-stock snapshots to detect shrinkage and discrepancies.",
      "The interface had to be usable by non-technical floor staff on shared terminals during busy hours.",
    ],
    solutions: [
      "Built a Next.js 13 dashboard that listens for keyboard-wedge scanner input, so any USB/Bluetooth scanner works with no drivers.",
      "Designed a product add/retrieve flow that updates stock counts instantly and validates every scan against the catalog.",
      "Created reporting modules that snapshot stock levels at shift open and close, then surface variances automatically.",
      "Kept the UI deliberately dense and keyboard-first so staff move through high-volume scanning without touching a mouse.",
    ],
    features: [
      { title: "Scanner-Driven Entry", detail: "Add or retrieve any product by scanning its barcode — the form auto-fills and commits in a single keystroke." },
      { title: "Opening & Closing Reports", detail: "Automatic stock snapshots at shift boundaries with variance highlighting for fast reconciliation." },
      { title: "Live Stock Dashboard", detail: "Real-time counts across all SKUs with low-stock indicators and search." },
      { title: "Audit-Ready History", detail: "Every stock movement is logged with timestamp and operator for full traceability." },
    ],
    results: [
      { metric: "90%", label: "Less manual counting effort" },
      { metric: "Real-time", label: "Stock accuracy across SKUs" },
      { metric: "Zero", label: "Scanner driver installs needed" },
    ],
    stack: [
      { group: "Frontend", items: ["Next.js 13", "TypeScript", "Tailwind CSS"] },
      { group: "Backend", items: ["Node.js", "REST APIs"] },
      { group: "Hardware", items: ["Keyboard-wedge barcode scanners"] },
    ],
  },
  {
    slug: "swgnp-iot-portal",
    name: "SWGNP",
    cats: ["Web Apps"],
    category: "Web Application",
    tags: ["Angular", "TypeScript", "Chart.js", "PrimeNG"],
    desc: "IoT-based web portal for remote sensing devices used by government stakeholders, with advanced search and dynamic data visualization features.",
    summary:
      "SWGNP is an IoT monitoring portal for government stakeholders — Angular dashboards that visualize remote sensing device data with advanced search and live charts.",
    keywords: [
      "IoT web portal",
      "remote sensing dashboard",
      "Angular data visualization",
      "government monitoring system",
      "sensor data analytics",
      "Chart.js dashboard",
    ],
    industry: "Government / Public Sector",
    timeline: "6 months",
    workOrigin: "prior-team",
    services: ["Web Application", "Data Visualization", "Frontend Engineering"],
    color: "#5B9FD4",
    image: "/thanit2022february_53.jpg",
    overview:
      "SWGNP is a monitoring portal that brings data from a fleet of remote sensing IoT devices into a single, government-grade web interface. Stakeholders search, filter, and visualize device readings through dynamic dashboards that turn raw telemetry into decisions.",
    challenges: [
      "Telemetry from many distributed sensing devices arrived in high volume and needed to be made legible for non-technical officials.",
      "Stakeholders required advanced, multi-criteria search across devices, regions, and time ranges.",
      "Charts had to update dynamically as filters changed without overwhelming the browser.",
      "The system had to meet the reliability and clarity expectations of public-sector users.",
    ],
    solutions: [
      "Built an Angular portal with PrimeNG components for a consistent, accessible, enterprise-grade UI.",
      "Implemented an advanced search layer letting users slice data by device, location, and time window.",
      "Used Chart.js to render dynamic, filter-reactive visualizations of sensor trends.",
      "Structured the data flow so dashboards stay responsive even with large telemetry datasets.",
    ],
    features: [
      { title: "Dynamic Visualizations", detail: "Interactive Chart.js graphs that re-render instantly as filters and date ranges change." },
      { title: "Advanced Search", detail: "Multi-criteria querying across devices, regions, and time for precise data retrieval." },
      { title: "Device Fleet Overview", detail: "Centralized status view of all remote sensing devices in one portal." },
      { title: "Stakeholder-Friendly UI", detail: "Clean PrimeNG interface designed for government users, not engineers." },
    ],
    results: [
      { metric: "Single", label: "Pane of glass for all devices" },
      { metric: "Dynamic", label: "Charts react to every filter" },
      { metric: "Gov-grade", label: "Accessible, consistent UI" },
    ],
    stack: [
      { group: "Frontend", items: ["Angular", "TypeScript", "PrimeNG"] },
      { group: "Visualization", items: ["Chart.js"] },
      { group: "Data", items: ["IoT telemetry feeds", "REST APIs"] },
    ],
  },
  {
    slug: "pyli-business-profiles",
    name: "PYLI",
    cats: ["Web Apps"],
    category: "Web Application",
    tags: ["React.js 18", "TypeScript", "MUI", "Emotion"],
    desc: "Centralized platform for managing multiple business profiles with a customized UI tailored to client requirements.",
    summary:
      "PYLI is a centralized React platform for managing multiple business profiles from one place — a bespoke MUI interface tailored to exact client requirements.",
    keywords: [
      "business profile management",
      "React 18 platform",
      "multi-tenant dashboard",
      "Material UI application",
      "centralized management platform",
      "custom UI development",
    ],
    industry: "Business Services / SaaS",
    timeline: "5 months",
    workOrigin: "prior-team",
    services: ["Web Application", "Custom UI/UX", "Frontend Engineering"],
    color: "#5B9FD4",
    image: "/PYli.png",
    overview:
      "PYLI centralizes the management of multiple business profiles into one cohesive platform. Rather than juggling separate tools, users administer every profile from a single, bespoke interface built precisely to the client's workflows.",
    challenges: [
      "Managing several distinct business profiles meant switching between fragmented tools and duplicated effort.",
      "The client had very specific UI expectations that off-the-shelf component defaults couldn't satisfy.",
      "The platform needed to scale cleanly as more profiles and features were added.",
      "Consistency across many profile types had to be maintained without code duplication.",
    ],
    solutions: [
      "Built a React 18 + TypeScript application with a centralized model for switching between and editing profiles.",
      "Used MUI with Emotion to deeply customize the design language to the client's exact branding and UX requirements.",
      "Componentized shared patterns so new profile types and screens reuse a consistent foundation.",
      "Focused on a maintainable architecture that grows with the client's roadmap.",
    ],
    features: [
      { title: "Unified Profile Hub", detail: "Manage every business profile from one dashboard with fast switching." },
      { title: "Bespoke Interface", detail: "MUI + Emotion theming tailored pixel-by-pixel to client requirements." },
      { title: "Reusable Components", detail: "Shared UI primitives keep every profile screen consistent." },
      { title: "Scalable Architecture", detail: "Structured to absorb new profile types and features without rework." },
    ],
    results: [
      { metric: "1 platform", label: "Replaces fragmented tools" },
      { metric: "100%", label: "Custom-tailored interface" },
      { metric: "Scalable", label: "Built to grow with the client" },
    ],
    stack: [
      { group: "Frontend", items: ["React.js 18", "TypeScript"] },
      { group: "Styling", items: ["Material UI (MUI)", "Emotion"] },
    ],
  },
  {
    slug: "restaurant-management-system",
    name: "Restaurant Management System",
    cats: ["Web Apps"],
    category: "Web Application",
    tags: ["Angular", "TypeScript", "PrimeNG", "PrimeFlex"],
    desc: "Full-featured RMS with menu customization, orders, bookings, and billing — led frontend development of a new product version.",
    summary:
      "A full-featured Restaurant Management System built in Angular — menu customization, orders, table bookings, and billing in one platform. We led the new version's frontend.",
    keywords: [
      "restaurant management system",
      "RMS software",
      "Angular restaurant app",
      "online ordering system",
      "table booking software",
      "restaurant billing system",
    ],
    industry: "Hospitality / Food & Beverage",
    timeline: "7 months",
    workOrigin: "prior-team",
    services: ["Web Application", "Frontend Leadership", "UI Engineering"],
    color: "#10B981",
    image: "/UI_UX.png",
    overview:
      "This Restaurant Management System unifies the operational core of a venue — menu, orders, bookings, and billing — into one platform. VextoraTech led the frontend development of a brand-new product version, modernizing the experience for staff and operators.",
    challenges: [
      "Restaurants needed menu, orders, reservations, and billing in one system instead of disconnected tools.",
      "A new product version had to modernize the UI while preserving the depth of restaurant operations.",
      "Menus required deep customization — variants, modifiers, and pricing rules.",
      "The interface had to stay fast and clear during peak service hours.",
    ],
    solutions: [
      "Led frontend development of the new version using Angular, PrimeNG, and PrimeFlex for a consistent, responsive layout.",
      "Built a flexible menu customization module supporting variants, modifiers, and pricing.",
      "Implemented end-to-end flows for order taking, table bookings, and billing.",
      "Prioritized a responsive, low-friction UI that holds up under busy service.",
    ],
    features: [
      { title: "Menu Customization", detail: "Configure items, variants, modifiers, and pricing rules with ease." },
      { title: "Order Management", detail: "Take and track orders from entry through to the kitchen and bill." },
      { title: "Table Bookings", detail: "Manage reservations and seating from the same platform." },
      { title: "Integrated Billing", detail: "Generate accurate bills tied directly to orders and bookings." },
    ],
    results: [
      { metric: "4-in-1", label: "Menu, orders, bookings, billing" },
      { metric: "New version", label: "Frontend led end-to-end" },
      { metric: "Responsive", label: "Built for peak-hour speed" },
    ],
    stack: [
      { group: "Frontend", items: ["Angular", "TypeScript"] },
      { group: "UI", items: ["PrimeNG", "PrimeFlex"] },
    ],
  },
  {
    slug: "nexawatch",
    name: "NexaWatch",
    cats: ["Web Apps"],
    category: "Web Application",
    tags: ["React", "Node.js", "WebSocket", "GPS Tracking"],
    desc: "Real-time field visibility platform for teams, routes, and client visits — live GPS tracking, geofences, route history, and secure admin access in one dashboard.",
    summary:
      "NexaWatch delivers real-time field visibility for teams, routes, and client visits — live GPS tracking, geofences & alerts, route history, and secure admin access.",
    keywords: [
      "GPS fleet tracking",
      "field team visibility",
      "geofence alerts",
      "route history software",
      "client visit tracking",
      "real-time location dashboard",
      "fleet management platform",
    ],
    industry: "Logistics / Field Operations",
    timeline: "5 months",
    workOrigin: "prototype",
    services: ["Web Application", "Real-Time Systems", "Dashboard Engineering"],
    color: "#4A8FC4",
    image: "/nexawatch.png",
    overview:
      "NexaWatch is a real-time field visibility platform built for teams on the move. Managers track live GPS positions, monitor geofence events, review route history, and oversee client visits from a single secure admin dashboard — turning scattered field activity into actionable visibility.",
    challenges: [
      "Field teams operated across routes and client sites with no unified view of where people were or what they had completed.",
      "Managers needed instant alerts when devices entered or exited key locations — not end-of-day reports.",
      "Route and visit history had to be searchable and auditable for operations and client accountability.",
      "The admin experience needed to stay fast and secure as device counts and geofences scaled.",
    ],
    solutions: [
      "Built a live tracking dashboard with a map-first UI showing device positions, geofences, and activity in real time.",
      "Implemented geofence monitoring with instant alerts for zone entries, exits, and completed client visits.",
      "Delivered route history and trip analytics so teams can review distance, stops, and daily activity patterns.",
      "Designed role-based admin access with modules for devices, routes, events, drivers, alerts, and reports.",
    ],
    features: [
      { title: "Live GPS Tracking", detail: "Monitor field teams and devices on a live map with real-time position updates." },
      { title: "Geofences & Alerts", detail: "Define zones and get instant notifications when devices enter, exit, or complete visits." },
      { title: "Route History", detail: "Review past trips, distances, and stop patterns with searchable route logs." },
      { title: "Secure Admin Access", detail: "Centralized dashboard for devices, routes, events, drivers, alerts, and reports." },
    ],
    results: [
      { metric: "Real-time", label: "Live field visibility" },
      { metric: "Instant", label: "Geofence & visit alerts" },
      { metric: "Unified", label: "Routes, teams & visits in one place" },
    ],
    stack: [
      { group: "Frontend", items: ["React", "TypeScript"] },
      { group: "Backend", items: ["Node.js", "REST APIs"] },
      { group: "Realtime", items: ["WebSocket", "GPS / Maps integration"] },
    ],
  },
  {
    slug: "nexadesk-ai",
    name: "NexaDesk AI",
    cats: ["AI / ML", "Web Apps"],
    category: "AI / Helpdesk",
    tags: ["OpenAI", "RAG", "Next.js", "Node.js"],
    desc: "Secure AI helpdesk for modern support teams — smarter ticket analysis, context-aware replies, priority detection, and knowledge suggestions in one dashboard.",
    summary:
      "NexaDesk AI is a secure AI helpdesk — smarter support and faster resolutions with AI ticket analysis, smart replies, priority detection, and knowledge suggestions.",
    keywords: [
      "AI helpdesk",
      "support ticket automation",
      "smart reply suggestions",
      "ticket priority detection",
      "knowledge base AI",
      "SLA compliance dashboard",
      "customer support platform",
    ],
    industry: "Customer Support / SaaS",
    timeline: "4 months",
    workOrigin: "prototype",
    services: ["AI / LLM Integration", "Web Application", "Dashboard Engineering"],
    color: "#0EA5E9",
    image: "/nexadesk-ai.png",
    overview:
      "NexaDesk AI is a secure AI-powered helpdesk built for modern support teams. It analyzes incoming tickets for intent, sentiment, and urgency, suggests context-aware replies, auto-detects priority, and surfaces knowledge-base articles — all from a dashboard that tracks open tickets, SLA compliance, and resolution trends.",
    challenges: [
      "Support teams drowned in tickets with no fast way to assess intent, sentiment, or urgency.",
      "Agents spent too long drafting repetitive replies instead of resolving complex issues.",
      "Priority was assigned manually, causing urgent tickets to sit in queues.",
      "Knowledge-base articles existed but agents couldn't find the right ones under time pressure.",
    ],
    solutions: [
      "Built AI ticket analysis that reads intent, sentiment, and urgency to route and triage faster.",
      "Delivered smart reply suggestions that are context-aware and save agent drafting time.",
      "Implemented automatic priority detection so high-urgency tickets surface immediately.",
      "Integrated knowledge suggestions that recommend the best articles for each issue.",
    ],
    features: [
      { title: "AI Ticket Analysis", detail: "Understands ticket intent, sentiment, and urgency to route and triage faster." },
      { title: "Smart Replies", detail: "Suggests context-aware responses that save time and improve customer satisfaction." },
      { title: "Priority Detection", detail: "Automatically categorizes tickets by urgency so critical issues aren't missed." },
      { title: "Knowledge Suggestions", detail: "Recommends the best knowledge-base articles to resolve issues faster." },
    ],
    results: [
      { metric: "92%", label: "SLA compliance tracked live" },
      { metric: "Faster", label: "Ticket triage & routing" },
      { metric: "Secure", label: "Built for modern support teams" },
    ],
    stack: [
      { group: "AI / LLM", items: ["OpenAI", "RAG", "Sentiment analysis"] },
      { group: "Frontend", items: ["Next.js", "TypeScript"] },
      { group: "Backend", items: ["Node.js", "REST APIs"] },
    ],
  },

  // ── AI / ML ──────────────────────────────────────────────────────────────
  {
    slug: "facial-recognition-attendance",
    name: "Facial Recognition Attendance System",
    cats: ["AI / ML"],
    category: "AI / Computer Vision",
    tags: ["Python", "OpenCV", "DeepFace", "FastAPI"],
    desc: "Automated employee attendance system using real-time facial recognition. Detects and identifies faces from live camera feeds, logs check-ins and check-outs, and generates attendance reports — eliminating manual tracking.",
    summary:
      "An automated facial-recognition attendance system using OpenCV and DeepFace — detects faces from live camera feeds, logs check-ins/outs, and ends manual tracking.",
    keywords: [
      "facial recognition attendance",
      "face recognition system",
      "OpenCV attendance",
      "DeepFace",
      "automated attendance software",
      "computer vision attendance",
      "biometric attendance",
    ],
    industry: "HR / Workforce Management",
    timeline: "3 months",
    workOrigin: "prior-team",
    services: ["AI / Computer Vision", "Backend Engineering", "ML Integration"],
    color: "#4A8FC4",
    image: "/2462340.jpg",
    overview:
      "This system automates employee attendance using real-time facial recognition. It detects and identifies faces from live camera feeds, logs check-ins and check-outs automatically, and generates attendance reports — removing the friction and inaccuracy of manual tracking, cards, or fingerprint scanners.",
    challenges: [
      "Manual and card-based attendance was slow, easy to game (buddy punching), and hard to audit.",
      "Faces had to be recognized reliably from live feeds under varying lighting and angles.",
      "The system needed to log check-ins and check-outs in real time without bottlenecks.",
      "Attendance data had to roll up into reports managers could actually use.",
    ],
    solutions: [
      "Built a Python pipeline using OpenCV for face detection and DeepFace for identity recognition.",
      "Processed live camera frames in real time, matching detected faces against the employee database.",
      "Automatically logged check-in and check-out events with timestamps as employees appear on camera.",
      "Exposed the system through a FastAPI service and generated structured attendance reports.",
    ],
    features: [
      { title: "Real-Time Recognition", detail: "Detects and identifies employees directly from live camera feeds." },
      { title: "Automatic Logging", detail: "Check-ins and check-outs recorded the moment a face is recognized." },
      { title: "Attendance Reports", detail: "Aggregated, exportable reports for HR and management." },
      { title: "No Touch, No Cards", detail: "Eliminates fingerprint scanners and badges — and buddy punching." },
    ],
    results: [
      { metric: "Real-time", label: "Face-based check-in/out" },
      { metric: "Contactless", label: "No cards or fingerprints" },
      { metric: "Auto", label: "Reports without manual entry" },
    ],
    stack: [
      { group: "Computer Vision", items: ["OpenCV", "DeepFace"] },
      { group: "Backend", items: ["Python", "FastAPI"] },
    ],
  },
  {
    slug: "ai-surveillance-system",
    name: "AI Surveillance System",
    cats: ["AI / ML"],
    category: "AI / Computer Vision",
    tags: ["Python", "YOLOv8", "OpenCV", "WebSocket"],
    desc: "Intelligent video surveillance platform with real-time object and anomaly detection across multiple camera feeds. Triggers instant alerts for restricted zone breaches, loitering, and suspicious activity.",
    summary:
      "An intelligent surveillance platform using YOLOv8 — real-time object and anomaly detection across multiple feeds with instant alerts for zone breaches and loitering.",
    keywords: [
      "AI surveillance system",
      "YOLOv8 object detection",
      "video analytics",
      "anomaly detection",
      "intrusion detection",
      "real-time alerts",
      "smart CCTV",
    ],
    industry: "Security & Safety",
    timeline: "5 months",
    workOrigin: "prior-team",
    services: ["AI / Computer Vision", "Real-Time Systems", "Backend Engineering"],
    color: "#EF4444",
    image: "/surveillance-data-security-technology.jpg",
    overview:
      "This intelligent video surveillance platform watches multiple camera feeds simultaneously and understands what it sees. Using real-time object and anomaly detection, it triggers instant alerts for restricted-zone breaches, loitering, and suspicious activity — turning passive cameras into an active security layer.",
    challenges: [
      "Traditional CCTV is passive — incidents are reviewed after the fact, not prevented.",
      "Monitoring many feeds manually is impossible to do reliably around the clock.",
      "Detection had to run in real time across multiple simultaneous camera streams.",
      "Alerts needed to reach operators instantly to be actionable.",
    ],
    solutions: [
      "Built a detection pipeline on YOLOv8 and OpenCV to identify objects and behaviors across feeds.",
      "Implemented rules for restricted-zone breaches, loitering, and suspicious-activity detection.",
      "Streamed live detections and alerts to operators over WebSocket for instant delivery.",
      "Designed the system to scale across multiple concurrent camera streams.",
    ],
    features: [
      { title: "Multi-Feed Detection", detail: "Analyzes several camera streams at once in real time." },
      { title: "Anomaly Alerts", detail: "Instant notifications for zone breaches, loitering, and suspicious activity." },
      { title: "Live WebSocket Stream", detail: "Detections and alerts pushed to operators with minimal latency." },
      { title: "Rule-Based Zones", detail: "Define restricted areas and behaviors that trigger alerts." },
    ],
    results: [
      { metric: "Multi-cam", label: "Concurrent feed analysis" },
      { metric: "Instant", label: "Real-time threat alerts" },
      { metric: "Proactive", label: "Prevents, not just records" },
    ],
    stack: [
      { group: "Computer Vision", items: ["YOLOv8", "OpenCV"] },
      { group: "Backend", items: ["Python"] },
      { group: "Realtime", items: ["WebSocket"] },
    ],
  },
  {
    slug: "medical-knowledge-assistant",
    name: "Medical Knowledge Assistant",
    cats: ["AI / ML"],
    category: "AI / RAG",
    tags: ["RAG", "LLaMA 3", "FAISS", "FastAPI"],
    desc: "AI assistant trained on medical literature and clinical guidelines, enabling healthcare professionals to retrieve drug information, diagnostic criteria, and treatment protocols through conversational queries.",
    summary:
      "A private RAG assistant over medical literature and clinical guidelines — healthcare pros retrieve drug info, diagnostic criteria, and protocols by conversation.",
    keywords: [
      "medical AI assistant",
      "clinical decision support",
      "RAG healthcare",
      "LLaMA 3",
      "FAISS vector search",
      "drug information retrieval",
      "medical knowledge base",
    ],
    industry: "Healthcare",
    timeline: "6 months",
    workOrigin: "internal",
    services: ["AI / RAG", "LLM Engineering", "Private Deployment"],
    color: "#10B981",
    image: "/services-ai-machine-learning.jpg",
    overview:
      "This assistant turns a corpus of medical literature and clinical guidelines into a conversational knowledge base. Healthcare professionals retrieve drug information, diagnostic criteria, and treatment protocols by simply asking — with a local-first stack that keeps sensitive data in-house.",
    challenges: [
      "Clinicians needed fast answers from vast, dense medical literature during time-critical work.",
      "Patient and clinical data privacy meant sensitive content couldn't leave controlled infrastructure.",
      "Answers had to be grounded in trusted guidelines, not a model's general training.",
      "Retrieval needed to be fast and accurate across a large document corpus.",
    ],
    solutions: [
      "Built a RAG system using LLaMA 3 so inference can run privately, on-premises if required.",
      "Indexed the medical corpus with FAISS for fast, high-quality similarity search.",
      "Grounded every conversational answer in retrieved guideline passages.",
      "Served the assistant through a FastAPI backend for clean integration.",
    ],
    features: [
      { title: "Conversational Retrieval", detail: "Ask for drug info, diagnostic criteria, or protocols in natural language." },
      { title: "Private by Design", detail: "LLaMA 3 enables local inference so sensitive data stays in-house." },
      { title: "Fast Vector Search", detail: "FAISS delivers rapid, accurate retrieval over large medical corpora." },
      { title: "Guideline-Grounded", detail: "Answers anchored in trusted clinical literature, not guesswork." },
    ],
    results: [
      { metric: "Private", label: "On-prem capable inference" },
      { metric: "Fast", label: "FAISS-powered retrieval" },
      { metric: "Grounded", label: "Answers from real guidelines" },
    ],
    stack: [
      { group: "AI / LLM", items: ["RAG", "LLaMA 3"] },
      { group: "Vector Store", items: ["FAISS"] },
      { group: "Backend", items: ["FastAPI"] },
    ],
  },
  {
    slug: "medassist-ai",
    name: "MedAssist AI",
    cats: ["AI / ML"],
    category: "AI / Healthcare",
    tags: ["OpenAI", "Next.js", "Node.js", "MongoDB"],
    desc: "Patient-facing medical chatbot that triages symptoms, answers health queries, and guides users to appropriate care pathways. Integrates with appointment systems for seamless handoff to human providers.",
    summary:
      "MedAssist AI is a patient-facing medical chatbot — triages symptoms, answers health queries, and hands off to human providers via integrated appointment booking.",
    keywords: [
      "medical chatbot",
      "symptom triage AI",
      "patient engagement",
      "healthcare chatbot",
      "OpenAI healthcare",
      "appointment integration",
      "Next.js health app",
    ],
    industry: "Healthcare / Digital Health",
    timeline: "5 months",
    workOrigin: "prototype",
    services: ["AI / Healthcare", "Full-Stack Development", "System Integration"],
    color: "#14B8A6",
    image: "/services-api-integrations.jpg",
    overview:
      "MedAssist AI is a patient-facing chatbot that triages symptoms, answers health questions, and guides users toward the right care pathway. When a human is needed, it integrates with appointment systems for a seamless handoff — bridging self-service and professional care.",
    challenges: [
      "Patients needed guidance for health concerns outside clinic hours without overloading staff.",
      "Symptom triage had to be helpful while responsibly routing serious cases to humans.",
      "The chatbot needed to connect to real appointment systems, not just chat.",
      "Conversations and user data had to be stored reliably and securely.",
    ],
    solutions: [
      "Built a Next.js patient interface backed by a Node.js service using OpenAI for conversational triage.",
      "Designed triage flows that answer common queries and escalate to care pathways when appropriate.",
      "Integrated with appointment systems so the bot can hand off directly to human providers.",
      "Persisted conversations and user context in MongoDB.",
    ],
    features: [
      { title: "Symptom Triage", detail: "Guides patients through their concern and suggests the right next step." },
      { title: "Health Q&A", detail: "Answers everyday health questions in clear, conversational language." },
      { title: "Provider Handoff", detail: "Integrates with appointment systems to connect patients to humans." },
      { title: "Care Pathways", detail: "Routes users toward the appropriate level of care." },
    ],
    results: [
      { metric: "24/7", label: "Patient-facing guidance" },
      { metric: "Seamless", label: "Handoff to real providers" },
      { metric: "Triage", label: "Routes to the right care" },
    ],
    stack: [
      { group: "AI / LLM", items: ["OpenAI"] },
      { group: "Frontend", items: ["Next.js"] },
      { group: "Backend", items: ["Node.js", "MongoDB"] },
    ],
  },
  {
    slug: "voice-intelligence-hub",
    name: "Voice Intelligence Hub",
    cats: ["AI / ML"],
    category: "AI / Speech",
    tags: ["Whisper", "Python", "NLP", "FastAPI"],
    desc: "End-to-end voice analytics platform that transcribes, diarizes, and analyzes call recordings. Extracts sentiment, key topics, and action items — built for contact centers and sales teams.",
    summary:
      "Voice Intelligence Hub transcribes, diarizes, and analyzes call recordings with Whisper + NLP — extracting sentiment, topics, and action items for contact centers.",
    keywords: [
      "voice analytics platform",
      "call transcription",
      "speaker diarization",
      "Whisper transcription",
      "conversation intelligence",
      "sentiment analysis",
      "contact center AI",
    ],
    industry: "Sales / Contact Centers",
    timeline: "5 months",
    workOrigin: "prior-team",
    services: ["AI / Speech", "NLP Engineering", "Backend Engineering"],
    color: "#6BA3C4",
    image: "/voice_hub.png",
    overview:
      "Voice Intelligence Hub is an end-to-end voice analytics platform. It transcribes call recordings, separates who said what (diarization), and analyzes the conversation to extract sentiment, key topics, and action items — giving contact centers and sales teams insight that used to be locked inside audio.",
    challenges: [
      "Thousands of call recordings held valuable insight that no one had time to listen to.",
      "Accurate transcription and reliable speaker separation are hard at scale.",
      "Teams needed structured signals — sentiment, topics, action items — not raw transcripts.",
      "The pipeline had to process audio end to end without manual steps.",
    ],
    solutions: [
      "Used OpenAI Whisper for high-accuracy transcription across varied audio quality.",
      "Added speaker diarization so transcripts attribute each line to the right participant.",
      "Applied NLP to extract sentiment, key topics, and action items from each conversation.",
      "Wrapped the full pipeline in a FastAPI service for automated, scalable processing.",
    ],
    features: [
      { title: "Accurate Transcription", detail: "Whisper-powered speech-to-text across diverse call audio." },
      { title: "Speaker Diarization", detail: "Knows who said what, attributing each line to a speaker." },
      { title: "Conversation Insights", detail: "Extracts sentiment, key topics, and action items automatically." },
      { title: "End-to-End Pipeline", detail: "From raw recording to structured analytics with no manual steps." },
    ],
    results: [
      { metric: "End-to-end", label: "Audio to insights, automated" },
      { metric: "Who-said-what", label: "Speaker-level transcripts" },
      { metric: "Actionable", label: "Sentiment, topics, action items" },
    ],
    stack: [
      { group: "Speech", items: ["Whisper"] },
      { group: "AI / NLP", items: ["NLP pipelines"] },
      { group: "Backend", items: ["Python", "FastAPI"] },
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectCase | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getRelatedProjects(slug: string, limit = 3): ProjectCase[] {
  const current = getProjectBySlug(slug);
  if (!current) return PROJECTS.slice(0, limit);
  const sameCat = PROJECTS.filter(
    (p) => p.slug !== slug && p.cats.some((c) => current.cats.includes(c)),
  );
  const others = PROJECTS.filter(
    (p) => p.slug !== slug && !p.cats.some((c) => current.cats.includes(c)),
  );
  return [...sameCat, ...others].slice(0, limit);
}
