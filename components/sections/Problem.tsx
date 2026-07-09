"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LivingKnowledgeNetwork } from "../living-network/LivingKnowledgeNetwork";
import { GitMerge, Database, Search, RefreshCw, Shield, Plus } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;



const SOLUTION_STEPS = [
  {
    number: "01",
    title: "One Neural Fabric",
    description: "BrainersOS weaves your tools, documents, and conversations into a single, queryable intelligence layer. Nothing is lost. Everything connects.",
    icon: GitMerge,
  },
  {
    number: "02",
    title: "Memory That Persists",
    description: "Institutional knowledge doesn\u2019t walk out the door. Every decision, policy, and insight is captured and contextualized \u2014 forever.",
    icon: Database,
  },
  {
    number: "03",
    title: "Answers, Not Searches",
    description: "Stop hunting across 8 apps. Ask in plain English and get a synthesized answer drawn from your entire ecosystem \u2014 in seconds.",
    icon: Search,
  },
  {
    number: "04",
    title: "Always Current",
    description: "Every source updates in real-time. Your intelligence layer never goes stale with continuous indexing and live syncing.",
    icon: RefreshCw,
  },
  {
    number: "05",
    title: "Enterprise Guardrails",
    description: "Role-based access, audit trails, and compliance controls built into every query. Your data stays secure and governed.",
    icon: Shield,
  },
];

function SolutionStep({
  number,
  title,
  description,
  icon: Icon,
  isOpen,
  onToggle,
}: {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number }>;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="relative pl-[3.25rem] pb-8 last:pb-0">
      <div
        className="absolute left-[21px] top-3 bottom-0 w-px last:hidden"
        style={{ background: "rgba(0,0,0,0.06)" }}
      />
      <motion.div
        className={`absolute left-[17px] top-[11px] h-[10px] w-[10px] rounded-full border-[1.5px] transition-colors duration-500 ${
          isOpen
            ? "border-black bg-black"
            : "border-black/15 bg-transparent"
        }`}
        animate={{
          scale: isOpen ? [1, 1.4, 1] : 1,
        }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2, delay: 0.15 }}
            className="h-full w-full rounded-full bg-black"
          />
        )}
      </motion.div>
      <button
        onClick={onToggle}
        className="group flex w-full items-start justify-between text-left"
      >
        <div className="flex items-start gap-4">
          <span
            className={`mt-0.5 font-mono text-[10px] font-bold tracking-[0.15em] transition-colors duration-300 ${
              isOpen ? "text-black/50" : "text-black/25"
            }`}
          >
            {number}
          </span>
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
              isOpen
                ? "border-black/10 bg-white text-black/60 shadow-sm"
                : "border-black/[0.04] bg-transparent text-black/30 group-hover:border-black/10 group-hover:bg-white/80 group-hover:text-black/50"
            }`}
          >
            <Icon size={18} />
          </span>
          <span
            className={`mt-[7px] text-sm font-semibold leading-snug transition-colors duration-300 ${
              isOpen ? "text-black" : "text-black/60 group-hover:text-black/80"
            }`}
          >
            {title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className={`mt-[7px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            isOpen
              ? "border-black/15 bg-black/[0.03] text-black/40"
              : "border-black/[0.06] text-black/25 group-hover:border-black/15 group-hover:text-black/40"
          }`}
        >
          <Plus size={12} />
        </motion.div>
      </button>
      <motion.div
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.2, delay: isOpen ? 0.08 : 0 }}
        >
          <p className="ml-[3.75rem] mt-3 text-sm leading-relaxed text-black/50">
            {description}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Problem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [openIndex, setOpenIndex] = useState<number>(0);

  const bgY = useTransform(scrollY, [0, 800], [0, -30]);

  const lineVariants = {
    hidden: { y: "100%" },
    visible: { y: 0 },
  };

  return (
    <section
      ref={containerRef}
      data-bg="light"
      className="relative min-h-screen overflow-hidden bg-[#f3f4f6]"
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/problem-bg.jpg)", y: bgY }}
      />
      <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]" />

      <div className="pointer-events-none absolute left-1/4 top-1/3 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/[0.02] blur-[120px]" />
      <div className="pointer-events-none absolute right-[15%] top-[60%] h-[20rem] w-[20rem] rounded-full bg-accent/4 blur-[100px]" />

      <div className="relative z-10 mx-auto min-h-screen max-w-7xl px-6 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="flex flex-col items-center text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-black/50">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.9)]" />
            The problem
          </span>
          <h2 className="mt-6 max-w-4xl text-balance font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl text-black">
            <span className="relative overflow-hidden">
              <motion.span
                className="block"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={lineVariants}
                transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
              >
                Your company&apos;s intelligence is scattered across islands
              </motion.span>
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
            className="mt-5 max-w-lg text-balance text-base leading-relaxed text-black/50 sm:text-lg"
          >
            Every tool holds a fragment of the truth. None of them talk to each
            other — and every question becomes an expedition.
          </motion.p>
        </motion.div>

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative h-[420px] lg:h-[520px]"
          >
            <LivingKnowledgeNetwork />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          >
            <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.25em] text-black/30">
              The solution
            </span>

            <div className="relative">
              {SOLUTION_STEPS.map((step, i) => (
                <SolutionStep
                  key={step.number}
                  {...step}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? i : i)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
