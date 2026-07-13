"use client";

import { motion } from "framer-motion";
import {
  Code2,
  BookOpen,
  Cpu,
  FileType,
  Puzzle,
  Terminal,
  Webhook,
  Radio,
  Zap,
  Blocks,
} from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Stagger, StaggerItem } from "../ui/Reveal";

const FEATURES = [
  { icon: Code2, label: "REST APIs", color: "#3B82F6" },
  { icon: BookOpen, label: "OpenAPI", color: "#7C5CFC" },
  { icon: Cpu, label: "Go SDK", color: "#35D6FF" },
  { icon: FileType, label: "TypeScript SDK", color: "#18C964" },
  { icon: Puzzle, label: "MCP Server", color: "#F5A524" },
  { icon: Blocks, label: "Plugin Platform", color: "#EC4899" },
  { icon: Terminal, label: "CLI", color: "#3B82F6" },
  { icon: Webhook, label: "Webhooks", color: "#7C5CFC" },
  { icon: Radio, label: "SSE", color: "#35D6FF" },
  { icon: Zap, label: "Event Streams", color: "#18C964" },
];

const CODE_SNIPPET = `import { Synax } from "@brainerslabs/sdk";

const client = new Synax({
  apiKey: process.env.BRAINERS_API_KEY,
});

// Ask your entire organization a question
const answer = await client.query({
  question: "What changed in our compliance policy?",
  includeSources: true,
});

console.log(answer.text);
// "Three changes took effect in Q2..."
console.log(answer.sources);
// [{ doc: "Compliance Policy v4", score: 0.98 }]`;

const EASE = [0.22, 1, 0.36, 1] as const;

export function DeveloperPlatform() {
  return (
    <section className="relative overflow-hidden py-32 sm:py-44">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-full max-w-4xl -translate-x-1/2 hairline-gradient" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Developer Platform"
          title="Everything developers need."
          subtitle="APIs, SDKs, CLI, webhooks, and a plugin platform — build on Synax your way."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <Stagger className="flex flex-wrap gap-3" gap={0.06}>
            {FEATURES.map((f) => (
              <StaggerItem key={f.label}>
                <div
                  className="glass group flex items-center gap-2.5 rounded-xl border border-edge px-4 py-3 transition-all duration-500 hover:border-edge-strong hover:shadow-[0_0_20px_rgba(59,130,246,0.06)]"
                  data-cursor="hover"
                >
                  <f.icon size={16} style={{ color: f.color }} />
                  <span className="text-sm font-medium text-white/85 transition-colors duration-300 group-hover:text-white">
                    {f.label}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Code snippet */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            className="glass-strong relative overflow-hidden rounded-2xl border border-edge"
          >
            <div className="flex items-center gap-2 border-b border-edge px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
              <span className="ml-3 text-xs text-text-muted">quickstart.ts</span>
            </div>
            <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed">
              <code className="text-text-secondary">
                {CODE_SNIPPET.split("\n").map((line, i) => (
                  <span key={i} className="block">
                    {line.startsWith("//") ? (
                      <span className="text-text-muted">{line}</span>
                    ) : line.includes("import") || line.includes("from") ? (
                      <span>
                        <span className="text-violet">{line.split(" ")[0]}</span>
                        {" " + line.split(" ").slice(1).join(" ")}
                      </span>
                    ) : line.includes("const") || line.includes("console") ? (
                      <span>
                        <span className="text-accent">{line.split(" ")[0]}</span>
                        {" " + line.split(" ").slice(1).join(" ")}
                      </span>
                    ) : line.includes("await") ? (
                      <span>
                        <span className="text-warning">await</span>
                        {line.slice(5)}
                      </span>
                    ) : (
                      <span>{line}</span>
                    )}
                  </span>
                ))}
              </code>
            </pre>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
