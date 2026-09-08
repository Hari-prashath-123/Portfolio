"use client"

import { motion } from "framer-motion"

const SKILLS_ROW1 = [
  "Python", "JavaScript", "TypeScript", "Java", "C", "SQL",
  "React.js", "Node.js", "Flask", "Django", "Express.js", "TensorFlow",
  "Scikit-Learn", "REST APIs", "JWT Auth", "PostgreSQL", "SQLite", "Supabase",
]
const SKILLS_ROW2 = [
  "Git & GitHub", "Machine Learning", "Deep Learning", "Generative AI",
  "Prompt Engineering", "Hugging Face APIs", "OpenAI APIs", "Agentic AI Systems",
  "Power BI", "Figma", "Blender", "CI/CD", "Cloud Integration", "Data Analytics",
]

function Pill({ label }: { label: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "0.4rem 1rem",
        borderRadius: "999px",
        border: "1px solid var(--hud-border)",
        background: "var(--hud-elevated)",
        fontFamily: "var(--hud-font-mono)",
        fontSize: "0.75rem",
        color: "var(--hud-text-secondary)",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      {label}
    </span>
  )
}

function MarqueeRow({ skills, direction }: { skills: string[]; direction: "left" | "right" }) {
  const doubled = [...skills, ...skills]
  return (
    <div className="hud-marquee-container" style={{ overflow: "hidden", position: "relative" }}>
      <div
        className={direction === "left" ? "hud-marquee-left" : "hud-marquee-right"}
        style={{ display: "flex", gap: "0.75rem", width: "max-content" }}
      >
        {doubled.map((skill, i) => (
          <Pill key={`${skill}-${i}`} label={skill} />
        ))}
      </div>
    </div>
  )
}

export default function HudSkills() {
  return (
    <section
      id="skills"
      style={{ background: "var(--hud-bg)", padding: "7rem 0", borderTop: "1px solid var(--hud-border)" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", padding: "0 2rem", marginBottom: "3.5rem" }}
      >
        <span className="hud-eyebrow" style={{ marginBottom: "1rem", display: "inline-flex" }}>// TECHNICAL STACK</span>
        <h2
          style={{ fontFamily: "var(--hud-font-body)", fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "var(--hud-text-primary)", margin: "1rem 0 0.75rem" }}
        >
          Technologies I Work With
        </h2>
        <p style={{ fontFamily: "var(--hud-font-body)", fontSize: "0.9375rem", color: "var(--hud-text-secondary)", maxWidth: "540px", margin: "0 auto", lineHeight: 1.7 }}>
          Full-stack expertise across modern web development, artificial intelligence, and cloud infrastructure.
        </p>
      </motion.div>

      {/* Marquee rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <MarqueeRow skills={SKILLS_ROW1} direction="left" />
        <MarqueeRow skills={SKILLS_ROW2} direction="right" />
      </div>
    </section>
  )
}
