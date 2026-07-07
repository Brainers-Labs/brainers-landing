"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

const PLANS = [
  {
    name: "Starter",
    price: "Free",
    description: "For small teams exploring what's possible.",
    features: ["Up to 5 users", "1 knowledge graph", "Basic search", "Community support"],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Business",
    price: "Custom",
    description: "For growing organizations that need reliable intelligence.",
    features: [
      "Unlimited users",
      "Multiple knowledge graphs",
      "Advanced reasoning",
      "SSO & RBAC",
      "Audit trails",
      "Priority support",
    ],
    cta: "Book Demo",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For regulated industries and large-scale deployments.",
    features: [
      "Everything in Business",
      "On-premises deployment",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantee",
      "Compliance certification",
    ],
    cta: "Contact Sales",
    featured: false,
  },
];

export function PricingPreview() {
  return (
    <section className="relative overflow-hidden py-32 sm:py-44">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-full max-w-4xl -translate-x-1/2 hairline-gradient" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Pricing Preview"
          title="Simple, transparent pricing."
          subtitle="Start free. Scale as you grow. Enterprise-grade when you need it."
        />

        <Reveal className="mt-16" y={40}>
          <div className="grid gap-6 lg:grid-cols-3">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
                className={`relative flex flex-col rounded-3xl border p-7 transition-all duration-500 hover:-translate-y-1 ${
                  plan.featured
                    ? "border-accent/40 bg-gradient-to-b from-accent/8 to-transparent shadow-[0_0_50px_rgba(59,130,246,0.12)]"
                    : "border-edge glass"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="electric-gradient rounded-full px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white">
                      Most Popular
                    </span>
                  </div>
                )}

                <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                <p className="mt-1 text-3xl font-bold tracking-tight text-white">
                  {plan.price}
                </p>
                <p className="mt-2 text-sm text-text-muted">{plan.description}</p>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-text-secondary">
                      <Check size={14} className="shrink-0 text-success" />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#cta"
                  data-cursor="hover"
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all duration-300 ${
                    plan.featured
                      ? "electric-gradient text-white shadow-[0_0_30px_rgba(61,123,255,0.3)] hover:shadow-[0_0_45px_rgba(61,123,255,0.45)]"
                      : "glass border border-edge text-white hover:border-edge-strong"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight size={14} />
                </a>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
