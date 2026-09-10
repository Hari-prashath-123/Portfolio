"use client"

import ProjectCard from "./project-card"
import { AnimateOnScroll } from "./scroll-animations"

const PROJECTS = [
  {
    id: "idcs",
    projectIndex: "01",
    category: "Fintech & Security",
    title: "Gateway System – IDCS ERP Framework",
    description:
      "Centralized institutional ERP and secure transaction management simulator automating academic and administrative workflows, biometric tracking, and role-based access control.",
    tags: ["React", "Django REST", "JWT", "PostgreSQL"],
    repoUrl: "https://github.com/Hari-prashath-123",
    year: "2026",
  },
  {
    id: "autofixhub",
    projectIndex: "02",
    category: "Agentic AI & DevOps",
    title: "AutoFixHub Autonomous Code Fixer",
    description:
      "Agentic AI tool that autonomously analyzes errors, drafts code resolutions, and commits fixes to GitHub using multi-agent LLM workflows.",
    tags: ["Agentic AI", "Python", "LLM", "GitHub APIs"],
    repoUrl: "https://github.com/Hari-prashath-123",
    year: "2025",
  },
  {
    id: "saas-platform",
    projectIndex: "03",
    category: "Cloud Architecture",
    title: "Multi-Tenant SaaS Platform",
    description:
      "Architected a containerized multi-tenant SaaS platform enforcing strict tenant data isolation, secure schema routing, and automated cluster deployment.",
    tags: ["Node.js", "MongoDB", "Docker", "Express"],
    repoUrl: "https://github.com/Hari-prashath-123",
    year: "2025",
  },
  {
    id: "browser-extension",
    projectIndex: "04",
    category: "Browser Automation",
    title: "Productivity Suite Extension",
    description:
      "Developed a custom Chrome extension using JavaScript and Chrome APIs to manage tasks, automate workflows, and boost daily productivity.",
    tags: ["JavaScript", "Chrome APIs", "Tailwind CSS"],
    repoUrl: "https://github.com/Hari-prashath-123",
    year: "2025",
  },
  {
    id: "wire-edm",
    projectIndex: "05",
    category: "Simulation & AI",
    title: "Wire EDM AI Simulator",
    description:
      "Web-based CNC simulation using React, TypeScript, and AI-powered performance metrics visualization for wire electrical discharge machining.",
    tags: ["React", "TypeScript", "AI", "CNC Sim"],
    repoUrl: "https://github.com/Hari-prashath-123",
    year: "2025",
  },
  {
    id: "ai-career",
    projectIndex: "06",
    category: "Generative AI",
    title: "AI Career Navigator",
    description:
      "AI-powered career guidance platform built using React, Supabase, and Hugging Face APIs. Developed at HackFinity 2025 National Hackathon.",
    tags: ["React", "Supabase", "Hugging Face", "GenAI"],
    repoUrl: "https://github.com/Hari-prashath-123",
    year: "2025",
  },
]

// Duplicate for seamless looping
const PROJECTS_DOUBLE = [...PROJECTS, ...PROJECTS]

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 px-4 bg-[#07090e] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header - Silver White HUD Theme */}
        <AnimateOnScroll animation="fade-up">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-block">
              <span className="hud-tag">
                <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                // PORTFOLIO WORK
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Featured Engineering Projects
            </h2>
            <p className="text-sm sm:text-base text-white/60 max-w-xl mx-auto">
              Production-ready applications, agentic tools, and distributed architectures.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Train / Marquee — cards scroll left (←) */}
        <AnimateOnScroll animation="fade-up" delay={100}>
          <div className="marquee-row py-4 -mx-4 px-4">
            <div className="marquee-track marquee-track--left-fast items-stretch">
              {PROJECTS_DOUBLE.map((project, index) => (
                <div
                  key={`${project.id}-${index}`}
                  className="flex-shrink-0 w-[300px] sm:w-[340px] mx-3 h-[360px]"
                >
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        {/* "View All" hint */}
        <AnimateOnScroll animation="fade-up" delay={200}>
          <div className="text-center mt-10">
            <p className="text-xs text-white/40 font-mono tracking-widest uppercase">
              // Hover over any card to pause · Click to view details
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
