import { FADE_MS, slideMotionClasses, useRotatingSlide } from "@/components/site/useRotatingSlide";

type TokenType = "keyword" | "module" | "class" | "func" | "string" | "comment" | "plain" | "number" | "decorator";
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
  decorator: "text-secondary",
};

const CODE_FILES: CodeFile[] = [
  {
    filename: "transcribe.py",
    lines: [
      [["keyword", "from"], ["plain", " "], ["module", "fastapi"], ["plain", " "], ["keyword", "import"], ["plain", " "], ["class", "FastAPI"], ["plain", ", "], ["class", "UploadFile"]],
      [["keyword", "import"], ["plain", " "], ["module", "whisper"]],
      [],
      [["plain", "app = "], ["class", "FastAPI"], ["plain", "()"]],
      [["plain", "model = whisper."], ["func", "load_model"], ["plain", "("], ["string", '"base"'], ["plain", ")"]],
      [],
      [["decorator", "@app.post"], ["plain", "("], ["string", '"/transcribe"'], ["plain", ")"]],
      [["keyword", "async"], ["plain", " "], ["keyword", "def"], ["plain", " "], ["func", "transcribe"], ["plain", "(file: "], ["class", "UploadFile"], ["plain", "):"]],
      [["plain", "    audio = "], ["keyword", "await"], ["plain", " file."], ["func", "read"], ["plain", "()"]],
      [["plain", "    result = model."], ["func", "transcribe"], ["plain", "(audio)"]],
      [["plain", "    "], ["keyword", "return"], ["plain", " {"], ["string", '"text"'], ["plain", ": result["], ["string", '"text"'], ["plain", "]}"]],
    ],
  },
  {
    filename: "detect.py",
    lines: [
      [["keyword", "from"], ["plain", " "], ["module", "ultralytics"], ["plain", " "], ["keyword", "import"], ["plain", " "], ["class", "YOLO"]],
      [],
      [["comment", "# Real-time object detection on a camera feed"]],
      [["plain", "model = "], ["class", "YOLO"], ["plain", "("], ["string", '"yolov8n.pt"'], ["plain", ")"]],
      [["plain", "results = model."], ["func", "predict"], ["plain", "(source=0, stream="], ["keyword", "True"], ["plain", ")"]],
      [],
      [["keyword", "for"], ["plain", " r "], ["keyword", "in"], ["plain", " results:"]],
      [["plain", "    "], ["keyword", "for"], ["plain", " box "], ["keyword", "in"], ["plain", " r.boxes:"]],
      [["plain", "        "], ["func", "print"], ["plain", "(box.cls, box.conf)"]],
    ],
  },
  {
    filename: "voice_hub.py",
    lines: [
      [["keyword", "import"], ["plain", " "], ["module", "whisper"]],
      [],
      [["comment", "# Transcribe + segment a call recording"]],
      [["plain", "model = whisper."], ["func", "load_model"], ["plain", "("], ["string", '"base"'], ["plain", ")"]],
      [["plain", "result = model."], ["func", "transcribe"], ["plain", "("], ["string", '"call.wav"'], ["plain", ")"]],
      [["plain", "segments = result["], ["string", '"segments"'], ["plain", "]  "], ["comment", "# timestamped utterances"]],
      [],
      [["keyword", "for"], ["plain", " seg "], ["keyword", "in"], ["plain", " segments:"]],
      [["plain", "    "], ["func", "print"], ["plain", "(seg["], ["string", '"start"'], ["plain", "], seg["], ["string", '"text"'], ["plain", "])"]],
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
