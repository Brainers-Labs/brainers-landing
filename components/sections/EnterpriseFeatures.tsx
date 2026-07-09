"use client";

import { useState } from "react";
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
} from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Stagger, StaggerItem } from "../ui/Reveal";

const FEATURES = [
  { icon: Building2, label: "Multi-tenancy", color: "#3B82F6", desc: "Enterprise isolation at the database and memory layer." },
  { icon: ShieldCheck, label: "RBAC & Permissions", color: "#7C5CFC", desc: "Inherits source credentials. Nobody sees what they shouldn't." },
  { icon: Bot, label: "Digital Twin", color: "#35D6FF", desc: "Simulate operational logic and policy consequences dynamically." },
  { icon: Network, label: "Temporal Graph", color: "#18C964", desc: "Tracks facts and relationships as they evolve over time." },
  { icon: Workflow, label: "Workflow Engine", color: "#F5A524", desc: "Triggers actions and notifications based on document updates." },
  { icon: Zap, label: "Event Sourcing", color: "#EC4899", desc: "Complete event logs for compliance and audit auditing." },
  { icon: Puzzle, label: "MCP Protocol", color: "#3B82F6", desc: "Model Context Protocol native support for quick connector hooks." },
  { icon: Blocks, label: "Plugin Platform", color: "#7C5CFC", desc: "Build private enterprise plugins with simple script APIs." },
  { icon: Code2, label: "Developer SDKs", color: "#35D6FF", desc: "Inject BrainersOS querying directly into internal tools." },
  { icon: ScrollText, label: "Governance Engine", color: "#18C964", desc: "Automate policy adherence checks on all actions." },
  { icon: Eye, label: "AI Observability", color: "#F5A524", desc: "Real-time query tracing, match scores, and path analysis." },
  { icon: HardDrive, label: "Cognitive Memory", color: "#EC4899", desc: "Maintains conversational context across departments." },
];

function FeatureCell({
  feature,
}: {
  feature: typeof FEATURES[0];
}) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const Icon = feature.icon;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col justify-between overflow-hidden bg-[#05070a] p-6 transition-colors duration-300 hover:bg-[#07090f]/70 border-r border-b border-edge"
      style={{ minHeight: "170px" }}
      data-cursor="hover"
    >
      {/* Repeating Dot Grid inside the cell (Matches Tailwind style screenshot) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] transition-opacity duration-300 group-hover:opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(white 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />

      {/* Dynamic Hover Glow spotlight in the cell corner */}
      {hovered && (
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 120px at ${coords.x}px ${coords.y}px, ${feature.color}15, transparent 70%)`,
          }}
        />
      )}

      {/* Top section: Icon and dynamic border indicator */}
      <div className="relative z-10 flex items-center justify-between">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-edge bg-white/[0.01] transition-all duration-300"
          style={{ borderColor: hovered ? `${feature.color}40` : "" }}
        >
          <Icon size={16} style={{ color: hovered ? feature.color : "rgba(255,255,255,0.4)" }} className="transition-colors duration-300" />
        </div>
      </div>

      {/* Bottom section: Content */}
      <div className="relative z-10 mt-6">
        <h3 className="text-sm font-semibold text-white/90 transition-colors duration-300 group-hover:text-white">
          {feature.label}
        </h3>
        <p className="mt-1 text-[11px] leading-relaxed text-text-secondary">
          {feature.desc}
        </p>
      </div>
    </div>
  );
}

export function EnterpriseFeatures() {
  return (
    <section className="relative overflow-hidden py-32 sm:py-44">
      {/* Global section dividers */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-full max-w-7xl -translate-x-1/2 hairline-gradient opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Enterprise Features"
          title="Built for the enterprise."
          subtitle="Everything your organization needs to deploy AI you can trust — at scale."
        />

        {/* Tailwind CSS website style closed-border Bento Grid (gap-0) */}
        <Stagger className="mt-16 overflow-hidden rounded-2xl border-t border-l border-edge bg-[#05070a]" gap={0.03}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0">
            {FEATURES.map((f) => (
              <StaggerItem key={f.label}>
                <FeatureCell feature={f} />
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      </div>
    </section>
  );
}
