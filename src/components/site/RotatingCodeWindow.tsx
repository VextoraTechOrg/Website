import { FADE_MS, slideMotionClasses, useRotatingSlide } from "@/components/site/useRotatingSlide";

type TokenType = "keyword" | "module" | "class" | "func" | "string" | "comment" | "plain" | "number";
type Token = [TokenType, string];
type CodeLine = Token[];
type CodeFile = { filename: string; lines: CodeLine[] };

const COLORS: Record<TokenType, string> = {
  keyword: "text-secondary",
  module: "text-primary",
  class: "text-primary",
  func: "text-primary",
  string: "text-[#10B981]",
  comment: "text-muted-foreground",
  plain: "",
  number: "text-[#10B981]",
};

const CODE_FILES: CodeFile[] = [
  {
    filename: "vextoratech_ai.py",
    lines: [
      [["keyword", "from"], ["plain", " "], ["module", "vextoratech"], ["plain", " "], ["keyword", "import"], ["plain", " "], ["class", "AIEngine"]],
      [],
      [["comment", "# Initialize smart assistant"]],
      [["plain", "engine = "], ["class", "AIEngine"], ["plain", "(model="], ["string", '"vxt-pro-v2"'], ["plain", ")"]],
      [],
      [["comment", "# Deploy in 3 lines"]],
      [["plain", "app = engine."], ["func", "build"], ["plain", "("]],
      [["plain", "    stack=["], ["string", '"FastAPI"'], ["plain", ", "], ["string", '"React"'], ["plain", ", "], ["string", '"PostgreSQL"'], ["plain", "],"]],
      [["plain", "    ai_features=["], ["string", '"RAG"'], ["plain", ", "], ["string", '"NLP"'], ["plain", ", "], ["string", '"Vision"'], ["plain", "],"]],
      [["plain", "    deploy_target="], ["string", '"cloud"']],
      [["plain", ")"]],
      [],
      [["plain", "app."], ["func", "launch"], ["plain", "()"]],
      [["comment", "# ✓ Live at vextoratech.com/client-demo"]],
    ],
  },
  {
    filename: "vision_pipeline.py",
    lines: [
      [["keyword", "from"], ["plain", " "], ["module", "vision"], ["plain", " "], ["keyword", "import"], ["plain", " "], ["class", "Detector"]],
      [],
      [["comment", "# ISL entry gate — dual camera ANPR + face match"]],
      [["plain", "gate = "], ["class", "Detector"], ["plain", "("]],
      [["plain", '    cameras=["entry", "plate"],']],
      [["plain", '    pipeline=["OCR", "FaceMatch"],']],
      [["plain", ")"]],
      [],
      [["plain", "gate."], ["func", "open_barrier"], ["plain", "()"]],
      [["comment", "# ✓ Barrier armed — live stream active"]],
    ],
  },
  {
    filename: "voice_hub.py",
    lines: [
      [["keyword", "from"], ["plain", " "], ["module", "analytics"], ["plain", " "], ["keyword", "import"], ["plain", " "], ["class", "CallAnalyzer"]],
      [],
      [["comment", "# Voice Intelligence Hub — call QA pipeline"]],
      [["plain", "hub = "], ["class", "CallAnalyzer"], ["plain", "("]],
      [["plain", '    metrics=["Sentiment", "Tone"],']],
      [["plain", '    detect=["Compliance", "Intent"],']],
      [["plain", ")"]],
      [],
      [["plain", "hub."], ["func", "export"], ["plain", "()"]],
      [["comment", "# ✓ Insights ready for review"]],
    ],
  },
];

const MAX_LINES = Math.max(...CODE_FILES.map((f) => f.lines.length));

function renderLine(tokens: Token[], key: number) {
  if (tokens.length === 0) return <span key={key}>{"\n"}</span>;

  return (
    <span key={key}>
      {tokens.map(([type, text], i) => (
        <span key={i} className={COLORS[type]}>
          {text}
        </span>
      ))}
      {"\n"}
    </span>
  );
}

export default function RotatingCodeWindow() {
  const { index, phase, direction } = useRotatingSlide(CODE_FILES.length);
  const file = CODE_FILES[index];
  const motionClass = slideMotionClasses(phase, direction);

  return (
    <div className="relative animate-fade-up">
      <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-3xl" aria-hidden />
      <div className="relative bg-[#0A1220] border border-border rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(79,142,247,0.18)]">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-black/30 overflow-hidden">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
          <span
            className={`ml-3 mono text-[11px] text-muted-foreground normal-case tracking-normal ${motionClass}`}
            style={{ transitionDuration: `${FADE_MS}ms` }}
          >
            {file.filename}
          </span>
        </div>
        <pre
          className="p-5 text-[13px] leading-relaxed font-mono text-foreground/90 overflow-hidden min-h-[280px]"
          style={{ minHeight: `${MAX_LINES * 1.625}rem` }}
        >
          <code
            className={`block ${motionClass}`}
            style={{ transitionDuration: `${FADE_MS}ms` }}
          >
            {file.lines.map((line, i) => renderLine(line, i))}
          </code>
        </pre>
      </div>
    </div>
  );
}
