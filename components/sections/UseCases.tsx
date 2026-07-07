"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart, DollarSign, Scale, Factory, Landmark, GraduationCap, Fuel, Building2, Radio, ChevronDown } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { Stagger, StaggerItem } from "../ui/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

type UseCase = {
  icon: typeof Heart;
  label: string;
  color: string;
  description: string;
  workflows: string[];
};

const USE_CASES: UseCase[] = [
  {
    icon: Heart,
    label: "Healthcare",
    color: "#EC4899",
    description: "Connect patient records, clinical guidelines, research papers, and compliance documents into one intelligence layer.",
    workflows: ["Clinical decision support", "Policy compliance checks", "Patient record search", "Research synthesis"],
  },
  {
    icon: DollarSign,
    label: "Financial Services",
    color: "#18C964",
    description: "Unify regulations, risk policies, customer data, and market intelligence for instant, auditable answers.",
    workflows: ["Regulatory compliance", "Risk assessment", "KYC/AML screening", "Investment research"],
  },
  {
    icon: Scale,
    label: "Legal",
    color: "#7C5CFC",
    description: "Index case law, contracts, briefs, and firm knowledge — find precedents and clauses in seconds.",
    workflows: ["Contract analysis", "Case law research", "Due diligence", "Compliance review"],
  },
  {
    icon: Factory,
    label: "Manufacturing",
    color: "#F5A524",
    description: "Connect equipment manuals, safety protocols, supply chain data, and quality reports.",
    workflows: ["Equipment troubleshooting", "Safety compliance", "Supply chain intelligence", "Quality control"],
  },
  {
    icon: Landmark,
    label: "Government",
    color: "#3B82F6",
    description: "Classified and unclassified knowledge unified — with clearance-based access and full audit trails.",
    workflows: ["Policy analysis", "Intelligence fusion", "Citizen services", "Regulatory enforcement"],
  },
  {
    icon: GraduationCap,
    label: "Education",
    color: "#35D6FF",
    description: "Research papers, curriculum, student records, and institutional policies in one searchable brain.",
    workflows: ["Research discovery", "Curriculum planning", "Student support", "Accreditation compliance"],
  },
  {
    icon: Fuel,
    label: "Oil & Gas",
    color: "#3B82F6",
    description: "Technical documents, safety cases, well data, and regulatory filings connected and queryable.",
    workflows: ["Safety case management", "Technical document search", "Regulatory reporting", "Asset intelligence"],
  },
  {
    icon: Building2,
    label: "Insurance",
    color: "#7C5CFC",
    description: "Policies, claims data, actuarial models, and regulatory guidance unified for faster decisions.",
    workflows: ["Claims processing", "Policy underwriting", "Fraud detection", "Compliance monitoring"],
  },
  {
    icon: Radio,
    label: "Telecommunications",
    color: "#18C964",
    description: "Network documentation, customer data, regulatory filings, and technical knowledge in one graph.",
    workflows: ["Network troubleshooting", "Customer support", "Regulatory compliance", "Engineering knowledge"],
  },
];

export function UseCases() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden py-32 sm:py-44">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-full max-w-4xl -translate-x-1/2 hairline-gradient" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Use Cases"
          title="Built for every industry."
          subtitle="BrainersOS adapts to how your organization works — with industry-specific workflows out of the box."
        />

        <Stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
          {USE_CASES.map((uc) => {
            const open = expanded === uc.label;
            return (
              <StaggerItem key={uc.label}>
                <motion.div
                  layout
                  onClick={() => setExpanded(open ? null : uc.label)}
                  className="glass group cursor-pointer rounded-2xl border border-edge p-5 transition-all duration-500 hover:border-edge-strong hover:shadow-[0_0_30px_rgba(59,130,246,0.06)]"
                  data-cursor="hover"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ background: `${uc.color}15` }}
                    >
                      <uc.icon size={18} style={{ color: uc.color }} />
                    </div>
                    <span className="text-base font-semibold text-white">{uc.label}</span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{uc.description}</p>

                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 flex flex-wrap gap-2 border-t border-edge pt-4">
                          {uc.workflows.map((w) => (
                            <span
                              key={w}
                              className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-text-secondary"
                            >
                              {w}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-3 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={14} className="text-text-muted" />
                    </motion.div>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
