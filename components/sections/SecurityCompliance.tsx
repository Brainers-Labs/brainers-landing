"use client";

import {
  Lock,
  ScrollText,
  ShieldCheck,
  Fingerprint,
  FileSpreadsheet,
  Globe,
  Siren,
  CheckCircle,
  GitBranch,
  Landmark,
  Heart,
  Building2,
} from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";

const ITEMS = [
  { icon: Lock, label: "End-to-end encryption", color: "#3B82F6" },
  { icon: ScrollText, label: "Audit logs", color: "#7C5CFC" },
  { icon: ShieldCheck, label: "RBAC", color: "#35D6FF" },
  { icon: Fingerprint, label: "ABAC", color: "#18C964" },
  { icon: FileSpreadsheet, label: "Policy Engine", color: "#F5A524" },
  { icon: Globe, label: "Data residency", color: "#EC4899" },
  { icon: Siren, label: "PII detection", color: "#3B82F6" },
  { icon: CheckCircle, label: "Trust scoring", color: "#7C5CFC" },
  { icon: GitBranch, label: "Grounding audits", color: "#35D6FF" },
  { icon: Landmark, label: "NDPA", color: "#18C964" },
  { icon: Heart, label: "GDPR", color: "#F5A524" },
  { icon: Building2, label: "HIPAA-ready architecture", color: "#EC4899" },
  { icon: ShieldCheck, label: "SOC 2 roadmap", color: "#3B82F6" },
];

export function SecurityCompliance() {
  return (
    <section className="relative overflow-hidden py-32 sm:py-44">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-full max-w-4xl -translate-x-1/2 hairline-gradient" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Security & Compliance"
          title="Enterprise-ready, from day one."
          subtitle="Your data is your most valuable asset. We treat it that way."
        />

        <div className="mt-16 flex flex-wrap justify-center gap-6">
          {ITEMS.map((item) => (
            <div
              key={item.label}
              className="glass group flex items-center gap-3 rounded-2xl border border-edge px-5 py-3.5 transition-all duration-500 hover:-translate-y-0.5 hover:border-edge-strong hover:shadow-[0_0_30px_rgba(59,130,246,0.08)]"
              data-cursor="hover"
            >
              <item.icon size={17} style={{ color: item.color }} />
              <span className="text-sm font-medium text-white/85 transition-colors duration-300 group-hover:text-white">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
