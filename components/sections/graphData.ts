import React from "react";
import { FileText, User, Shield, Terminal } from "lucide-react";

export const EASE = [0.22, 1, 0.36, 1] as const;

export type GraphNodeType = "document" | "policy" | "person" | "system";

export type GraphNode = {
  id: string;
  label: string;
  type: GraphNodeType;
  x: number;
  y: number;
  detail: string;
};

export const NODES: GraphNode[] = [
  {
    id: "compliance-policy",
    label: "Compliance Policy v4",
    type: "policy",
    x: 50,
    y: 50,
    detail: "Main governance framework updated for fiscal year 2026. Governs onboarding steps.",
  },
  {
    id: "aml-regulation",
    label: "AML Regulation 2025",
    type: "policy",
    x: 32,
    y: 28,
    detail: "Statutory requirements detailing threshold screening limits for international transfers.",
  },
  {
    id: "kyc-procedure",
    label: "KYC Procedure",
    type: "policy",
    x: 68,
    y: 28,
    detail: "Operational guide detailing customer identification verification pipelines.",
  },
  {
    id: "head-compliance",
    label: "Head of Compliance",
    type: "person",
    x: 50,
    y: 20,
    detail: "Senior owner responsible for signoff and audit trails of KYC compliance overrides.",
  },
  {
    id: "banking-api",
    label: "Core Banking API Spec",
    type: "document",
    x: 22,
    y: 50,
    detail: "Technical specifications defining transaction trigger boundaries and hooks.",
  },
  {
    id: "slack-ops",
    label: "Slack #operations",
    type: "system",
    x: 78,
    y: 50,
    detail: "Communication stream logging live alerts and compliance override signals.",
  },
  {
    id: "jira-atlas",
    label: "Jira — Project Atlas",
    type: "system",
    x: 32,
    y: 72,
    detail: "Task pipeline tracking core infrastructure modifications and engineering reviews.",
  },
  {
    id: "risk-minutes",
    label: "Risk Committee Minutes",
    type: "document",
    x: 68,
    y: 72,
    detail: "Formal record of decision parameters regarding lowered screening limits.",
  },
  {
    id: "cto-office",
    label: "CTO Office",
    type: "person",
    x: 50,
    y: 80,
    detail: "Engineering stakeholder authorizing API infrastructure deployments.",
  },
];

export const EDGES: Array<[string, string]> = [
  ["compliance-policy", "head-compliance"],
  ["compliance-policy", "aml-regulation"],
  ["compliance-policy", "kyc-procedure"],
  ["compliance-policy", "banking-api"],
  ["compliance-policy", "slack-ops"],
  ["compliance-policy", "jira-atlas"],
  ["compliance-policy", "risk-minutes"],
  ["compliance-policy", "cto-office"],
  ["aml-regulation", "head-compliance"],
  ["kyc-procedure", "slack-ops"],
  ["banking-api", "jira-atlas"],
  ["risk-minutes", "cto-office"],
];

export const TYPE_META: Record<
  GraphNodeType,
  { label: string; color: string; icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }> }
> = {
  document: { label: "Document", color: "#3b82f6", icon: FileText },
  policy: { label: "Policy", color: "#7c5cfc", icon: Shield },
  person: { label: "Owner", color: "#18c964", icon: User },
  system: { label: "System", color: "#f5a524", icon: Terminal },
};
