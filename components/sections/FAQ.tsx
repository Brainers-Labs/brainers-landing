"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

const FAQS = [
  {
    q: "Does BrainersOS replace ChatGPT?",
    a: "No. BrainersOS is an enterprise intelligence operating system — it connects to your organization's data and provides answers grounded in your documents, policies, and conversations. ChatGPT is a general-purpose chatbot. They serve different purposes, and BrainersOS can actually be used alongside LLMs like GPT.",
  },
  {
    q: "Can it connect to Slack?",
    a: "Yes. BrainersOS has a native Slack connector that indexes messages, threads, and files from channels your team uses — while respecting access controls.",
  },
  {
    q: "Is our data private?",
    a: "Absolutely. Your data is encrypted in transit and at rest. We offer multi-tenant isolation, and each organization's knowledge graph is completely separate. We never train on your data.",
  },
  {
    q: "Can we deploy on-premises?",
    a: "Yes. BrainersOS Enterprise supports on-premises deployment in your own cloud or data center, with full control over your data and infrastructure.",
  },
  {
    q: "Does it support MCP?",
    a: "Yes. BrainersOS is MCP-native. Our server implements the Model Context Protocol, allowing any MCP-compatible client to query your organizational knowledge graph.",
  },
  {
    q: "How does memory work?",
    a: "BrainersOS has six memory layers: working, long-term, organizational, conversational, decision, and execution memory. Each layer persists different types of context, enabling the system to remember, reason, and learn over time.",
  },
  {
    q: "Can we bring our own models?",
    a: "Yes. BrainersOS supports BYOM (Bring Your Own Model). Connect your existing LLM infrastructure — whether it's OpenAI, Anthropic, open-source models, or your own fine-tuned models.",
  },
  {
    q: "Does it work offline?",
    a: "On-premises deployments can operate fully offline. Cloud deployments require an internet connection, but cached knowledge graphs support degraded-mode queries even during interruptions.",
  },
  {
    q: "How is trust calculated?",
    a: "Every answer includes a confidence score based on source relevance, consistency across multiple documents, recency, and grounding verification. You can always drill down to the exact source and page.",
  },
  {
    q: "What happens to deleted data?",
    a: "When a source document is deleted from its original system, BrainersOS removes it from the knowledge graph within the next sync cycle. Audit trails of what was removed are retained.",
  },
  {
    q: "How long does integration take?",
    a: "Most organizations connect their first data source in under 15 minutes. A full deployment with multiple connectors, custom ontologies, and user provisioning typically takes 1-2 weeks.",
  },
  {
    q: "Does BrainersOS support multiple languages?",
    a: "Yes. BrainersOS understands and processes content in 50+ languages. Answers are returned in the same language as the question, using sources in any language.",
  },
  {
    q: "Can I build custom plugins?",
    a: "Yes. BrainersOS has a Plugin Platform with a public SDK. Build custom connectors, data transformers, workflow actions, and UI extensions using TypeScript or Go.",
  },
  {
    q: "What's the difference between Search and BrainersOS?",
    a: "Search returns links. BrainersOS returns answers — with reasoning, sources, confidence scores, and evidence. It understands what your documents mean, not just what words they contain.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden py-32 sm:py-44">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-full max-w-4xl -translate-x-1/2 hairline-gradient" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions."
          subtitle="Everything you need to know about BrainersOS."
        />

        <Reveal className="mt-16 mx-auto max-w-4xl" y={24}>
          <div className="space-y-3">
            {FAQS.map((faq) => {
              const isOpen = open === faq.q;
              return (
                <div
                  key={faq.q}
                  className="glass rounded-2xl border border-edge transition-all duration-500 hover:border-edge-strong"
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : faq.q)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                    data-cursor="hover"
                  >
                    <span className="text-sm font-medium text-white sm:text-base">
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-4 shrink-0"
                    >
                      <ChevronDown size={16} className="text-text-muted" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-edge px-6 pb-5 pt-4 text-sm leading-relaxed text-text-secondary">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
