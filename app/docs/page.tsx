"use client";

import { Navbar } from "@/components/chrome/Navbar";
import { UpdatedFooter } from "@/components/sections/UpdatedFooter";
import { SmoothScroll } from "@/components/chrome/SmoothScroll";
import { CustomCursor } from "@/components/chrome/CustomCursor";
import { ScrollProgress } from "@/components/chrome/ScrollProgress";
import { DeveloperPlatform } from "@/components/sections/DeveloperPlatform";
import { ArrowRight, Terminal, BookOpen, Cpu, ShieldAlert } from "lucide-react";

export default function DocsPage() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main className="relative noise min-h-screen bg-space pt-32 pb-24 text-[#efefec]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Hero Header */}
          <div className="relative border-b border-white/10 pb-16 text-center sm:text-left">
            <div className="absolute top-1/2 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/10 blur-[100px]" />
            <p className="text-sm font-semibold uppercase tracking-wider text-neon">
              Developer Portal
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              BrainersOS Docs
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/60">
              Integrate your company&apos;s intelligence into existing workflows, query knowledge graphs programmatically, and build autonomous agents.
            </p>
          </div>

          {/* Quick Access Grid */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: BookOpen,
                title: "Getting Started",
                desc: "Learn core concepts, setup credentials, and initialize the client SDK in under 5 minutes.",
                tag: "Guide",
              },
              {
                icon: Terminal,
                title: "API Reference",
                desc: "Explore endpoint configurations for indexing files, vector querying, and reasoning flows.",
                tag: "REST API",
              },
              {
                icon: Cpu,
                title: "Model Control Protocol",
                desc: "Connect LLMs to enterprise-controlled data context layers using our custom MCP toolkits.",
                tag: "MCP Spec",
              },
              {
                icon: ShieldAlert,
                title: "Access & Security",
                desc: "Understand enterprise RBAC, document permission mapping, and authorization flows.",
                tag: "Auth & RBAC",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="glass group rounded-2xl p-6 transition-all duration-300 hover:border-edge-strong hover:bg-card-hover"
                data-cursor="hover"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-edge bg-white/[0.03] text-neon transition-colors group-hover:border-neon/40">
                  <card.icon size={18} />
                </div>
                <div className="mt-6">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7c5cfc]">
                    {card.tag}
                  </span>
                  <h3 className="mt-1 text-lg font-medium text-white">{card.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/50">{card.desc}</p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-white/95 group-hover:text-neon transition-colors">
                  <span>Read Document</span>
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            ))}
          </div>

          {/* Render Developer Platform highlights */}
          <div className="mt-16 rounded-3xl border border-white/5 bg-holo-card/45 p-1 sm:p-2">
            <DeveloperPlatform />
          </div>
        </div>
      </main>
      <UpdatedFooter />
    </SmoothScroll>
  );
}
