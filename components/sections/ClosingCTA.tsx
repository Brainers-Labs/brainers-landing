"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../ui/Reveal";

export function ClosingCTA() {
  return (
    <section id="cta" className="relative overflow-hidden py-32 sm:py-44">
      {/* full-section background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.12]"
        style={{ backgroundImage: "url('/cta-bg.jpg')" }}
      />

      {/* ambient page glow */}
      <div className="pointer-events-none absolute left-[-15%] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-violet/10 blur-[140px]" />

      <div className="pointer-events-none absolute right-[-10%] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-accent/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="
            relative
            overflow-hidden
            rounded-[32px]
            border border-white/10
            min-h-[440px]
            bg-[#03060d]
            flex
            items-center
            justify-center
            px-8
            py-20
          "
        >
          {/* left gradient — diagonal violet/orange */}
          <div
            className="pointer-events-none absolute bottom-4 left-4 h-[300px] w-[300px] opacity-30"
            style={{
              background: "linear-gradient(45deg, rgba(124,92,252,0.9) 0%, rgba(255,111,0,0.7) 45%, transparent 75%)",
              filter: "blur(80px)",
            }}
          />

          {/* right gradient — diagonal blue */}
          <div
            className="pointer-events-none absolute right-4 top-4 h-[320px] w-[320px] opacity-30"
            style={{
              background: "linear-gradient(225deg, rgba(59,130,246,0.95) 0%, rgba(59,130,246,0.5) 40%, transparent 75%)",
              filter: "blur(80px)",
            }}
          />

          {/* border glow */}
          <div className="absolute inset-0 rounded-[32px] border border-accent/20 shadow-[0_0_80px_rgba(59,130,246,0.12)]" />

          {/* dot pattern bottom-left */}
          <div
            className="absolute bottom-0 left-0 h-52 w-52 opacity-35"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,.8) 1px, transparent 1px)",
              backgroundSize: "6px 6px",
              maskImage: "linear-gradient(to top right, black 35%, transparent)",
            }}
          />

          {/* dot pattern top-right */}
          <div
            className="absolute right-0 top-0 h-52 w-52 opacity-35"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,.8) 1px, transparent 1px)",
              backgroundSize: "6px 6px",
              maskImage: "linear-gradient(to bottom left, black 35%, transparent)",
            }}
          />

          {/* scan line */}
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent"
          />

          {/* content */}
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <Reveal>
              <span className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-text-muted">
                Ready to see Synax in action?
              </span>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="mt-8 text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
                Turn your organization into
                <br />
                <span className="gradient-text"> an intelligent enterprise.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-text-secondary">
                See Synax working on your own
                documents, policies, and knowledge.
                A 30-minute demo is all it takes to
                understand what your organization has
                been missing.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="mailto:hello@brainerslabs.com?subject=Synax%20Demo%20Request"
                  className="electric-gradient group inline-flex items-center gap-3 rounded-2xl px-8 py-4 text-sm font-semibold text-white shadow-[0_0_40px_rgba(59,130,246,.35)] transition-all duration-300 hover:scale-[1.03]"
                >
                  Request Demo
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>

                <a
                  href="mailto:hello@brainerslabs.com?subject=Join%20Synax%20Waitlist"
                  className="inline-flex items-center rounded-2xl border border-white/15 bg-white/[0.02] px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:border-white/30 hover:bg-white/[0.04]"
                >
                  Join Waitlist
                </a>
              </div>
            </Reveal>
          </div>
        </motion.div>
      </div>
    </section>
  );
}