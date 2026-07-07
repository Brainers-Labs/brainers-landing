"use client";

import {
  HardDrive,
  Cog,
  Bot,
  Building2,
  Network,
  ShieldCheck,
  BrainCircuit,
  GitBranch,
  Search,
  FileText,
  Link2,
  Users,
  FileSpreadsheet,
  FolderKanban,
  Target,
  Activity,
  Zap,
  Repeat,
  Eye,
  Wrench,
  CheckCircle,
  Fingerprint,
  ScrollText,
  Siren,
  Lock,
  Landmark,
} from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Stagger, StaggerItem } from "../ui/Reveal";

type Subsystem = {
  title: string;
  subtitle?: string;
  icon: typeof HardDrive;
  color: string;
  items: string[];
};

const SUBSYSTEMS: Subsystem[] = [
  {
    title: "Memory Engine",
    icon: HardDrive,
    color: "#3B82F6",
    items: [
      "Working Memory",
      "Long-Term Memory",
      "Organizational Memory",
      "Conversation Memory",
      "Decision Memory",
      "Execution Memory",
    ],
  },
  {
    title: "Reasoning Engine",
    icon: Cog,
    color: "#7C5CFC",
    items: [
      "Planning",
      "Reflection",
      "Decision Making",
      "Alternative Evaluation",
      "Tradeoffs",
    ],
  },
  {
    title: "Multi-Agent Runtime",
    icon: Bot,
    color: "#35D6FF",
    items: [
      "Executive Agent",
      "Compliance Agent",
      "Search Agent",
      "Document Agent",
      "Connector Agent",
    ],
  },
  {
    title: "Organizational Digital Twin",
    icon: Building2,
    color: "#18C964",
    items: [
      "Departments",
      "Employees",
      "Policies",
      "Projects",
      "Processes",
      "Goals",
    ],
  },
  {
    title: "Knowledge Graph",
    subtitle: "Enterprise Nervous System",
    icon: Network,
    color: "#F5A524",
    items: [
      "Events",
      "Triggers",
      "Streams",
      "Replay",
      "Observability",
      "Automation",
    ],
  },
  {
    title: "Trust Layer",
    icon: ShieldCheck,
    color: "#EC4899",
    items: [
      "Grounding",
      "Hallucination Detection",
      "Evidence",
      "Confidence",
      "Provenance",
      "Audit Trails",
      "Governance",
      "Policies",
      "Clearance",
      "ABAC",
      "PII Detection",
      "Compliance",
    ],
  },
];

const SUBSYSTEM_ICONS: Record<string, typeof HardDrive> = {
  "Working Memory": BrainCircuit,
  "Long-Term Memory": HardDrive,
  "Organizational Memory": Building2,
  "Conversation Memory": GitBranch,
  "Decision Memory": CheckCircle,
  "Execution Memory": Zap,
  Planning: Target,
  Reflection: Eye,
  "Decision Making": Cog,
  "Alternative Evaluation": GitBranch,
  Tradeoffs: Activity,
  "Executive Agent": Bot,
  "Compliance Agent": ShieldCheck,
  "Search Agent": Search,
  "Document Agent": FileText,
  "Connector Agent": Link2,
  Departments: Building2,
  Employees: Users,
  Policies: FileSpreadsheet,
  Projects: FolderKanban,
  Processes: GitBranch,
  Goals: Target,
  Events: Zap,
  Triggers: Activity,
  Streams: GitBranch,
  Replay: Repeat,
  Observability: Eye,
  Automation: Wrench,
  Grounding: CheckCircle,
  "Hallucination Detection": Fingerprint,
  Evidence: FileText,
  Confidence: CheckCircle,
  Provenance: GitBranch,
  "Audit Trails": ScrollText,
  Governance: Building2,
  Clearance: Lock,
  ABAC: Fingerprint,
  "PII Detection": Siren,
  Compliance: Landmark,
};

export function IntelligenceCore() {
  return (
    <section className="relative overflow-hidden py-32 sm:py-44">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-full max-w-4xl -translate-x-1/2 hairline-gradient" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="The Intelligence Core"
          title="One card per subsystem."
          subtitle="Exactly matching the architecture we've built."
        />

        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.12}>
          {SUBSYSTEMS.map((ss) => (
            <StaggerItem key={ss.title}>
              <div
                className="glass-strong group flex h-full flex-col rounded-3xl border border-edge p-6 transition-all duration-500 hover:-translate-y-1 hover:border-edge-strong hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] sm:p-7"
                data-cursor="hover"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
                    style={{ background: `${ss.color}18` }}
                  >
                    <ss.icon size={20} style={{ color: ss.color }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-white">
                      {ss.title}
                    </h3>
                    {ss.subtitle && (
                      <p className="mt-0.5 text-xs text-text-muted">{ss.subtitle}</p>
                    )}
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {ss.items.map((item) => {
                    const ItemIcon = SUBSYSTEM_ICONS[item] || CheckCircle;
                    return (
                      <span
                        key={item}
                        className="glass inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] px-2.5 py-1.5 text-[11px] font-medium text-text-secondary transition-all duration-300 group-hover:border-white/15 group-hover:text-white"
                      >
                        <ItemIcon size={12} className="shrink-0 opacity-60" />
                        {item}
                      </span>
                    );
                  })}
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
