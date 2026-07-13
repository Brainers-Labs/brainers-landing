"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Brain,
  GitBranch,
  LayoutDashboard,
  Network,
  Bot,
  Plug,
  Search,
  FileText,
} from "lucide-react";
import { useEffect, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Screen =
  | "dashboard"
  | "knowledge"
  | "agents"
  | "connectors"
  | "ask";

const SCREENS: Screen[] = [
  "dashboard",
  "knowledge",
  "agents",
  "connectors",
  "ask",
];

function StatusPill({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-white/[0.04] px-3 py-1 border border-white/5">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
      <span className="text-[10px] font-medium text-white/50">{label}</span>
    </div>
  );
}

function SidebarItem({
  active,
  icon: Icon,
  children,
}: {
  active: boolean;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${active
          ? "bg-violet-600/10 text-violet-400 border border-violet-500/20"
          : "text-white/40 hover:text-white/60 hover:bg-white/[0.02]"
        }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>{children}</span>
    </div>
  );
}

function Metric({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
      <p className="text-xs text-white/40 uppercase tracking-wider">{title}</p>
      <h4 className="mt-2 text-3xl font-bold text-white">{value}</h4>
    </div>
  );
}

function SourceCard({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs text-white/60">
      <FileText className="h-3.5 w-3.5 text-violet-400" />
      <span>{title}</span>
    </div>
  );
}

export function LiveDemo() {
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const wait = (ms: number) =>
      new Promise<void>((r) => {
        timers.push(setTimeout(r, ms));
      });

    async function run() {
      while (!cancelled) {
        for (const s of SCREENS) {
          setScreen(s);
          setQuestion("");
          setAnswer("");

          if (s === "ask") {
            const q =
              "What risks are blocking the roadmap?";

            for (let i = 0; i <= q.length; i++) {
              if (cancelled) return;
              setQuestion(q.slice(0, i));
              await wait(25);
            }

            await wait(800);

            const a =
              "Two risks are currently blocking the roadmap: delayed connector migrations and unresolved entity merge proposals. The issues originate from Sprint #24 engineering notes and governance review records.";

            for (let i = 0; i <= a.length; i += 4) {
              if (cancelled) return;
              setAnswer(a.slice(0, i));
              await wait(10);
            }
          }

          await wait(3500);
        }
      }
    }

    run();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[#020617] shadow-[0_40px_120px_rgba(0,0,0,0.65)]">
          <BrowserChrome />

          <div className="flex h-[760px]">
            <Sidebar screen={screen} />

            <div className="flex-1 overflow-hidden bg-[#030712]/50">
              <AnimatePresence mode="wait">
                <motion.div
                  key={screen}
                  initial={{
                    opacity: 0,
                    y: 16,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -16,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: EASE,
                  }}
                  className="h-full"
                >
                  {screen === "dashboard" && (
                    <DashboardScreen />
                  )}

                  {screen === "knowledge" && (
                    <KnowledgeScreen />
                  )}

                  {screen === "agents" && (
                    <AgentsScreen />
                  )}

                  {screen === "connectors" && (
                    <ConnectorsScreen />
                  )}

                  {screen === "ask" && (
                    <AskBrainScreen
                      question={question}
                      answer={answer}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrowserChrome() {
  return (
    <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500">
          <Brain className="h-5 w-5 text-white" />
        </div>

        <div>
          <h3 className="font-semibold text-white">
            SynaX
          </h3>
          <p className="text-xs tracking-[0.25em] text-violet-400 uppercase">
            Knowledge OS
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <StatusPill label="API" />
        <StatusPill label="PG" />
        <StatusPill label="Graph" />
      </div>
    </div>
  );
}

function Sidebar({
  screen,
}: {
  screen: Screen;
}) {
  return (
    <div className="w-[260px] border-r border-white/10 bg-[#061026] p-5 flex flex-col gap-1">
      <SidebarItem
        active={screen === "dashboard"}
        icon={LayoutDashboard}
      >
        Dashboard
      </SidebarItem>

      <SidebarItem
        active={screen === "knowledge"}
        icon={Network}
      >
        Knowledge Map
      </SidebarItem>

      <SidebarItem
        active={screen === "agents"}
        icon={Bot}
      >
        Agents
      </SidebarItem>

      <SidebarItem
        active={screen === "connectors"}
        icon={Plug}
      >
        Connectors
      </SidebarItem>

      <SidebarItem
        active={screen === "ask"}
        icon={Brain}
      >
        Ask Brain
      </SidebarItem>
    </div>
  );
}

function DashboardScreen() {
  return (
    <div className="space-y-8 p-8">
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-violet-500 p-10">
        <h2 className="text-4xl font-bold text-white">
          Good afternoon.
        </h2>

        <p className="mt-3 max-w-2xl text-lg text-white/70">
          Your organization&apos;s knowledge graph at a
          glance.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <Metric title="Knowledge Score" value="96" />
        <Metric title="Entities" value="479" />
        <Metric title="Documents" value="17" />
        <Metric title="Open Risks" value="37" />
      </div>
    </div>
  );
}

function KnowledgeScreen() {
  return (
    <div className="p-8">
      <h2 className="text-4xl font-bold text-white">
        Intelligence Explorer
      </h2>

      <div className="mt-8 h-[500px] rounded-3xl border border-white/10 bg-[#030b1f]">
        <div className="flex h-full items-center justify-center">
          <GitBranch className="h-20 w-20 text-violet-400/50" />
        </div>
      </div>
    </div>
  );
}

function AgentsScreen() {
  const agents = [
    "ExecutiveAgent",
    "SearchAgent",
    "DocumentAgent",
    "ConnectorAgent",
    "ComplianceAgent",
    "DigestWriter",
  ];

  return (
    <div className="grid grid-cols-3 gap-6 p-8">
      {agents.map((a) => (
        <div
          key={a}
          className="rounded-3xl border border-white/10 bg-white/[0.02] p-8"
        >
          <Bot className="mb-4 text-violet-400" />
          <h3 className="font-semibold text-white">
            {a}
          </h3>
        </div>
      ))}
    </div>
  );
}

function ConnectorsScreen() {
  const items = [
    "Slack",
    "GitHub",
    "Linear",
    "Notion",
    "Confluence",
    "Jira",
  ];

  return (
    <div className="grid grid-cols-2 gap-5 p-8">
      {items.map((c) => (
        <div
          key={c}
          className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
        >
          <Plug className="mb-3 text-violet-400" />
          <h3 className="font-semibold text-white">
            {c}
          </h3>
        </div>
      ))}
    </div>
  );
}

function AskBrainScreen({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <div className="space-y-8 p-8">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-center gap-3">
          <Search className="text-violet-400" />

          <p className="text-white">
            {question}
            <span className="animate-pulse">|</span>
          </p>
        </div>
      </div>

      {answer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-3xl border border-violet-500/20 bg-violet-500/5 p-8"
        >
          <div className="flex gap-4">
            <Brain className="text-violet-400" />

            <p className="leading-8 text-white/80">
              {answer}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            <SourceCard title="Sprint #24 Notes" />
            <SourceCard title="Governance Records" />
            <SourceCard title="Connector Logs" />
          </div>
        </motion.div>
      )}
    </div>
  );
}
