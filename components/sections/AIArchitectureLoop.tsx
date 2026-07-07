"use client";

import { motion } from "framer-motion";
import { HardDrive, Cog, Target, CheckCircle, Eye, BookOpen, Network, Zap, ShieldCheck, ScrollText } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

const LOOPS = [
  { icon: HardDrive, label: "Memory", color: "#3B82F6" },
  { icon: Cog, label: "Reasoning", color: "#7C5CFC" },
  { icon: Target, label: "Planning", color: "#35D6FF" },
  { icon: CheckCircle, label: "Decision", color: "#18C964" },
  { icon: Eye, label: "Reflection", color: "#F5A524" },
  { icon: BookOpen, label: "Learning", color: "#EC4899" },
  { icon: Network, label: "Knowledge Graph", color: "#3B82F6" },
  { icon: Zap, label: "Events", color: "#7C5CFC" },
  { icon: ShieldCheck, label: "Trust", color: "#35D6FF" },
  { icon: ScrollText, label: "Governance", color: "#18C964" },
];

export function AIArchitectureLoop() {
  return (
    <section className="relative overflow-hidden py-32 sm:py-44">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-full max-w-4xl -translate-x-1/2 hairline-gradient" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="AI Architecture"
          title="The intelligence loop."
          subtitle="Memory, reasoning, planning, decisions, reflection, learning — continuously cycling through the knowledge graph, events, trust, and governance."
        />

        <Reveal className="mt-16" y={48}>
          <div className="relative mx-auto flex max-w-4xl flex-col items-center">
            {/* Ambient glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[120px]" />

            <div className="relative flex flex-wrap justify-center gap-6">
              {LOOPS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                  animate={
                    i === 0
                      ? {
                          y: [0, -8, 0],
                          boxShadow: [
                            `0 0 0px ${item.color}00`,
                            `0 0 30px ${item.color}40`,
                            `0 0 0px ${item.color}00`,
                          ],
                        }
                      : {}
                  }
                  className="glass group flex items-center gap-3 rounded-2xl border border-edge px-5 py-3.5 transition-all duration-500 hover:border-edge-strong"
                  data-cursor="hover"
                  style={{
                    animationDelay: `${i * 0.6}s`,
                  }}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300"
                    style={{ background: `${item.color}15` }}
                  >
                    <item.icon size={18} style={{ color: item.color }} />
                  </div>
                  <span className="text-sm font-semibold text-white">{item.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Loop arrow */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-10 flex items-center gap-3 text-xs text-text-muted"
            >
              <span className="h-px w-16 bg-gradient-to-l from-accent/40 to-transparent" />
              <span className="flex items-center gap-2 font-medium uppercase tracking-[0.2em]">
                <motion.svg width="16" height="16" viewBox="0 0 16 16" fill="none" animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
                  <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8 1.5L10 4H6L8 1.5Z" fill="currentColor" />
                </motion.svg>
                Looping continuously
              </span>
              <span className="h-px w-16 bg-gradient-to-r from-accent/40 to-transparent" />
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
