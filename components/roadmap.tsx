"use client"

import { useState } from "react"
import { AnimateOnScroll } from "./scroll-animations"
import { HolographicCard } from "@/components/ui/holographic-card"
import { cn } from "@/lib/utils"

interface RoadmapNode {
  number: string
  title: string
  description: string
  pill: string
  status: "ACTIVE" | "BUILDING" | "EXPANDING"
  proof: string[]
  stack: string[]
  highlight?: boolean
}

const ROADMAP_NODES: RoadmapNode[] = [
  {
    number: "01",
    title: "Full-Stack Engineering",
    description: "Building scalable interfaces, APIs and production-ready applications.",
    pill: "REACT · TYPESCRIPT · NODE",
    status: "ACTIVE",
    proof: ["Oi IDCS", "Student Marksheet Management"],
    stack: ["React", "TypeScript", "Node.js", "Express.js", "Django", "PostgreSQL"],
    highlight: false,
  },
  {
    number: "02",
    title: "AI Engineering",
    description: "Engineering intelligent systems using machine learning, deep learning and modern AI frameworks.",
    pill: "PYTHON · TENSORFLOW · ML",
    status: "ACTIVE",
    proof: ["Wire EDM AI Simulator", "AI Career Navigator"],
    stack: ["Python", "TensorFlow", "Scikit-Learn", "Hugging Face", "Deep Learning"],
    highlight: false,
  },
  {
    number: "03",
    title: "GenAI & Agentic Systems",
    description: "Building autonomous AI workflows that reason, interact with tools and execute tasks.",
    pill: "GENAI · AGENTS · AUTOMATION",
    status: "BUILDING",
    proof: ["AutoFixHub", "AI Workflow Automation"],
    stack: ["Generative AI", "OpenAI APIs", "Agentic AI", "Hugging Face", "Prompt Eng."],
    highlight: true,
  },
  {
    number: "04",
    title: "Cloud & Data Systems",
    description: "Connecting intelligent applications with data platforms, analytics and deployment infrastructure.",
    pill: "POSTGRES · CLOUD · POWER BI",
    status: "EXPANDING",
    proof: ["CloudplusAI Internship", "Data Analytics"],
    stack: ["PostgreSQL", "Supabase", "Cloud Integration", "Power BI", "REST APIs"],
    highlight: false,
  },
]

