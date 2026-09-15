"use client"

import ProjectCard from "./project-card"
import { AnimateOnScroll } from "./scroll-animations"
import type { Project } from "@/lib/portfolio-data"

const PROJECTS = [
  {
    id: "idcs",
    projectIndex: "01",
    category: "Enterprise ERP",
    title: "IDCS – Unified Institutional ERP Framework",
    description:
      "Centralized institutional ERP platform automating academic and administrative workflows — biometric attendance, payroll analytics, leave management, event approvals, and role-based access control.",
    tags: ["React", "Django REST", "JWT", "PostgreSQL"],
    repoUrl: "https://github.com/Pixel-Square/IDCS-Restart",
    year: "2026",
  },
  {
    id: "centennial-connect",
    projectIndex: "02",
    category: "SaaS & Product Engineering",
    title: "Centennial Connect – AI Business Calling SaaS",
    description:
      "Production SaaS platform for AI-powered business calling: virtual numbers, real-time AI voice agents, and intelligent power dialing for sales and support teams.",
    tags: ["TypeScript", "React", "SaaS", "AI Voice"],
    repoUrl: "https://github.com/Hari-prashath-123/centennial-connect",
    year: "2026",
  },
  {
    id: "autofixhub",
    projectIndex: "03",
    category: "Agentic AI & DevOps",
    title: "AutoFixHub – Autonomous Code Fixer",
    description:
      "Agentic AI tool that autonomously analyzes code issues and commits fixes directly to GitHub using LLM agents and the GitHub API.",
    tags: ["Agentic AI", "Python", "LLM", "GitHub APIs"],
    repoUrl: "https://github.com/Hari-prashath-123",
    year: "2025",
  },
  {
    id: "wire-edm",
    projectIndex: "04",
    category: "Simulation & AI",
    title: "Wire EDM AI Simulator",
    description:
      "Web-based CNC Wire EDM simulation built with React and TypeScript featuring AI-powered performance metrics visualization.",
    tags: ["React", "TypeScript", "AI", "CNC Sim"],
    repoUrl: "https://github.com/Hari-prashath-123/Wire-EDM-new",
    year: "2025",
  },
  {
    id: "academic-rag",
    projectIndex: "05",
    category: "GenAI & Full Stack",
    title: "Academic RAG",
    description:
      "Retrieval-Augmented Generation system enabling students to query academic course materials using natural language and receive context-grounded answers via LLM APIs.",
    tags: ["RAG", "GenAI", "React", "LLM APIs"],
    repoUrl: "https://github.com/Hari-prashath-123/Academic-Rag",
    year: "2025",
  },
  {
    id: "recruitment-automation",
    projectIndex: "06",
    category: "Business Automation",
    title: "Recruitment Automation – Centennial",
    description:
      "Automation tool for resume screening and candidate shortlisting to streamline internal recruitment workflows at Centennial InfoTech.",
    tags: ["Automation", "TypeScript", "AI", "React"],
    repoUrl: "https://github.com/Hari-prashath-123/Recruitment-Automation-Centennial",
    year: "2026",
  },
]

export default function Projects({ projects }: { projects: Project[] }) {
  // Duplicate for seamless looping
  const PROJECTS_DOUBLE = [...projects, ...projects]
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
