"use client"

import ProjectCard from "./project-card"
import { AnimateOnScroll } from "./scroll-animations"
import FloatingElements from "./floating-elements"

const PROJECTS = [
  {
    id: "idcs",
    title: "IDCS – Unified Institutional ERP Framework",
    description:
      "Centralized institutional ERP platform to automate academic and administrative workflows including biometric attendance, payroll analytics, leave management, event approvals, and role-based access control.",
    tags: ["React", "Django REST", "JWT", "PostgreSQL"],
    repoUrl: "https://github.com/Hari-prashath-123",
    year: "2026",
  },
  {
    id: "autofixhub",
    title: "AutoFixHub",
    description:
      "Agentic AI tool that autonomously analyzes and commits code fixes to GitHub using generative AI and multi-agent workflows.",
    tags: ["Agentic AI", "Python", "LLM", "GitHub"],
    repoUrl: "https://github.com/Hari-prashath-123",
    year: "2025",
  },
  {
    id: "wire-edm",
    title: "Wire EDM AI Simulator",
    description:
      "Web-based CNC simulation using React, TypeScript, and AI-powered performance metrics visualization for wire electrical discharge machining.",
    tags: ["React", "TypeScript", "AI", "CNC Simulation"],
    repoUrl: "https://github.com/Hari-prashath-123",
    year: "2025",
  },
  {
    id: "ai-career",
    title: "AI Career Navigator",
    description:
      "AI-powered career guidance platform built using React, Supabase, and Hugging Face APIs. Developed at HackFinity 2025 National Hackathon.",
    tags: ["React", "Supabase", "Hugging Face", "GenAI"],
    repoUrl: "https://github.com/Hari-prashath-123",
    year: "2025",
  },
  {
    id: "qpg",
    title: "Question Paper Generator",
    description:
      "Flask-based website that generates question papers using syllabus PDFs and Bloom's taxonomy logic with NLP processing.",
    tags: ["Flask", "NLP", "Python", "Education"],
    repoUrl: "https://github.com/Hari-prashath-123",
    year: "2025",
  },
  {
    id: "ecommerce-ai",
    title: "E-Commerce AI Website",
    description:
      "Developed using Canva AI (Magic Media & Magic Write) for product management automation and intelligent content generation.",
    tags: ["Canva AI", "E-Commerce", "Automation"],
    repoUrl: "https://github.com/Hari-prashath-123",
    year: "2025",
  },
  {
    id: "marksheet",
    title: "Student Marksheet Management System",
    description:
      "Node.js + Express + SQLite-based CRUD web application for managing student academic records and generating marksheets.",
    tags: ["Node.js", "Express", "SQLite", "CRUD"],
    repoUrl: "https://github.com/Hari-prashath-123",
    year: "2024",
  },
  {
    id: "brick-tool",
    title: "Brick Lifting Tool & Sand Separator Design",
    description:
      "Innovative mechanical design registered with the Indian Patent Office, combining engineering and practical problem-solving.",
    tags: ["Patent", "Design", "Innovation"],
    year: "2024",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="relative py-20 px-4 bg-secondary overflow-hidden">
      <FloatingElements variant="sparse" />

      <div className="max-w-4xl mx-auto relative z-10">
        <AnimateOnScroll animation="fade-up">
          <div className="space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
            <p className="text-lg text-muted-foreground">
              Explore my latest work in AI, data science, and full-stack development
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project, index) => (
            <AnimateOnScroll
              key={project.id}
              animation={index % 2 === 0 ? "fade-up" : "fade-up"}
              delay={index * 100}
            >
              <ProjectCard {...project} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
