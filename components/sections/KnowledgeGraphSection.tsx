"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { NODES, EDGES, TYPE_META, EASE } from "./graphData";

export function KnowledgeGraphSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeNode = NODES.find((n) => n.id === activeId) || null;

  const isEdgeHighlighted = (fromId: string, toId: string) => {
    if (!activeId) return false;
    return fromId === activeId || toId === activeId;
  };

  return (
    <section id="knowledge-graph" className="relative py-32 sm:py-44">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="The knowledge graph"
          title="See how everything your company knows connects."
          subtitle="Every document, policy, owner, and system — mapped as living relationships. Hover a node to light up what it touches."
        />

        <div className="mt-16 grid items-start gap-8 lg:grid-cols-[1.5fr_1fr]">
          
          {/* Map Wrapper with Container-Level Reset */}
          <Reveal className="relative" blur={false}>
            <div 
              className="relative h-[460px] overflow-hidden rounded-3xl border border-edge bg-[#05070a]/60 sm:h-[520px]"
              onMouseLeave={() => setActiveId(null)}
            >
              {/* Tap backdrop to clear selection on Mobile */}
              <div className="absolute inset-0 z-0" onClick={() => setActiveId(null)} />
              
              <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
                  backgroundSize: "24px 24px"
                }}
              />

              {/* Edge Connection Layer — Bezier curves (infographic style) */}
              <svg className="absolute inset-0 h-full w-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <filter id="edge-glow">
                    <feGaussianBlur stdDeviation="0.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {EDGES.map(([fromId, toId], idx) => {
                  const fromNode = NODES.find((n) => n.id === fromId)!;
                  const toNode = NODES.find((n) => n.id === toId)!;
                  const isHighlighted = isEdgeHighlighted(fromId, toId);

                  const dx = toNode.x - fromNode.x;
                  const pathData = `M ${fromNode.x} ${fromNode.y} C ${fromNode.x + dx * 0.5} ${fromNode.y}, ${fromNode.x + dx * 0.5} ${toNode.y}, ${toNode.x} ${toNode.y}`;

                  let strokeColor = "rgba(255,255,255,0.04)";
                  if (isHighlighted && activeNode) {
                    strokeColor = TYPE_META[activeNode.type].color;
                  }

                  return (
                    <g key={idx}>
                      <path
                        d={pathData}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth={0.3}
                        strokeLinecap="round"
                        className="transition-all duration-500 ease-out"
                      />
                      {isHighlighted && (
                        <>
                          <path
                            d={pathData}
                            fill="none"
                            stroke={strokeColor}
                            strokeWidth={0.7}
                            strokeLinecap="round"
                            filter="url(#edge-glow)"
                            className="transition-all duration-300"
                          />
                          <motion.path
                            d={pathData}
                            fill="none"
                            stroke={strokeColor}
                            strokeWidth={0.5}
                            strokeLinecap="round"
                            strokeDasharray="1 40"
                            animate={{ strokeDashoffset: [-41, 0] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                          />
                        </>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Floating Node Chips — annotation style */}
              {NODES.map((node) => {
                const meta = TYPE_META[node.type];
                const isSelected = activeId === node.id;
                const isHighlightedNeighbor = activeId
                  ? EDGES.some(([from, to]) => (from === activeId && to === node.id) || (to === activeId && from === node.id))
                  : false;
                const isDimmed = activeId !== null && !isSelected && !isHighlightedNeighbor;

                return (
                  <motion.button
                    key={node.id}
                    onMouseEnter={() => setActiveId(node.id)}
                    onFocus={() => setActiveId(node.id)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveId(node.id);
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    whileHover={{ scale: 1.04 }}
                    whileFocus={{ scale: 1.04 }}
                    animate={{
                      opacity: isDimmed ? 0.1 : isSelected ? 1 : 0.6,
                      scale: isSelected ? 1.08 : 1,
                      filter: isDimmed ? "blur(2px)" : "blur(0px)",
                    }}
                    transition={{ duration: 0.35, ease: EASE }}
                    aria-label={`${meta.label}: ${node.label}`}
                    aria-expanded={isSelected}
                  >
                    {/* Atmospheric glow behind selected */}
                    {isSelected && (
                      <div
                        className="absolute -inset-12 -z-10 animate-pulse rounded-full opacity-15 blur-2xl"
                        style={{ background: `radial-gradient(circle, ${meta.color} 0%, transparent 70%)` }}
                      />
                    )}
                    <div
                      className={`flex items-center gap-1.5 rounded-md px-2 py-1 transition-all duration-300 ${
                        isSelected ? "bg-white/[0.04]" : ""
                      }`}
                    >
                      <span
                        className="h-1 w-1 rounded-full transition-all duration-300"
                        style={{
                          background: isSelected || isHighlightedNeighbor ? meta.color : "rgba(255,255,255,0.25)",
                          boxShadow: isSelected ? `0 0 6px ${meta.color}` : "none",
                        }}
                      />
                      <span
                        className="text-[10px] font-medium tracking-tight transition-colors duration-300 whitespace-nowrap"
                        style={{
                          color: isSelected
                            ? meta.color
                            : isHighlightedNeighbor
                            ? "rgba(255,255,255,0.85)"
                            : "rgba(255,255,255,0.45)",
                        }}
                      >
                        {node.label}
                      </span>
                    </div>
                  </motion.button>
                );
              })}

              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-4 z-30">
                <span className="glass rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-text-muted">
                  Hover the nodes — the graph responds
                </span>
              </div>
            </div>
          </Reveal>

          {/* Evidence panel (Right) */}
          <Reveal delay={0.12}>
            <div className="glass-strong relative min-h-[340px] overflow-hidden rounded-3xl p-7" aria-live="polite">
              <div className="hairline-gradient absolute inset-x-0 top-0" />
              <AnimatePresence mode="wait">
                {activeNode ? (
                  <motion.div
                    key={activeNode.id}
                    initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <span
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]"
                      style={{ color: TYPE_META[activeNode.type].color }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: TYPE_META[activeNode.type].color }} />
                      {TYPE_META[activeNode.type].label}
                    </span>
                    
                    <h3 className="mt-4 text-2xl font-semibold tracking-tight">{activeNode.label}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-muted">{activeNode.detail}</p>
                    
                    <ul className="mt-6 space-y-3 text-sm">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-0.5 shrink-0 rounded-full bg-accent" />
                        <span className="text-text-secondary leading-relaxed">
                          Linked to related policies, owners, and source systems in the graph.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-0.5 shrink-0 rounded-full bg-violet" />
                        <span className="text-text-secondary leading-relaxed">
                          Interactive flow mappings and live dependency checking active.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 h-4 w-0.5 shrink-0 rounded-full bg-success" />
                        <span className="text-text-secondary leading-relaxed">
                          Access controlled — people only see what they&apos;re allowed to see.
                        </span>
                      </li>
                    </ul>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-full flex-col justify-center"
                  >
                    <h3 className="text-xl font-semibold tracking-tight text-text-secondary">
                      A living map of your organization.
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-muted">
                      Not a folder tree. Not a search index. A graph that understands
                      that your KYC procedure implements a regulation, is owned by
                      compliance, and was updated last quarter.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-2">
                      {Object.entries(TYPE_META).map(([key, meta]) => (
                        <span key={key} className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] text-text-secondary">
                          <span className="h-1.5 w-1.5 rounded-full" style={{ background: meta.color }} />
                          {meta.label}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
      <div className="pointer-events-none absolute right-[-5%] top-[40%] z-0 h-[480px] w-[480px] rounded-full bg-violet/5 blur-[120px]" />
    </section>
  );
}
