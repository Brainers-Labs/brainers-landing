"use client";

import {
  Building2,
  ShieldCheck,
  Bot,
  Network,
  Workflow,
  Zap,
  Puzzle,
  Blocks,
  Code2,
  ScrollText,
  Eye,
  HardDrive,
  FileSpreadsheet,
  Cpu,
} from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Stagger, StaggerItem } from "../ui/Reveal";

const FEATURES = [
  { icon: Building2, label: "Multi-tenancy", color: "#3B82F6" },
  { icon: ShieldCheck, label: "RBAC", color: "#7C5CFC" },
  { icon: Bot, label: "Digital Twin", color: "#35D6FF" },
  { icon: Network, label: "Temporal Graph", color: "#18C964" },
  { icon: Workflow, label: "Workflow Engine", color: "#F5A524" },
  { icon: Zap, label: "Event Sourcing", color: "#EC4899" },
  { icon: Puzzle, label: "MCP", color: "#3B82F6" },
  { icon: Blocks, label: "Plugin Platform", color: "#7C5CFC" },
  { icon: Code2, label: "SDKs", color: "#35D6FF" },
  { icon: ScrollText, label: "Governance", color: "#18C964" },
  { icon: Eye, label: "AI Observability", color: "#F5A524" },
  { icon: HardDrive, label: "Memory Engine", color: "#EC4899" },
  { icon: FileSpreadsheet, label: "Policy Engine", color: "#3B82F6" },
  { icon: Cpu, label: "Distributed Runtime", color: "#7C5CFC" },
];

export function EnterpriseFeatures() {
  return (
    <section className="relative overflow-hidden py-32 sm:py-44">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-full max-w-4xl -translate-x-1/2 hairline-gradient" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Enterprise Features"
          title="Built for the enterprise."
          subtitle="Everything your organization needs to deploy AI you can trust — at scale."
        />

        <Stagger className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" gap={0.06}>
          {FEATURES.map((f) => (
            <StaggerItem key={f.label}>
              <div
                className="glass group flex items-center gap-3 rounded-2xl border border-edge p-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-edge-strong hover:shadow-[0_0_30px_rgba(59,130,246,0.08)]"
                data-cursor="hover"
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300"
                  style={{ background: `${f.color}15` }}
                >
                  <f.icon size={18} style={{ color: f.color }} />
                </div>
                <span className="text-sm font-medium text-white/85 transition-colors duration-300 group-hover:text-white">
                  {f.label}
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
