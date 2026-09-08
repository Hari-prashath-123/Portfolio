"use client"

import { motion } from "framer-motion"

const PROJECTS = [
  {
    num: "01",
    category: "Cloud Architecture",
    title: "IDCS – Unified Institutional ERP Framework",
    desc: "Centralized ERP automating attendance, payroll analytics, leave management, and role-based access control for an academic institution.",
    tags: ["React", "Django REST", "JWT", "PostgreSQL"],
    repoUrl: "https://github.com/Hari-prashath-123",
  },
  {
    num: "02",
    category: "Agentic AI",
    title: "AutoFixHub",
    desc: "Agentic AI tool that autonomously analyzes broken code and commits fixes directly to GitHub.",
    tags: ["Python", "GitHub API", "LLMs"],
    repoUrl: "https://github.com/Hari-prashath-123",
  },
  {
    num: "03",
    category: "AI Simulation",
    title: "Wire EDM AI Simulator",
    desc: "Web-based CNC machining simulator with AI-powered performance metrics and visualization.",
    tags: ["React", "TypeScript", "AI Analytics"],
    repoUrl: "https://github.com/Hari-prashath-123",
  },
  {
    num: "04",
    category: "Career Tech",
    title: "AI Career Navigator",
    desc: "AI-powered career guidance platform built for HackFinity 2025, matching users to paths using LLM reasoning.",
    tags: ["React", "Supabase", "Hugging Face APIs"],
    repoUrl: "https://github.com/Hari-prashath-123",
  },
  {
    num: "05",
    category: "EdTech Automation",
    title: "Question Paper Generator",
    desc: "Flask-based tool that auto-generates exam papers from syllabus PDFs using Bloom's taxonomy logic.",
    tags: ["Flask", "Python", "NLP"],
    repoUrl: "https://github.com/Hari-prashath-123",
  },
  {
    num: "06",
    category: "Full-Stack CRUD",
    title: "Student Marksheet Management System",
    desc: "CRUD web app for managing student academic records end-to-end.",
    tags: ["Node.js", "Express", "SQLite"],
    repoUrl: "https://github.com/Hari-prashath-123",
  },
]

export default function HudProjects() {
  return (
    <section
      id="projects"
      style={{ background: "var(--hud-bg)", padding: "7rem 2rem", borderTop: "1px solid var(--hud-border)" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "3.5rem" }}
        >
          <span className="hud-eyebrow" style={{ marginBottom: "1rem", display: "inline-flex" }}>// PORTFOLIO WORK</span>
          <h2 style={{ fontFamily: "var(--hud-font-body)", fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "var(--hud-text-primary)", margin: "1rem 0 0" }}>
            Featured Engineering Projects
          </h2>
        </motion.div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="hud-card-hover"
              style={{
                background: "var(--hud-elevated)",
                border: "1px solid var(--hud-border)",
                borderRadius: "16px",
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {/* Top row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--hud-font-mono)", fontSize: "0.5625rem", color: "var(--hud-text-tertiary)", letterSpacing: "0.12em" }}>
                  // PROJECT {project.num}
                </span>
                <span
                  style={{
                    padding: "0.2rem 0.6rem",
                    borderRadius: "999px",
                    border: "1px solid var(--hud-border)",
                    fontFamily: "var(--hud-font-mono)",
                    fontSize: "0.5625rem",
                    color: "var(--hud-accent-green)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {project.category}
                </span>
              </div>

              <h3 style={{ fontFamily: "var(--hud-font-body)", fontWeight: 700, fontSize: "1rem", color: "var(--hud-text-primary)", lineHeight: 1.35, margin: 0 }}>
                {project.title}
              </h3>

              <p style={{ fontFamily: "var(--hud-font-body)", fontSize: "0.8125rem", color: "var(--hud-text-secondary)", lineHeight: 1.65, margin: 0, flex: 1 }}>
                {project.desc}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "0.2rem 0.6rem",
                      borderRadius: "999px",
                      border: "1px solid var(--hud-border)",
                      fontFamily: "var(--hud-font-mono)",
                      fontSize: "0.5625rem",
                      color: "var(--hud-text-tertiary)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Link */}
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontFamily: "var(--hud-font-mono)",
                  fontSize: "0.6875rem",
                  color: "var(--hud-text-secondary)",
                  textDecoration: "none",
                  letterSpacing: "0.08em",
                  transition: "color 200ms ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--hud-text-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--hud-text-secondary)")}
              >
                CODE <span style={{ fontSize: "0.75rem" }}>→</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
