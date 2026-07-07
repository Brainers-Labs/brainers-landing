"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  FileText,
  MessageSquare,
  GitFork,
  Database,
  Server,
  Link2,
  HardDrive,
  Network,
  Cog,
  Bot,
  Workflow,
  Zap,
  ShieldCheck,
  CheckCircle,
  FileSpreadsheet,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

type ArchNode = {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
  tier: "input" | "pipeline" | "output";
};

const NODES: ArchNode[] = [
  // Inputs
  {
    id: "docs",
    label: "Documents",
    icon: FileText,
    description: "Ingest files from any source — PDFs, docs, spreadsheets, and presentations. Every page is read and understood.",
    tier: "input",
  },
  {
    id: "slack",
    label: "Slack",
    icon: MessageSquare,
    description: "Connect your team's conversations, channels, and threads. Every message becomes part of your organizational memory.",
    tier: "input",
  },
  {
    id: "github",
    label: "GitHub",
    icon: GitFork,
    description: "Sync code repositories, pull requests, issues, and documentation. Technical knowledge is indexed automatically.",
    tier: "input",
  },
  {
    id: "crm",
    label: "CRM",
    icon: Database,
    description: "Import customer data, deals, interactions, and history. Sales intelligence feeds into the knowledge graph.",
    tier: "input",
  },
  {
    id: "erp",
    label: "ERP",
    icon: Server,
    description: "Connect enterprise resource planning systems — finance, inventory, HR, and operations data in one place.",
    tier: "input",
  },
  // Pipeline
  {
    id: "connectors",
    label: "Connectors",
    icon: Link2,
    description: "Pre-built integrations that connect to the tools your teams already use — no migration, no new habits.",
    tier: "pipeline",
  },
  {
    id: "memory",
    label: "Memory",
    icon: HardDrive,
    description: "Multiple memory layers — working, long-term, organizational, conversational, and execution memory that persists context.",
    tier: "pipeline",
  },
  {
    id: "knowledge-graph",
    label: "Knowledge Graph",
    icon: Network,
    description: "A living map of every entity, relationship, policy, and decision in your organization — continuously updated.",
    tier: "pipeline",
  },
  {
    id: "reasoning",
    label: "Reasoning",
    icon: Cog,
    description: "Multi-step reasoning that plans, reflects, evaluates alternatives, and makes tradeoff-aware decisions.",
    tier: "pipeline",
  },
  {
    id: "agents",
    label: "Agents",
    icon: Bot,
    description: "Specialized AI agents — Executive, Compliance, Search, Document, and Connector — each with distinct capabilities.",
    tier: "pipeline",
  },
  {
    id: "workflows",
    label: "Workflows",
    icon: Workflow,
    description: "Automated sequences that trigger actions based on events, schedules, and conditions you define.",
    tier: "pipeline",
  },
  {
    id: "events",
    label: "Events",
    icon: Zap,
    description: "Real-time event streams that feed the system with continuous updates — triggers, streams, replay, and observability.",
    tier: "pipeline",
  },
  {
    id: "governance",
    label: "Governance",
    icon: ShieldCheck,
    description: "Policies, clearance levels, ABAC, PII detection, and compliance rules that control access to every piece of knowledge.",
    tier: "pipeline",
  },
  {
    id: "trust",
    label: "Trust",
    icon: CheckCircle,
    description: "Grounding, hallucination detection, evidence citation, confidence scoring, provenance tracking, and complete audit trails.",
    tier: "pipeline",
  },
  // Outputs
  {
    id: "answers",
    label: "Answers",
    icon: CheckCircle,
    description: "Direct, cited answers to any question about your business — with sources, confidence scores, and evidence attached.",
    tier: "output",
  },
  {
    id: "actions",
    label: "Actions",
    icon: Zap,
    description: "Automated actions triggered by AI decisions and workflows — from policy updates to compliance alerts to data entry.",
    tier: "output",
  },
  {
    id: "reports",
    label: "Reports",
    icon: FileSpreadsheet,
    description: "Generated reports with full provenance — every fact traced to its exact source document, page, and timestamp.",
    tier: "output",
  },
  {
    id: "dashboards",
    label: "Dashboards",
    icon: LayoutDashboard,
    description: "Real-time dashboards showing intelligence across your organization — what's connected, what's growing, what needs attention.",
    tier: "output",
  },
];

const INPUT_IDS = ["docs", "slack", "github", "crm", "erp"];
const PIPELINE_IDS = [
  "connectors",
  "memory",
  "knowledge-graph",
  "reasoning",
  "agents",
  "workflows",
  "events",
  "governance",
  "trust",
];
const OUTPUT_IDS = ["answers", "actions", "reports", "dashboards"];

const NODE_COLORS: Record<string, string> = {
  docs: "#3B82F6",
  slack: "#E01E5A",
  github: "#B8C2D1",
  crm: "#18C964",
  erp: "#F5A524",
  connectors: "#3B82F6",
  memory: "#7C5CFC",
  "knowledge-graph": "#35D6FF",
  reasoning: "#18C964",
  agents: "#F5A524",
  workflows: "#EC4899",
  events: "#3B82F6",
  governance: "#7C5CFC",
  trust: "#18C964",
  answers: "#3B82F6",
  actions: "#7C5CFC",
  reports: "#35D6FF",
  dashboards: "#18C964",
};

