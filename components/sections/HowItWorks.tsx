"use client";

import { useRef, useState, useEffect, forwardRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import {
  Plug,
  FileOutput,
  Sparkles,
  Network,
  Search,
  BadgeCheck,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Narrative Stages ────────────────────────────────────────────
const STAGES = [
  {
    icon: Plug,
    title: "Connect your apps.",
    body: "Synax connects to your email, chat apps, and folders in one click. You don't need to move any files.",
  },
  {
    icon: FileOutput,
    title: "Read the information.",
    body: "It reads and learns from every document, chat message, and rule, picking out the most important facts.",
  },
  {
    icon: Sparkles,
    title: "Understand who and when.",
    body: "It understands who wrote what, when decisions were made, and which rules apply to your work.",
  },
  {
    icon: Network,
    title: "Connect the dots.",
    body: "It draws invisible lines to connect files, people, and projects, creating a visual map of how everything relates.",
  },
  {
    icon: Search,
    title: "Get simple answers.",
    body: "Just ask a question in plain English. The brain reads all your connected files and gives you a single, clear answer.",
  },
  {
    icon: BadgeCheck,
    title: "Trust the source.",
    body: "Every answer shows you exactly where it got the information from, including files, pages, and messages, so you know it is true.",
  },
];

// ─── Background Particles ───────────────────────────────────────
function seeded(i: number, j: number) {
  return ((i * 12.9898 + j * 78.233) * 43758.5453) % 1;
}

function Particles() {
  const particles = useRef(
    Array.from({ length: 18 }, (_, i) => ({
      x: seeded(i, 0) * 100,
      y: seeded(i, 1) * 100,
      size: 1.5 + seeded(i, 2) * 2,
      duration: 10 + seeded(i, 3) * 20,
      delay: seeded(i, 4) * 10,
    })),
  ).current;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-black/10"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -30, 0], opacity: [0.15, 0.5, 0.15] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Step Labels (in-card tiny icon) ────────────────────────────
const ILLUSTRATIONS = [
  <svg key="0" viewBox="0 0 48 48" className="h-8 w-8 shrink-0" fill="none">
    <rect x="14" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <rect x="18" y="18" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <line x1="24" y1="34" x2="24" y2="42" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="24" cy="44" r="2" fill="currentColor" />
  </svg>,
  <svg key="1" viewBox="0 0 48 48" className="h-8 w-8 shrink-0" fill="none">
    <rect x="10" y="4" width="28" height="40" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <line x1="16" y1="14" x2="32" y2="14" stroke="currentColor" strokeWidth="1.5" />
    <line x1="16" y1="22" x2="32" y2="22" stroke="currentColor" strokeWidth="1.5" />
    <line x1="16" y1="30" x2="28" y2="30" stroke="currentColor" strokeWidth="1.5" />
    <path d="M36 16l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="40" y1="20" x2="32" y2="20" stroke="currentColor" strokeWidth="1.5" />
  </svg>,
  <svg key="2" viewBox="0 0 48 48" className="h-8 w-8 shrink-0" fill="none">
    <circle cx="24" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="36" r="4" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="36" cy="36" r="4" stroke="currentColor" strokeWidth="1.5" />
    <line x1="24" y1="16" x2="12" y2="32" stroke="currentColor" strokeWidth="1.5" />
    <line x1="24" y1="16" x2="36" y2="32" stroke="currentColor" strokeWidth="1.5" />
    <line x1="16" y1="36" x2="32" y2="36" stroke="currentColor" strokeWidth="1.5" />
  </svg>,
  <svg key="3" viewBox="0 0 48 48" className="h-8 w-8 shrink-0" fill="none">
    <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.4" />
    <circle cx="36" cy="8" r="3" fill="currentColor" opacity="0.4" />
    <circle cx="24" cy="24" r="3" fill="currentColor" />
    <circle cx="8" cy="38" r="3" fill="currentColor" opacity="0.4" />
    <circle cx="40" cy="36" r="3" fill="currentColor" opacity="0.4" />
    <line x1="12" y1="12" x2="24" y2="24" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="36" y1="8" x2="24" y2="24" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="24" y1="24" x2="8" y2="38" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="24" y1="24" x2="40" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.3" />
  </svg>,
  <svg key="4" viewBox="0 0 48 48" className="h-8 w-8 shrink-0" fill="none">
    <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.5" />
    <line x1="28" y1="28" x2="40" y2="40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="16" y1="20" x2="24" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
  </svg>,
  <svg key="5" viewBox="0 0 48 48" className="h-8 w-8 shrink-0" fill="none">
    <path d="M24 4l18 8v12c0 10-7.7 18.5-18 20-10.3-1.5-18-10-18-20V12l18-8z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16 24l6 6 10-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

// ─── Process Visualizations ─────────────────────────────────────
function ConnectVisual() {
  const apps = ["Slack", "GitHub", "Notion", "Drive", "Email", "Linear"];
  const radius = 110;

  return (
    <div className="relative flex h-[300px] items-center justify-center">
      <motion.div
        className="flex h-20 w-20 items-center justify-center rounded-3xl border border-accent/30 bg-accent/10 text-[10px] font-bold uppercase tracking-widest text-accent"
        animate={{ boxShadow: ["0 0 20px rgba(59,130,246,0.2)", "0 0 40px rgba(59,130,246,0.4)", "0 0 20px rgba(59,130,246,0.2)"] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Brainers
      </motion.div>
      <div className="absolute inset-0">
        {apps.map((app, i) => {
          const angle = (360 / apps.length) * i - 90;
          const rad = (angle * Math.PI) / 180;
          return (
            <motion.div
              key={app}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.4, ease: EASE }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                x: Math.cos(rad) * radius,
                y: Math.sin(rad) * radius,
              }}
            >
              <div className="whitespace-nowrap rounded-xl border border-accent/15 bg-black/[0.04] px-3 py-2 text-[11px] font-medium text-black/70 backdrop-blur-sm">
                {app}
              </div>
            </motion.div>
          );
        })}
      </div>
      {apps.map((_, i) => {
        const angle = (360 / apps.length) * i - 90;
        return (
          <motion.div
            key={`line-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-px -translate-x-1/2 -translate-y-1/2"
            style={{
              width: radius,
              transformOrigin: "0 0",
              rotate: `${angle}deg`,
              background: "linear-gradient(90deg, rgba(59,130,246,0.3), transparent)",
            }}
          />
        );
      })}
    </div>
  );
}

function ExtractVisual() {
  const docs = ["PDF", "Email", "Wiki", "Transcript", "Policy"];
  const [activeDoc, setActiveDoc] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDoc((prev) => (prev + 1) % docs.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [docs.length]);

  return (
    <div className="flex h-[300px] flex-col items-center justify-center gap-5">
      <div className="flex flex-wrap justify-center gap-2">
        {docs.map((doc, i) => (
          <motion.div
            key={doc}
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: activeDoc === i ? 1 : 0.35,
              y: activeDoc === i ? 0 : -4,
              scale: activeDoc === i ? 1.05 : 0.95,
            }}
            transition={{ duration: 0.4, ease: EASE }}
            className="rounded-xl border border-accent/15 bg-black/[0.04] px-3 py-2 text-[11px] font-medium text-black/70"
          >
            {doc}
          </motion.div>
        ))}
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="text-black/40 text-lg"
      >
        ↓
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5, ease: EASE }}
        className="rounded-2xl border border-accent/20 bg-accent/10 px-6 py-3 text-[11px] font-medium text-accent"
      >
        People · Policies · Dates · Decisions
      </motion.div>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
        className="h-px max-w-[200px] bg-gradient-to-r from-transparent via-accent/30 to-transparent"
      />
    </div>
  );
}

function UnderstandVisual() {
  const entities = [
    { label: "John Doe", x: "20%", y: "15%", role: "Person" },
    { label: "Policy 14", x: "72%", y: "20%", role: "Rule" },
    { label: "Due: Dec 31", x: "15%", y: "55%", role: "Date" },
    { label: "Approved", x: "68%", y: "60%", role: "Decision" },
  ];

  return (
    <div className="relative flex h-[300px] items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl border border-accent/20 bg-accent/10 px-5 py-3 text-xs font-semibold text-accent shadow-[0_0_20px_rgba(59,130,246,0.15)]"
      >
        Contract.pdf
      </motion.div>

      {entities.map((e, i) => (
        <motion.div
          key={e.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.15, duration: 0.4, ease: EASE }}
          className="absolute"
          style={{ left: e.x, top: e.y }}
        >
          <div className="group relative">
            <div className="rounded-lg border border-accent/15 bg-black/[0.04] px-2.5 py-1.5 text-[11px] font-medium text-black/70 backdrop-blur-sm">
              {e.label}
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-semibold uppercase tracking-widest text-black/35">
              {e.role}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Connection lines from center to each entity */}
      {entities.map((e, i) => (
        <motion.div
          key={`conn-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.15 }}
          className="pointer-events-none absolute left-1/2 top-[38%] h-px"
          style={{
            width: "35%",
            transformOrigin: "0 0",
            rotate: `${-30 + i * 40}deg`,
            background: "linear-gradient(90deg, rgba(59,130,246,0.25), transparent)",
          }}
        />
      ))}
    </div>
  );
}

function MapVisual() {
  const nodes = [
    { label: "Policy", x: "50%", y: "48%", size: "lg" },
    { label: "Legal", x: "18%", y: "22%", size: "sm" },
    { label: "Vendor", x: "80%", y: "25%", size: "sm" },
    { label: "Process", x: "20%", y: "78%", size: "sm" },
    { label: "Owner", x: "78%", y: "75%", size: "sm" },
  ];

  const edges = [
    [0, 1], [0, 2], [0, 3], [0, 4],
  ];

  return (
    <div className="relative h-[300px]">
      <svg className="absolute inset-0 h-full w-full">
        {edges.map(([from, to], i) => {
          const f = nodes[from];
          const t = nodes[to];
          const fx = parseFloat(f.x) / 100 * 100;
          const fy = parseFloat(f.y) / 100 * 100;
          const tx = parseFloat(t.x) / 100 * 100;
          const ty = parseFloat(t.y) / 100 * 100;
          return (
            <motion.line
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              x1={`${fx}%`}
              y1={`${fy}%`}
              x2={`${tx}%`}
              y2={`${ty}%`}
              stroke="rgba(59,130,246,0.3)"
              strokeWidth="1"
            />
          );
        })}
      </svg>

      {nodes.map((node, i) => (
        <motion.div
          key={node.label}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.12, duration: 0.4, ease: EASE }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: node.x, top: node.y }}
        >
          <motion.div
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`rounded-xl border border-accent/20 bg-accent/10 px-3 py-2 text-xs font-medium text-accent backdrop-blur-sm ${
              node.size === "lg" ? "px-4 py-2.5 text-sm" : ""
            }`}
          >
            {node.label}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

function SearchVisual() {
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowResult(true), 600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex h-[300px] flex-col justify-center gap-5 px-2">
      <div className="rounded-2xl border border-accent/15 bg-black/[0.04] px-5 py-4 text-sm text-black/80 backdrop-blur-sm">
        <span className="text-black/50">&ldquo;</span>
        What policy governs vendor onboarding?
        <span className="text-black/50">&rdquo;</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: showResult ? 1 : 0, y: showResult ? 0 : 10 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="rounded-2xl border border-accent/20 bg-accent/10 px-5 py-4 backdrop-blur-sm"
      >
        <div className="text-sm font-medium text-accent">Vendor Policy 12</div>
        <div className="mt-2 flex items-center gap-2 text-[10px] text-black/50">
          <span className="h-1 w-1 rounded-full bg-accent/50" />
          Sources: Vendor Handbook p.17, Procurement Policy p.8
        </div>
      </motion.div>
    </div>
  );
}

function TrustVisual() {
  return (
    <div className="flex h-[300px] flex-col justify-center gap-6 px-2">
      <div>
        <div className="flex items-center justify-between text-[11px] font-medium text-black/70">
          <span>Confidence</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-accent"
          >
            94%
          </motion.span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "94%" }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
            className="h-full rounded-full bg-gradient-to-r from-accent to-[#35d6ff] shadow-[0_0_12px_rgba(59,130,246,0.4)]"
          />
        </div>
      </div>

      <div className="space-y-3">
        {[
          { label: "Employee Handbook", page: "p.16" },
          { label: "Procurement Policy", page: "p.8" },
          { label: "Slack #legal", page: "Nov 12" },
        ].map((src, i) => (
          <motion.div
            key={src.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.15, duration: 0.4, ease: EASE }}
            className="flex items-center gap-3 rounded-xl border border-accent/15 bg-black/[0.02] px-4 py-3"
          >
            <div className="flex h-5 w-5 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
              <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none">
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent" />
              </svg>
            </div>
            <span className="flex-1 text-xs text-black/80">{src.label}</span>
            <span className="text-[10px] font-mono text-black/40">{src.page}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Process Visualization Wrapper ───────────────────────────────
function ProcessVisualization({ index }: { index: number }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="p-6"
      >
        <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-black/40">
          Step {String(index + 1).padStart(2, "0")} — {STAGES[index].title.replace(".", "")}
        </div>
        {index === 0 && <ConnectVisual />}
        {index === 1 && <ExtractVisual />}
        {index === 2 && <UnderstandVisual />}
        {index === 3 && <MapVisual />}
        {index === 4 && <SearchVisual />}
        {index === 5 && <TrustVisual />}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Timeline Item ──────────────────────────────────────────────
const TimelineItem = forwardRef<HTMLDivElement, { stage: (typeof STAGES)[0]; index: number }>(
  function TimelineItem({ stage, index }, forwardedRef) {
    const localRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const isActive = useInView(localRef, { margin: "-40% 0px -40% 0px" });

    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const r = localRef.current?.getBoundingClientRect();
    const cx = r ? r.width / 2 : 160;
    const cy = r ? r.height / 2 : 120;
    const rx = hovered ? (coords.y - cy) / 24 : 0;
    const ry = hovered ? (cx - coords.x) / 24 : 0;

    const setMergedRef = (node: HTMLDivElement | null) => {
      localRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef && "current" in forwardedRef) (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };

    return (
      <div ref={setMergedRef} className="group relative flex items-start gap-4 sm:gap-8">
        {/* Node */}
        <motion.div
          animate={{ scale: isActive ? 1.15 : 1 }}
          transition={{ duration: 0.35, ease: EASE }}
          className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-500 ${
            isActive
              ? "border-accent/50 bg-accent/10 shadow-[0_0_24px_rgba(59,130,246,0.4)]"
              : "border-accent/15 bg-white/80 shadow-sm"
          }`}
        >
          <stage.icon
            size={16}
            className={`transition-colors duration-300 ${isActive ? "text-accent" : "text-black/35"}`}
          />
        </motion.div>

        {/* Connector line */}
        <div className="relative mt-5 hidden h-px w-6 shrink-0 sm:block">
          <motion.div
            animate={{ opacity: isActive ? 1 : 0.5 }}
            className="absolute inset-0 bg-gradient-to-r from-accent/40 to-transparent"
          />
        </div>

        {/* Card */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 0.7, delay: 0.08 * index, ease: EASE }}
          animate={{ y: isActive ? -4 : 0, scale: isActive ? 1.02 : 1 }}
          style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
          className={`relative flex-1 overflow-hidden rounded-2xl border p-5 transition-all duration-500 sm:p-6 ${
            isActive
              ? "border-accent/20 bg-gradient-to-b from-accent/10 to-white/70 shadow-[0_10px_40px_rgba(0,0,0,0.08),inset_0_1px_rgba(255,255,255,0.6)]"
              : "border-accent/12 bg-white/70 shadow-[0_10px_40px_rgba(0,0,0,0.06),inset_0_1px_rgba(255,255,255,0.5)] backdrop-blur-md"
          }`}
          data-cursor="hover"
        >
          {/* Noise overlay */}
          <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.04] mix-blend-multiply"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
            }}
          />

          {/* Cursor glare */}
          {hovered && (
            <div
              className="pointer-events-none absolute inset-0 z-0 rounded-2xl transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle 140px at ${coords.x}px ${coords.y}px, rgba(59,130,246,0.12), transparent 70%)`,
              }}
            />
          )}

          {/* Content */}
          <div className="relative z-10 flex items-start gap-3">
            <div className="hidden sm:block">{ILLUSTRATIONS[index]}</div>
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/50">
                Step {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className={`mt-1.5 text-xl font-semibold tracking-tight transition-colors duration-300 ${isActive ? "text-black/95" : "text-black/80"}`}>
                {stage.title}
              </h3>
              <p className={`mt-2 text-sm leading-relaxed transition-colors duration-300 ${isActive ? "text-black/70" : "text-black/50"}`}>
                {stage.body}
              </p>
            </div>
            <div className="sm:hidden">{ILLUSTRATIONS[index]}</div>
          </div>
        </motion.div>
      </div>
    );
  },
);

// ─── Main Export ─────────────────────────────────────────────────
export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 65%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const pulseY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setActiveIndex(Math.min(Math.floor(v * STAGES.length), STAGES.length - 1));
    });
    return () => unsub();
  }, [scrollYProgress]);

  // ── Track step positions for panel tracking ──
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelParentRef = useRef<HTMLDivElement>(null);
  const [panelY, setPanelY] = useState(0);

  useEffect(() => {
    const activeEl = stepRefs.current[activeIndex];
    const parent = panelParentRef.current;
    if (!activeEl || !parent) return;

    const stepRect = activeEl.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    const center = stepRect.top + stepRect.height / 2 - parentRect.top;

    setPanelY(center);
  }, [activeIndex]);

  return (
    <section
      id="how-it-works"
      data-bg="light"
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/how-it-works.jpg)" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-white/85" />
      <Particles />

      <div className="relative mx-auto max-w-7xl px-6 py-32 sm:py-44 lg:px-10">

      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-full max-w-7xl -translate-x-1/2 hairline-gradient opacity-40" />

      <div className="flex flex-col gap-5 text-left">
        <span className="glass inline-flex w-fit items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-black/50">
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(59,130,246,0.9)]" />
          How Synax works
        </span>
        <h2 className="max-w-3xl text-balance text-3xl font-semibold leading-[1.08] tracking-tight text-black/95 sm:text-4xl lg:text-5xl">
          From scattered files to clear answers.
        </h2>
          <p className="max-w-xl text-pretty text-sm leading-relaxed text-black/50 sm:text-base">
          Six simple steps happen in the background. Your team only sees the final result: quick answers they can trust.
          </p>
      </div>

      <div ref={sectionRef} className="relative mx-auto mt-24 max-w-6xl">
        <div className="flex gap-8 lg:gap-16">
          {/* ─── Timeline ─── */}
          <div className="relative w-full lg:w-[55%]">
            {/* Spine track */}
            <div className="absolute left-[19px] top-0 h-full w-px bg-black/10 sm:left-[19px]" />

            {/* Neon fill line */}
            <motion.div
              style={{ scaleY: lineScale }}
              className="absolute left-[19px] top-0 h-full w-px origin-top bg-gradient-to-b from-accent via-violet to-[#35d6ff] shadow-[0_0_16px_rgba(59,130,246,0.6)]"
            />

            {/* Energy pulse orb */}
            <motion.div
              style={{ top: pulseY }}
              className="absolute left-[13px] z-20 h-[14px] w-[14px] -translate-x-1/2"
            >
              <div className="absolute inset-0 rounded-full bg-accent blur-md" />
              <div className="absolute inset-[3px] rounded-full bg-black/70" />
            </motion.div>

            <div className="space-y-16 sm:space-y-20">
              {STAGES.map((stage, i) => (
                <TimelineItem
                  key={stage.title}
                  ref={(el) => { stepRefs.current[i] = el; }}
                  stage={stage}
                  index={i}
                />
              ))}
            </div>
          </div>

          {/* ─── Right Process Canvas ─── */}
          <div
            ref={panelParentRef}
            className="relative hidden w-[45%] lg:block"
          >
            <motion.div
              animate={{ y: panelY - 180 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="absolute left-0 w-full"
            >
              <div className="relative overflow-hidden rounded-3xl p-[1px]">
                <div className="absolute inset-0 animate-[border-spin_4s_linear_infinite] rounded-3xl bg-[conic-gradient(from_0deg,transparent_30%,#3d7bff_50%,transparent_70%,#60a5fa_90%,transparent_100%)]" />
                <div className="relative z-10 rounded-[calc(1.5rem-1px)] bg-white p-6">
                  <ProcessVisualization index={activeIndex} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute left-[-5%] top-1/2 z-0 h-[480px] w-[480px] -translate-y-1/2 rounded-full bg-accent/6 blur-[130px]" />
      </div>
    </section>
  );
}
