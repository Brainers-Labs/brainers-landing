"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { GitMerge } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

type SpringValue = MotionValue<number>;

const SlackIcon = () => (
  <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.522-2.523 2.528 2.528 0 0 1 2.522-2.52h2.52v2.52zM6.305 15.165a2.528 2.528 0 0 1 2.52-2.52h5.043a2.528 2.528 0 0 1 2.522 2.52v5.043a2.528 2.528 0 0 1-2.522 2.52H8.825a2.528 2.528 0 0 1-2.52-2.52v-5.043z" fill="#E01E5A" />
    <path d="M8.825 5.043a2.528 2.528 0 0 1 2.52-2.52 2.528 2.528 0 0 1 2.522 2.52v2.52h-2.522a2.528 2.528 0 0 1-2.52-2.52zM8.825 6.305a2.528 2.528 0 0 1 2.52 2.52v5.043a2.528 2.528 0 0 1-2.52 2.522H3.782a2.528 2.528 0 0 1-2.52-2.522 2.528 2.528 0 0 1 2.52-2.52h5.043z" fill="#36C5F0" />
    <path d="M18.958 8.825a2.528 2.528 0 0 1 2.52-2.52 2.528 2.528 0 0 1 2.522 2.52 2.528 2.528 0 0 1-2.522 2.52h-2.52v-2.52zM17.695 8.825a2.528 2.528 0 0 1-2.52 2.52h-5.043a2.528 2.528 0 0 1-2.522-2.52V3.782a2.528 2.528 0 0 1 2.522-2.52h5.043a2.528 2.528 0 0 1 2.52 2.52v5.043z" fill="#2EB67D" />
    <path d="M15.175 18.958a2.528 2.528 0 0 1-2.52 2.52 2.528 2.528 0 0 1-2.522-2.52v-2.52h2.522a2.528 2.528 0 0 1 2.52 2.52zM15.175 17.695a2.528 2.528 0 0 1-2.52-2.52v-5.043a2.528 2.528 0 0 1 2.52-2.522h5.043a2.528 2.528 0 0 1 2.52 2.522 2.528 2.528 0 0 1-2.52 2.52h-5.043z" fill="#ECB22E" />
  </svg>
);

const NotionIcon = () => (
  <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm3 4h2.5v1.2l3 3.3V7h2.5v10h-2.5v-1.2l-3-3.3V17H7V7z" fill="#000000" />
  </svg>
);

const DriveIcon = () => (
  <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none">
    <path d="M19.43 12.98L13 1.86C12.61 1.18 11.9 1.18 11.51 1.86L5.08 12.98C4.69 13.66 5.05 14.22 5.83 14.22H18.68c.78 0 1.14-.56.75-1.24z" fill="#4285F4" />
    <path d="M9.43 14.98L3 3.86C2.61 3.18 1.9 3.18 1.51 3.86L.08 14.98C-.31 15.66.05 16.22.83 16.22h12.85c.78 0 1.14-.56.75-1.24z" fill="#34A853" />
    <path d="M14.43 20.98L8 9.86C7.61 9.18 6.9 9.18 6.51 9.86L5.08 20.98C4.69 21.66 5.05 22.22 5.83 22.22h12.85c.78 0 1.14-.56.75-1.24z" fill="#FBBC05" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="#24292e" />
  </svg>
);

const JiraIcon = () => (
  <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none">
    <path d="M11.53 2.3a1.67 1.67 0 0 1 2.94 0l8.03 14.1a1.67 1.67 0 0 1-1.47 2.5H2.97a1.67 1.67 0 0 1-1.47-2.5z" fill="#2684FF" />
  </svg>
);

const MailIcon = () => (
  <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#EA4335" />
    <path d="M5 7l7 5 7-5v10H5V7z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ZoomIcon = () => (
  <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#7C5CFC" />
    <path d="M7 10h6v4H7zm7 1l3-2.2v6.4L14 13z" fill="#FFFFFF" />
  </svg>
);

const DbIcon = () => (
  <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#3B82F6" />
    <ellipse cx="12" cy="7" rx="5" ry="2" fill="#FFFFFF" />
    <path d="M7 7v4c0 1.1 2.2 2 5 2s5-.9 5-2V7" stroke="#FFFFFF" strokeWidth="1.5" />
    <path d="M7 12v4c0 1.1 2.2 2 5 2s5-.9 5-2v-4" stroke="#FFFFFF" strokeWidth="1.5" />
  </svg>
);

type ToolData = {
  label: string;
  x: number;
  y: number;
  color: string;
  icon: React.ReactNode;
};

const TOOLS: ToolData[] = [
  { label: "Slack", x: 15, y: 20, color: "#E01E5A", icon: <SlackIcon /> },
  { label: "Notion", x: 35, y: 12, color: "#111111", icon: <NotionIcon /> },
  { label: "GitHub", x: 80, y: 20, color: "#111111", icon: <GitHubIcon /> },
  { label: "Drive", x: 68, y: 12, color: "#4285F4", icon: <DriveIcon /> },
  { label: "Jira", x: 10, y: 70, color: "#2684FF", icon: <JiraIcon /> },
  { label: "Email", x: 35, y: 85, color: "#EA4335", icon: <MailIcon /> },
  { label: "Meetings", x: 68, y: 85, color: "#7C5CFC", icon: <ZoomIcon /> },
  { label: "Databases", x: 88, y: 68, color: "#3B82F6", icon: <DbIcon /> },
];

