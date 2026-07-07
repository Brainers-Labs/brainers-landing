"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Reveal } from "../ui/Reveal";

export function ClosingCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const glow = useTransform(scrollYProgress, [0, 1], [0, 0.9]);

  return (
    <section ref={ref} className="relative overflow-hidden py-32 sm:py-44">
      <motion.div
        style={{ opacity: glow }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_75%,rgba(59,130,246,0.22),rgba(124,92,252,0.1)_45%,transparent_75%)]"
      />

      <div className="relative mx-auto flex min-h-[70svh] max-w-7xl flex-col items-center justify-center px-6 lg:px-10 py-20 text-center">
        <Reveal>
          <h2 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Turn your organization into
            <br />
            <span className="gradient-text text-glow">an intelligent enterprise.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-text-secondary">
            See BrainersOS working on your own documents. A 30-minute demo is all
            it takes to understand what your organization has been missing.
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="mailto:hello@brainerslabs.com?subject=BrainersOS%20Demo%20Request"
              data-cursor="hover"
              className="electric-gradient group inline-flex min-h-[3.5rem] items-center gap-3 rounded-2xl px-8 py-3.5 text-[15px] font-semibold text-white shadow-[0_0_40px_rgba(61,123,255,0.35)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(61,123,255,0.5)]"
            >
              Request Demo
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="mailto:hello@brainerslabs.com?subject=BrainersOS%20Waitlist"
              data-cursor="hover"
              className="group inline-flex min-h-[3.5rem] items-center gap-3 rounded-2xl border border-white/15 px-8 py-3.5 text-[15px] font-medium text-white transition-all duration-300 hover:border-white/30 hover:bg-white/[0.04]"
            >
              Join Waitlist
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
