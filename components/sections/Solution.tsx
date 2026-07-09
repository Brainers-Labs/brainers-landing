"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import IntelligenceCore from "../solution/IntelligenceCore";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Solution() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const bgY = useTransform(scrollY, [0, 800], [0, -40]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-32 sm:py-44">
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/solution-bg.jpg)", y: bgY }}
      />
      <div className="absolute inset-0 bg-holo/70 backdrop-blur-[2px]" />

      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-full max-w-7xl -translate-x-1/2 hairline-gradient opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="The Solution"
          title="Introducing BrainersOS."
          subtitle="Instead of disconnected islands... everything connects into a single corporate intelligence layer."
          align="right"
        />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mt-20"
        >
          <IntelligenceCore />
        </motion.div>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/8 blur-[120px]" />
    </section>
  );
}