const LABELS = [
  "Searching systems\u2026",
  "Finding context\u2026",
  "Connecting knowledge\u2026",
  "Synthesizing answers\u2026",
];

const CENTER = { x: 50, y: 50 };

function AmbientGrid() {
  return (
    <>
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.04)_100%)]" />
    </>
  );
}

function ToolOrb({
  tool,
  index,
  mouseX,
  mouseY,
}: {
  tool: ToolData;
  index: number;
  mouseX: SpringValue;
  mouseY: SpringValue;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useAnimationFrame(() => {
    const mx = mouseX.get();
    const my = mouseY.get();
    const tx = (mx / window.innerWidth - 0.5) * 10;
    const ty = (my / window.innerHeight - 0.5) * 10;
    x.set(tx);
    y.set(ty);
  });

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${tool.x}%`,
        top: `${tool.y}%`,
        x,
        y,
      }}
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.05 * index, ease: EASE }}
    >
      <motion.div
        animate={{
          y: [0, -8 + index * 1.5, 0],
          rotate: [-1.5 + index * 0.3, 1.5 - index * 0.3, -1.5 + index * 0.3],
        }}
        transition={{
          duration: 6 + index * 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        data-cursor="hover"
        className="flex h-[56px] w-[56px] items-center justify-center rounded-full border border-white/50 bg-white/70 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-shadow duration-500 hover:shadow-[0_14px_50px_rgba(0,0,0,0.12)]"
      >
        <div className="opacity-85">{tool.icon}</div>
      </motion.div>
      <span className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.15em] text-black/45">
        {tool.label}
      </span>
    </motion.div>
  );
}

function InformationStreams() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {TOOLS.map((tool, i) => {
        const d = `M ${tool.x} ${tool.y} Q 50 ${tool.y} ${CENTER.x} ${CENTER.y}`;
        return (
          <g key={tool.label}>
            <path d={d} stroke="rgba(0,0,0,0.03)" strokeWidth={0.6} fill="none" />
            <motion.circle
              r="0.8"
              fill="#ef4444"
              style={{ offsetPath: `path("${d}")` }}
              animate={{ offsetDistance: ["0%", "100%"] }}
              transition={{
                duration: 2.8 + i * 0.3,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.15,
              }}
            />
          </g>
        );
      })}
    </svg>
  );
}

function NeuralCore({ label, mouseX, mouseY }: { label: string; mouseX: SpringValue; mouseY: SpringValue }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useAnimationFrame(() => {
    const mx = mouseX.get();
    const my = mouseY.get();
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (mx - cx) / cx;
    const dy = (my - cy) / cy;
    x.set(dx * 4);
    y.set(dy * 4);
  });

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ x, y }}
    >
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/15"
          animate={{
            scale: [1, 3.5 - i * 0.4],
            opacity: [0.35 - i * 0.05, 0],
          }}
          transition={{
            duration: 3.6 - i * 0.3,
            delay: i * 1.1,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      <motion.div
        className="relative flex h-[88px] w-[88px] items-center justify-center rounded-full border border-red-500/20 bg-white"
        animate={{
          scale: [1, 1.08, 1],
          boxShadow: [
            "0 0 30px rgba(239,68,68,0.08)",
            "0 0 90px rgba(239,68,68,0.18)",
            "0 0 30px rgba(239,68,68,0.08)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[5px] rounded-full border border-dashed border-red-500/15"
        />

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[12px] rounded-full border border-dashed border-red-500/10"
        />

        <GitMerge size={26} className="text-red-500" />
      </motion.div>

      <motion.div
        key={label}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="absolute left-1/2 top-full mt-5 -translate-x-1/2"
      >
        <span className="whitespace-nowrap rounded-full border border-red-500/15 bg-red-500/[0.03] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-red-500/70">
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
}

function ParticleField({ mouseX, mouseY }: { mouseX: SpringValue; mouseY: SpringValue }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const particles = useMemo(() => {
    return Array.from({ length: 250 }, () => ({
      x: Math.random() * 1200,
      y: Math.random() * 600,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.2 + 0.05,
    }));
  }, []);

  useAnimationFrame(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const mx = mouseX.get();
    const my = mouseY.get();

    particles.forEach((p) => {
      const dx = mx - p.x;
      const dy = my - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        p.vx -= dx * 0.00003;
        p.vy -= dy * 0.00003;
      }

      const cx = width / 2;
      const cy = height / 2;
      const cdx = cx - p.x;
      const cdy = cy - p.y;
      const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
      if (cdist < 200) {
        p.vx += cdx * 0.00001;
        p.vy += cdy * 0.00001;
      }

      p.vx += (Math.random() - 0.5) * 0.002;
      p.vy += (Math.random() - 0.5) * 0.002;

      p.vx *= 0.98;
      p.vy *= 0.98;

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,0,0,${p.opacity})`;
      ctx.fill();
    });
  });

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}

export function LivingKnowledgeNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  const [labelIndex, setLabelIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLabelIndex((v) => (v + 1) % LABELS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-full w-full overflow-hidden rounded-2xl border border-black/[0.04] bg-black/[0.015] lg:rounded-3xl"
    >
      <AmbientGrid />
      <ParticleField mouseX={springX} mouseY={springY} />
      <InformationStreams />
      {TOOLS.map((tool, i) => (
        <ToolOrb key={tool.label} tool={tool} index={i} mouseX={springX} mouseY={springY} />
      ))}
      <NeuralCore label={LABELS[labelIndex]} mouseX={springX} mouseY={springY} />
    </div>
  );
}