export default function Roadmap() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const toggleExpand = (num: string) => {
    setExpandedCard((prev) => (prev === num ? null : num))
  }

  return (
    <section id="roadmap" className="relative py-28 px-4 overflow-hidden bg-[#07090e]">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <AnimateOnScroll animation="fade-up">
          <div className="text-center space-y-4 mb-20">
            <div className="inline-block">
              <span className="hud-tag">
                <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                // ENGINEERING ROADMAP
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Core Execution Root Map
            </h2>
          </div>
        </AnimateOnScroll>

        {/* Subtle connecting HUD flow lines between nodes (desktop only) */}
        <div 
          className="hidden lg:block absolute top-[280px] left-[8%] right-[8%] h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none -z-0" 
          aria-hidden="true" 
        />

        {/* 4 Holographic Root Cards Grid - items-start ensures only hovered card expands downwards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 pt-6 items-start">
          {ROADMAP_NODES.map((node, index) => {
            const isExpanded = hoveredCard === node.number || expandedCard === node.number

            return (
              <AnimateOnScroll key={node.number} animation="fade-up" delay={index * 120} className="relative isolate">
                <HolographicCard
                  glowVariant="white"
                  cardVariant="glass"
                  interactive={true}
                  portrait={false}
                  className="w-full max-w-full"
                  cardClassName={cn(
                    "h-[310px] flex flex-col justify-between transition-all duration-300 ease-out cursor-pointer overflow-hidden",
                    "group-hover:h-[565px]",
                    isExpanded && "h-[565px]",
                    node.highlight && "border-white/30 shadow-[0_0_25px_rgba(255,255,255,0.12)]"
                  )}
                  onMouseEnter={() => setHoveredCard(node.number)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => toggleExpand(node.number)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      toggleExpand(node.number)
                    }
                  }}
                >
                  {/* Inner card content */}
                  <div className="p-6 sm:p-7 flex flex-col justify-between h-full">
                    {/* Top Section: Root Number + Status Indicator + Title + Description + Pill */}
                    <div>
                      {/* Top Row: Root Number + Status Indicator */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-xs font-semibold text-white/60 tracking-widest uppercase flex items-center gap-1.5">
                          // ROOT {node.number}
                          {node.highlight && (
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-white/90 border border-white/20 ml-1">
                              CORE
                            </span>
                          )}
                        </span>
                        
                        {/* Small Status Indicator with subtle pulse */}
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="status-dot-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                          </span>
                          <span className="font-mono text-[9px] font-semibold text-emerald-400 tracking-wider uppercase">
                            {node.status}
                          </span>
                        </div>
                      </div>

                      {/* Capability Title - min height ensures baseline alignment across cards */}
                      <h3 className="text-base sm:text-lg font-bold text-white mb-2 tracking-tight uppercase leading-snug min-h-[44px]">
                        {node.title}
                      </h3>

                      {/* Description - min height ensures aligned layout across all cards */}
                      <p className="text-xs text-white/65 leading-relaxed min-h-[48px]">
                        {node.description}
                      </p>

                      {/* Technology Pill */}
                      <div className="pt-3">
                        <span className="hud-tag text-[10px] py-1 px-3 bg-white/[0.04] text-white/80 border-white/15 group-hover:border-white/30 group-hover:text-white transition-all duration-300 font-mono tracking-wider">
                          {node.pill}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Section: Expand prompt indicator + Collapsible Proof & Tech Stack */}
                    <div className="pt-3 mt-auto">
                      {/* Expand prompt bar */}
                      <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-white/45 group-hover:text-white/80 transition-colors">
                        <span className="flex items-center gap-1.5 uppercase">
                          <span className={cn(
                            "w-1.5 h-1.5 rounded-full transition-all duration-300",
                            isExpanded 
                              ? "bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]" 
                              : "bg-white/40 group-hover:bg-white/80"
                          )} />
                          PROOF & STACK
                        </span>
                        <span className="flex items-center gap-1 text-[9px] font-mono tracking-wide uppercase">
                          <span>{isExpanded ? "COLLAPSE" : "EXPAND"}</span>
                          <span className={cn(
                            "transition-transform duration-300 inline-block",
                            isExpanded ? "rotate-180" : "group-hover:translate-y-0.5"
                          )}>
                            ↓
                          </span>
                        </span>
                      </div>

                      {/* Collapsible Proof & Stack Details Area — revealed ONLY on hover or tap */}
                      <div
                        className={cn(
                          "grid transition-all duration-300 ease-out",
                          isExpanded
                            ? "grid-rows-[1fr] opacity-100 mt-2.5 pt-2.5 border-t border-white/10"
                            : "grid-rows-[0fr] opacity-0 pointer-events-none"
                        )}
                      >
                        <div className="overflow-hidden space-y-2.5 pb-1">
                          {/* Proof / Project Area */}
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-white/40 uppercase">
                              <span>PROOF / KEY WORK</span>
                            </div>
                            <div className="space-y-1 text-xs text-white/85 font-medium">
                              {node.proof.map((p) => (
                                <div key={p} className="truncate flex items-center gap-1.5">
                                  <span className="w-1 h-1 rounded-full bg-white/40 shrink-0" />
                                  <span className="truncate">{p}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Tech Stack Area */}
                          <div className="space-y-1.5 pt-1 border-t border-white/5">
                            <div className="text-[10px] font-mono font-semibold text-white/40 tracking-wider uppercase">
                              TECH STACK
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {node.stack.map((tech) => (
                                <span
                                  key={tech}
                                  className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.06] text-white/80 border border-white/10 font-mono"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </HolographicCard>
              </AnimateOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
