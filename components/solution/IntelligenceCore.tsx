"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { useMemo, useRef } from "react";
import { Brain } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── ViewBox coordinate system ────────────────────────────────
const V = { w: 100, h: 100 };
const CORE = { x: 50, y: 46 };
const CLUSTERS = {
  top: { x: 50, y: 14 },
  left: { x: 16, y: 46 },
  right: { x: 84, y: 46 },
  bottom: { x: 50, y: 80 },
} as const;

const PATHS = {
  top: `M ${CLUSTERS.top.x} ${CLUSTERS.top.y} Q ${CORE.x} ${CLUSTERS.top.y} ${CORE.x} ${CORE.y}`,
  left: `M ${CLUSTERS.left.x} ${CLUSTERS.left.y} Q ${CORE.x} ${CLUSTERS.left.y} ${CORE.x} ${CORE.y}`,
  right: `M ${CLUSTERS.right.x} ${CLUSTERS.right.y} Q ${CORE.x} ${CLUSTERS.right.y} ${CORE.x} ${CORE.y}`,
  bottom: `M ${CLUSTERS.bottom.x} ${CLUSTERS.bottom.y} Q ${CORE.x} ${CLUSTERS.bottom.y} ${CORE.x} ${CORE.y}`,
} as const;

// ─── Ambient Particles ────────────────────────────────────────
function AmbientParticles({ mx, my }: { mx: MotionValue<number>; my: MotionValue<number> }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const pts = useMemo(
    () =>
      Array.from({ length: 250 }, () => ({
        x: Math.random() * 1200,
        y: Math.random() * 800,
        vx: (Math.random() - 0.5) * 0.06,
        vy: (Math.random() - 0.5) * 0.06,
        r: Math.random() * 1.5 + 0.5,
        o: Math.random() * 0.06 + 0.02,
      })),
    [],
  );

  useAnimationFrame(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;

    const mxx = mx.get();
    const myy = my.get();
    pts.forEach((p) => {
      const dx = mxx - p.x;
      const dy = myy - p.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 150) {
        p.vx -= dx * 0.00002;
        p.vy -= dy * 0.00002;
      }
      p.vx += (Math.random() - 0.5) * 0.0006;
      p.vy += (Math.random() - 0.5) * 0.0006;
      p.vx *= 0.99;
      p.vy *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = c.width;
      if (p.x > c.width) p.x = 0;
      if (p.y < 0) p.y = c.height;
      if (p.y > c.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${p.o})`;
      ctx.fill();
    });
  });

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" />;
}

// ─── Glass Chip ───────────────────────────────────────────────
function Chip({ label, delay }: { label: string; delay: number }) {
  return (
    <motion.span
      className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/70 backdrop-blur-xl transition-colors duration-500 hover:border-white/20 hover:text-white"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {label}
    </motion.span>
  );
}

// ─── Cluster ──────────────────────────────────────────────────
function Cluster({
  title,
  items,
  side,
  breathe,
}: {
  title: string;
  items: string[];
  side: "top" | "left" | "right" | "bottom";
  breathe: number;
}) {
  const isRow = side === "top" || side === "bottom";
  const posStyles: React.CSSProperties =
    side === "top"
      ? { left: "50%", top: "11%", transform: "translateX(-50%)" }
      : side === "bottom"
        ? { left: "50%", bottom: "11%", transform: "translateX(-50%)" }
        : side === "left"
          ? { left: "5%", top: "50%", transform: "translateY(-50%)" }
          : { right: "5%", top: "50%", transform: "translateY(-50%)" };

  const align = side === "right" ? "items-end" : "items-center";

  return (
    <motion.div
      className={`absolute z-10 flex flex-col gap-3 ${align}`}
      style={posStyles}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: breathe, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/30">
        {title}
      </span>
      <div className={`flex ${isRow ? "flex-row" : "flex-col"} gap-2`}>
        {items.map((item, i) => (
          <Chip key={item} label={item} delay={0.05 * i} />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Connectors ───────────────────────────────────────────────
function Connectors() {
  const links: { key: string; path: string }[] = [
    { key: "top", path: PATHS.top },
    { key: "left", path: PATHS.left },
    { key: "right", path: PATHS.right },
    { key: "bottom", path: PATHS.bottom },
  ];

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${V.w} ${V.h}`}
      aria-hidden
      preserveAspectRatio="none"
    >
      {links.map(({ key, path }) => (
        <g key={key}>
          <path d={path} stroke="rgba(255,255,255,0.06)" strokeWidth={0.5} fill="none" />
          {[0, 1].map((i) => (
            <motion.circle
              key={i}
              r="1.5"
              fill="#60a5fa"
              style={{ offsetPath: `path("${path}")` }}
              animate={{ offsetDistance: ["0%", "100%"] }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.8,
              }}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

// ─── Main IntelligenceCore ────────────────────────────────────
export default function IntelligenceCore() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  const coreX = useMotionValue(0);
  const coreY = useMotionValue(0);

  useAnimationFrame(() => {
    const mx = mouseX.get();
    const my = mouseY.get();
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    coreX.set((mx - cx) * 0.01);
    coreY.set((my - cy) * 0.01);
  });

  const handleMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mouseX.set(e.clientX - r.left);
    mouseY.set(e.clientY - r.top);
  };

  const handleLeave = () => {
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative h-[700px] overflow-hidden rounded-[40px] border border-white/10 bg-[#05070a]/80 backdrop-blur-xl"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_60%)]" />
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <AmbientParticles mx={springX} my={springY} />
      <Connectors />

      {/* Clusters */}
      <Cluster
        title="Business Systems"
        side="top"
        items={["CRM", "ERP", "Billing"]}
        breathe={6}
      />
      <Cluster
        title="Knowledge Sources"
        side="left"
        items={["Slack", "Notion", "GitHub", "Drive"]}
        breathe={8}
      />
      <Cluster
        title="Actions"
        side="right"
        items={["Workflow", "Reports", "Tasks", "API"]}
        breathe={7}
      />
      <Cluster
        title="Reasoning"
        side="bottom"
        items={["Search", "Memory", "Agents"]}
        breathe={9}
      />

      {/* Central Core */}
      <motion.div
        className="absolute left-1/2 top-[46%] z-10 -translate-x-1/2 -translate-y-1/2"
        style={{ x: coreX, y: coreY }}
      >
        <motion.div
          animate={{
            scale: [1, 1.04, 1],
            boxShadow: [
              "0 0 60px rgba(59,130,246,0.15)",
              "0 0 140px rgba(59,130,246,0.3)",
              "0 0 60px rgba(59,130,246,0.15)",
            ],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-36 w-36 items-center justify-center rounded-full border border-white/10 bg-gradient-to-b from-slate-900 to-black"
        >
          <Brain size={42} className="text-blue-400" />
        </motion.div>

        {/* Labels */}
        <div className="absolute left-1/2 top-full mt-7 -translate-x-1/2 whitespace-nowrap text-center">
          <div className="text-xs uppercase tracking-[0.35em] text-blue-400/80">
            Corporate Intelligence Layer
          </div>
          <div className="mt-2 text-3xl font-semibold text-white">
            BrainersOS
          </div>
        </div>
      </motion.div>
    </div>
  );
}
