"use client";

import { motion } from "framer-motion";

// High-fidelity desaturated SVG logos for modern tech brands
const LOGOS = [
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

export function TrustedBy() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 lg:px-10 py-16 sm:py-20 overflow-hidden">
      {/* Visual Alignment Lines */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-full max-w-7xl -translate-x-1/2 hairline-gradient opacity-40" />

      <div className="flex flex-col items-center gap-9">
        {/* Caption */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[10px] font-semibold uppercase tracking-[0.3em] text-text-muted/80 text-center"
        >
          INTEGRATES SECURELY WITH YOUR ENTERPRISE STACK
        </motion.span>

        {/* Infinite Loop Marquee Row */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.25 }}
          className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]"
        >
          {/* Double list to support seamless CSS loop wrapping */}
          <div className="flex w-max gap-16 py-2 animate-marquee whitespace-nowrap">
            {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, idx) => (
              <div
                key={`${logo.name}-${idx}`}
                className="flex items-center text-white/35 transition-colors duration-300 hover:text-white/80"
                data-cursor="hover"
              >
                {logo.svg}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