function NodeCard({
  node,
  active,
  onHover,
  onClick,
}: {
  node: ArchNode;
  active: boolean;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
}) {
  const color = NODE_COLORS[node.id] || "#3B82F6";
  return (
    <motion.button
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(node.id)}
      whileHover={{ scale: 1.06, y: -3 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative flex cursor-pointer flex-col items-center gap-2 rounded-2xl border p-3 text-center transition-all duration-500 sm:p-4 ${
        active
          ? "border-accent/50 shadow-[0_0_30px_rgba(59,130,246,0.2)]"
          : "border-edge hover:border-edge-strong"
      }`}
      style={{
        background: active
          ? `linear-gradient(135deg, ${color}12, ${color}06)`
          : "rgba(255,255,255,0.04)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 sm:h-11 sm:w-11"
        style={{
          background: active ? `${color}22` : "rgba(255,255,255,0.04)",
          boxShadow: active ? `0 0 24px ${color}40` : "none",
        }}
      >
        <node.icon size={19} style={{ color: active ? color : "rgba(255,255,255,0.6)" }} />
      </div>
      <span
        className="text-[11px] font-medium leading-tight transition-colors duration-300 sm:text-xs"
        style={{ color: active ? "#fff" : "rgba(255,255,255,0.7)" }}
      >
        {node.label}
      </span>
    </motion.button>
  );
}

export function InteractiveArchitecture() {
  const [active, setActive] = useState<string | null>(null);
  const activeNode = active ? NODES.find((n) => n.id === active) : null;

  return (
    <section className="relative overflow-hidden py-32 sm:py-44">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-full max-w-4xl -translate-x-1/2 hairline-gradient" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Interactive Architecture"
          title="The complete system."
          subtitle="Hover any node to learn what it does — from ingestion to trusted answers."
        />

        <Reveal className="mt-16" y={40}>
          {/* Main diagram */}
          <div className="relative">
            {/* Ambient glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[140px]" />

            <div className="relative flex flex-col items-center gap-2 sm:gap-3">
              {/* Inputs row */}
              <div className="flex flex-wrap justify-center gap-3">
                {INPUT_IDS.map((id) => {
                  const node = NODES.find((n) => n.id === id)!;
                  return (
                    <NodeCard
                      key={node.id}
                      node={node}
                      active={active === node.id}
                      onHover={setActive}
                      onClick={setActive}
                    />
                  );
                })}
              </div>

              {/* Down arrows */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex justify-center py-2"
              >
                <ArrowLine />
              </motion.div>

              {/* Pipeline column */}
              <div className="flex flex-col items-center gap-2 sm:gap-3">
                {PIPELINE_IDS.map((id, i) => {
                  const node = NODES.find((n) => n.id === id)!;
                  return (
                    <div key={node.id} className="flex flex-col items-center">
                      <NodeCard
                        node={node}
                        active={active === node.id}
                        onHover={setActive}
                        onClick={setActive}
                      />
                      {i < PIPELINE_IDS.length - 1 && (
                        <motion.div
                          initial={{ opacity: 0, scaleY: 0 }}
                          whileInView={{ opacity: 1, scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.05 }}
                          className="h-4 w-px bg-gradient-to-b from-accent/30 to-accent/5 sm:h-5"
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Down arrows */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex justify-center py-2"
              >
                <ArrowLine />
              </motion.div>

              {/* Outputs row */}
              <div className="flex flex-wrap justify-center gap-3">
                {OUTPUT_IDS.map((id) => {
                  const node = NODES.find((n) => n.id === id)!;
                  return (
                    <NodeCard
                      key={node.id}
                      node={node}
                      active={active === node.id}
                      onHover={setActive}
                      onClick={setActive}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Detail panel */}
        <AnimatePresence>
          {activeNode && (
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: EASE }}
              className="glass-strong mx-auto mt-10 max-w-2xl overflow-hidden rounded-3xl border border-edge p-6 sm:p-8"
            >
              <div className="hairline-gradient absolute inset-x-0 top-0" />
              <div className="flex items-start gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                  style={{
                    background: `${NODE_COLORS[activeNode.id]}22`,
                  }}
                >
                  <activeNode.icon size={22} style={{ color: NODE_COLORS[activeNode.id] }} />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold tracking-tight text-white">
                      {activeNode.label}
                    </h3>
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider"
                      style={{
                        background: `${NODE_COLORS[activeNode.id]}18`,
                        color: NODE_COLORS[activeNode.id],
                      }}
                    >
                      {activeNode.tier === "input"
                        ? "Source"
                        : activeNode.tier === "output"
                          ? "Output"
                          : "Layer"}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {activeNode.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ArrowLine() {
  return (
    <svg width="16" height="24" viewBox="0 0 16 24" fill="none" aria-hidden>
      <line x1="8" y1="0" x2="8" y2="18" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" />
      <path
        d="M8 24L2 17H14L8 24Z"
        fill="rgba(59,130,246,0.3)"
      />
    </svg>
  );
}
