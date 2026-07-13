"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, type MotionValue } from "framer-motion";
import { ArrowRight, ArrowUpRight, BarChart3 } from "lucide-react";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";

const KnowledgeSphere = dynamic(() => import("../three/KnowledgeSphere"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_60%_50%,rgba(74,108,247,0.08),transparent_70%)]" />
  ),
});

const EASE = [0.22, 1, 0.36, 1] as const;

function StatCard({
  icon,
  tag,
  value,
  label,
  className,
  delay,
  scrollTransform,
}: {
  icon: React.ReactNode;
  tag: string;
  value: string;
  label: string;
  className: string;
  delay: number;
  scrollTransform?: MotionValue<number>;
}) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay, ease: EASE }}
      style={{ y: scrollTransform }}
      className={`absolute z-20 ${className}`}
    >
      <motion.div
        animate={{ y: [0, -9, 0] }}
        whileHover={{ y: -6, scale: 1.03 }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        data-cursor="hover"
        className="group relative w-[13.5rem] sm:w-60 p-[1px] overflow-hidden rounded-2xl transition-[box-shadow] duration-500 hover:shadow-[0_0_36px_rgba(61,123,255,0.25)]"
      >
        {/* Spinning Gradient Border Layer */}
        <div className="absolute inset-[-150%] animate-[gradient-spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_30%,#3d7bff_50%,transparent_70%,#35d6ff_90%,transparent_100%)] opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Inner Card Frame */}
        <div className="relative z-10 w-full h-full rounded-[15px] bg-[#090b10]/95 p-4 sm:p-5 backdrop-blur-xl">
          {/* Dynamic Glass Glare Overlay */}
          {hovered && (
            <div
              className="pointer-events-none absolute inset-0 z-0 rounded-[15px] opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle 140px at ${coords.x}px ${coords.y}px, rgba(61, 123, 255, 0.12), transparent 70%)`,
              }}
            />
          )}

          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white/90 transition-colors duration-500 group-hover:border-[#3d7bff]/40 group-hover:text-[#8fd0ff]">
                {icon}
              </span>
              <ArrowUpRight
                size={16}
                className="text-white/40 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#35d6ff]"
              />
            </div>
            <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-electric/80">
              {tag}
            </p>
            <p className="mt-1 font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
              {value}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-white/60">{label}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Magnetic Wrapper Component for Hero CTAs
function MagneticWrapper({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.6 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.28);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.28);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

const PARTNER_LOGOS = [
  {
    name: "Stripe",
    svg: (
      <svg className="h-5 fill-current" viewBox="0 0 80 32" aria-hidden="true">
        <path d="M72.9 14.8c0-3.3-1.6-4.9-4.8-4.9-3.2 0-5 2.1-5 5.5 0 3.7 2.1 5.3 5.4 5.3 1.5 0 2.9-.3 3.9-.9v-2.6c-1 .5-2.1.8-3.3.8-1.5 0-2.4-.6-2.5-1.9h9.2c.1-.4.1-.9.1-1.3zm-6.3-1.3c0-1.1.7-1.8 1.6-1.8.9 0 1.5.7 1.5 1.8h-3.1zm-8.8 6.9c-.8.8-1.7 1-2.7 1-1.7 0-2.7-1.1-2.7-3.1V6.9h-3.2v9c0 3.5 1.9 5.2 4.9 5.2 1.6 0 2.9-.6 3.7-1.5v1.2h3.2V9.9H57.8v10.5zm-15.3-2.1c0-2-1.2-3.1-3.3-3.1-1.3 0-2.6.5-3.3 1.1v-5c.9-.3 1.9-.5 2.8-.5 3 0 5 1.5 5 4.9v8.4h3.2v-11c0-3.4-2-4.9-5.1-4.9-1.5 0-2.9.4-3.9 1.1l-.3-.8H32.8v15.6h3.2V18.3zm-10.2-3.5c0-3.3-1.6-4.9-4.8-4.9-3.2 0-5 2.1-5 5.5 0 3.7 2.1 5.3 5.4 5.3 1.5 0 2.9-.3 3.9-.9v-2.6c-1 .5-2.1.8-3.3.8-1.5 0-2.4-.6-2.5-1.9h9.2c.1-.4.1-.9.1-1.3zm-6.3-1.3c0-1.1.7-1.8 1.6-1.8.9 0 1.5.7 1.5 1.8H26zm-7.6-6.6c-1.1-.3-2.8-.5-4.3-.5-3.2 0-5.3 1.5-5.3 4.3 0 4.5 6.1 3.8 6.1 5.8 0 .8-.8 1.2-1.8 1.2-1.7 0-3.4-.6-4.5-1.3v3c1.2.5 2.9.8 4.5.8 3.3 0 5.4-1.5 5.4-4.4.1-4.7-6-3.9-6-5.8 0-.7.7-1.1 1.7-1.1 1.4 0 2.9.4 3.9.9V6.9z" />
      </svg>
    ),
  },
  {
    name: "Vercel",
    svg: (
      <svg className="h-[17px] fill-current" viewBox="0 0 116 26" aria-hidden="true">
        <path d="M12.2 3.5L24.4 24H0L12.2 3.5zm27.8 7.3h3.4l-5.6 13h-3.3l-5.5-13h3.4l3.8 9.3 3.8-9.3zm17.9 4.3H49v2.7h10v2.8H45.8V10.8h13.1v2.7h-10v2.6h9v2.2zM69.8 13c1.6 0 2.6.8 2.6 2.2V24H69v-8.2c0-.7-.4-1-1.1-1-.8 0-1.3.5-1.5 1.1V24H63V10.8h3.3v1.8c.4-.8 1.3-1.6 2.5-1.6zM83.8 13c1.8 0 2.8 1 2.8 2.8V24H83.3v-7.8c0-.9-.4-1.3-1.1-1.3-.7 0-1.2.4-1.4 1.1V24H77.5v-7.8c0-.9-.4-1.3-1.1-1.3-.7 0-1.2.4-1.4 1.1V24H71.7V10.8h3.3v1.7c.4-.8 1.2-1.5 2.3-1.5 1.3 0 2.1.6 2.4 1.5.6-1 1.5-1.5 2.8-1.5zM99.6 13c2.4 0 3.7 1.4 3.7 3.5V24h-3.3v-7.2c0-1-.6-1.5-1.5-1.5s-1.5.5-1.7 1.2V24H93.5v-7.2c0-1-.6-1.5-1.5-1.5s-1.5.5-1.7 1.2V24h-3.3V10.8h3.3v1.7c.4-.8 1.2-1.5 2.3-1.5 1.3 0 2.1.6 2.4 1.5.6-1 1.5-1.5 2.8-1.5z" />
      </svg>
    ),
  },
  {
    name: "Linear",
    svg: (
      <svg className="h-[18px] fill-current" viewBox="0 0 94 24" aria-hidden="true">
        <path d="M12.5 1.5a10 10 0 1010 10 10 10 0 00-10-10zm0 17a7 7 0 117-7 7 7 0 01-7 7zm18.3-14h3.2V21h-3.2zm11 0h3.2v2.4h-3.2zm0 4.8h3.2V21h-3.2zm16.8.8c.8-.8 1.8-1.3 3-1.3 2.2 0 3.5 1.3 3.5 3.5V21h-3.2v-8.8c0-1-.5-1.5-1.5-1.5s-1.5.5-1.8 1.2V21h-3.2V10.1h3v1.6zM80.2 13c1.7 0 2.6.8 2.6 2.2V21h-3.2v-7.8c0-.7-.4-1.1-1.1-1.1-.8 0-1.3.5-1.5 1.1V21h-3.2V10.1h3v1.6c.4-.8 1.3-1.6 2.4-1.6zm-10.4 3.5v1.2H73v-5c.9-.3 1.9-.5 2.8-.5 3 0 5 1.5 5 4.9V21h-3.2V18.3z" />
      </svg>
    ),
  },
  {
    name: "Framer",
    svg: (
      <svg className="h-[19px] fill-current" viewBox="0 0 96 28" aria-hidden="true">
        <path d="M0 0h12v12H0zm0 12h12v12L0 36V12zM28 10h12v3h-12V10zm0 6h9v3h-9v12h-3v-27h15v3h-12v9zM55.8 13c1.6 0 2.6.8 2.6 2.2V28h-3.2v-8.2c0-.7-.4-1-1.1-1-.8 0-1.3.5-1.5 1.1V28h-3.2V14.8h3.2v1.8c.4-.8 1.3-1.6 2.5-1.6zm13.8 0c1.8 0 2.8 1 2.8 2.8V28h-3.2v-7.8c0-.9-.4-1.3-1.1-1.3-.7 0-1.2.4-1.4 1.1V28h-3.2v-7.8c0-.9-.4-1.3-1.1-1.3-.7 0-1.2.4-1.4 1.1V28H61V14.8h3.2v1.7c.4-.8 1.2-1.5 2.3-1.5 1.3 0 2.1.6 2.4 1.5.6-1 1.5-1.5 2.8-1.5z" />
      </svg>
    ),
  },
  {
    name: "Supabase",
    svg: (
      <svg className="h-[18px] fill-current" viewBox="0 0 114 24" aria-hidden="true">
        <path d="M0 12L12 0v8.4h12L12 24v-8.4zM40.2 13c1.6 0 2.6.8 2.6 2.2V24h-3.2v-8.2c0-.7-.4-1-1.1-1-.8 0-1.3.5-1.5 1.1V24H33.8v-11h3.2v1.8c.4-.8 1.3-1.6 2.5-1.6zm13.8 0c1.8 0 2.8 1 2.8 2.8V24h-3.2v-7.8c0-.9-.4-1.3-1.1-1.3-.7 0-1.2.4-1.4 1.1V24h-3.2v-7.8c0-.9-.4-1.3-1.1-1.3-.7 0-1.2.4-1.4 1.1V24H49v-11h3.2v1.7c.4-.8 1.2-1.5 2.3-1.5 1.3 0 2.1.6 2.4 1.5.6-1 1.5-1.5 2.8-1.5z" />
      </svg>
    ),
  },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Scroll transforms for parallax depth
  const orbY = useTransform(scrollY, [0, 800], [0, 160]);
  const card2Y = useTransform(scrollY, [0, 800], [0, -100]);
  const textY = useTransform(scrollY, [0, 800], [0, 45]);

  // Mouse parallax for background image
  const bgX = useMotionValue(0);
  const bgY = useMotionValue(0);
  const springBgX = useSpring(bgX, { stiffness: 40, damping: 25 });
  const springBgY = useSpring(bgY, { stiffness: 40, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    bgX.set((x - 0.5) * 24);
    bgY.set((y - 0.5) * 16);
  };

  const handleMouseLeave = () => {
    bgX.set(0);
    bgY.set(0);
  };

  const lineVariants = {
    hidden: { y: "100%" },
    visible: { y: 0 },
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/hero.jpg)",
          x: springBgX,
          y: springBgY,
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-holo/92 via-holo/88 to-holo/92" />
      <div className="relative mx-auto flex min-h-svh max-w-7xl flex-col justify-center px-6 pb-12 pt-28 lg:px-10">
        {/* 3D glass orb — right side with parallax */}
        <motion.div
          style={{ y: orbY }}
          className="pointer-events-none absolute inset-y-0 right-[-14%] w-[80%] opacity-60 sm:opacity-100 lg:right-[-4%] lg:w-[54%]"
        >
          <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle,rgba(61,123,255,0.16),rgba(21,30,71,0.14)_45%,transparent_65%)]" />
          <div className="relative w-full h-full">
            <KnowledgeSphere />
            <StatCard
              icon={<BarChart3 size={16} />}
              tag="Modeled impact"
              value="-75%"
              label="Avg. time searching, saving 2.3h per employee weekly."
              className="absolute z-20 pointer-events-auto right-[5%] bottom-[19%]"
              delay={2.7}
              scrollTransform={card2Y}
            />
          </div>
        </motion.div>

        {/* Left column (Narrative) */}
        <motion.div style={{ y: textY }} className="relative z-10 max-w-2xl lg:pr-16">
          <motion.div
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 1.7, ease: EASE }}
            className="inline-block border-b border-white/10 pb-2 mb-6"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#a9c2ff]/90">
              THE DIGITAL SECOND BRAIN FOR YOUR COMPANY
            </span>
          </motion.div>

          {/* Masked Heading with staggered entry */}
          <h1 className="mt-7 font-display text-[clamp(1.65rem,4.5vw,3.2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-[#ffffff]">
            <span className="relative block overflow-hidden">
              <motion.span
                className="block whitespace-nowrap"
                initial="hidden"
                animate="visible"
                variants={lineVariants}
                transition={{ duration: 1.1, delay: 1.85, ease: EASE }}
              >
                Your Company&apos;s Memory.
              </motion.span>
            </span>
            <span className="relative block overflow-hidden mt-1 sm:mt-2">
              <motion.span
                className="block text-white whitespace-nowrap"
                initial="hidden"
                animate="visible"
                variants={lineVariants}
                transition={{ duration: 1.1, delay: 2.05, ease: EASE }}
              >
                Finally Connected.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 2.25, ease: EASE }}
            className="mt-8 max-w-sm text-[15px] leading-relaxed text-white/50"
          >
            Synax connects all your files, chats, and messages into one shared digital brain. It remembers everything, answers questions instantly, and helps your team work together.
          </motion.p>

          {/* Magnetic CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.45, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticWrapper>
              <a
                href="#cta"
                data-cursor="hover"
                className="electric-gradient group inline-flex min-h-[3.25rem] items-center gap-4 rounded-2xl py-1.5 pl-6 pr-1.5 shadow-[0_0_36px_rgba(61,123,255,0.35)] transition-all duration-300 hover:shadow-[0_0_52px_rgba(61,123,255,0.5)]"
              >
                <span className="text-[15px] font-semibold text-white">
                  Book Demo
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-[0.8rem] bg-holo text-neon transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={17} />
                </span>
              </a>
            </MagneticWrapper>

            <MagneticWrapper>
              <a
                href="/product"
                data-cursor="hover"
                className="group relative inline-flex min-h-[3.25rem] items-center rounded-2xl p-[1.25px] overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_36px_rgba(61,123,255,0.25)]"
              >
                {/* Border Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#3d7bff] to-[#35d6ff] transition-opacity duration-300 opacity-80 group-hover:opacity-100" />
                {/* Inner Button Content Mask */}
                <div className="relative z-10 flex min-h-[calc(3.25rem-2.5px)] items-center gap-3 rounded-[15px] bg-[#050505] py-[0.6rem] px-[1.725rem] text-[15px] font-medium text-white transition-colors duration-300 group-hover:bg-[#0d0d0d]/80">
                  <ArrowRight size={17} className="text-white/60 transition-colors duration-300 group-hover:text-neon" />
                  <span>Get Started Now</span>
                </div>
              </a>
            </MagneticWrapper>
          </motion.div>

          {/* desaturated silver/grey partner logos at the bottom of the narrative column */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.7 }}
            className="relative z-10 mt-16 border-t border-white/5 pt-8 w-full"
          >
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-text-muted/80">
              INTEGRATES SECURELY WITH YOUR ENTERPRISE STACK
            </span>
            <div className="relative w-full overflow-hidden mt-6 [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
              <div className="flex w-max gap-16 py-2 animate-marquee whitespace-nowrap">
                {[...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, idx) => (
                  <div
                    key={`${logo.name}-${idx}`}
                    className="flex items-center text-white/30 transition-colors duration-300 hover:text-white/70"
                    data-cursor="hover"
                    title={logo.name}
                  >
                    {logo.svg}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      {/* Drifting Background Glow Spheres */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            x: [-40, 40, -40],
            y: [-30, 30, -30],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[-10%] top-[10%] h-[38rem] w-[38rem] rounded-full bg-accent/8 blur-[130px]"
        />
        <motion.div
          animate={{
            x: [30, -30, 30],
            y: [40, -40, 40],
            scale: [1.1, 0.9, 1.1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-10%] bottom-[10%] h-[42rem] w-[42rem] rounded-full bg-violet/6 blur-[150px]"
        />
      </div>
    </section>
  );
}
