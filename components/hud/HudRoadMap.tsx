"use client"

import { motion } from "framer-motion"

const ROADMAP = [
  {
    num: "01",
    tag: "// ROOT 01",
    title: "Frontend Development",
    desc: "Architecting responsive, high-performance UI components with React and modern CSS.",
    badge: "React & Tailwind",
  },
  {
    num: "02",
    tag: "// ROOT 02",
    title: "Backend Development",
    desc: "Building secure REST APIs, authentication flows, and relational data pipelines.",
    badge: "Node.js & Databases",
  },
  {
    num: "03",
    tag: "// ROOT 03",
    title: "AI & Machine Learning",
    desc: "Integrating LLMs, generative AI, and automated agentic workflows into real apps.",
    badge: "Generative AI & LLMs",
  },
  {
    num: "04",
    tag: "// ROOT 04",
    title: "Cloud & Deployment",
    desc: "Containerizing systems and shipping reliable, automated deployment pipelines.",
    badge: "Cloud & CI/CD",
  },
]

export default function HudRoadMap() {
  return (
    <section
      id="roadmap"
      style={{ background: "var(--hud-bg)", padding: "7rem 2rem", borderTop: "1px solid var(--hud-border)" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative" }}>
        
        {/* Glowing Background Matter */}
        <div style={{ position: "absolute", inset: "-100px", overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              top: "20%",
              left: "10%",
              width: "600px",
              height: "600px",
              background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)",
              filter: "blur(40px)",
              borderRadius: "50%",
            }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              bottom: "10%",
              right: "5%",
              width: "800px",
              height: "800px",
              background: "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 60%)",
              filter: "blur(60px)",
              borderRadius: "50%",
            }}
          />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "3.5rem", position: "relative", zIndex: 1 }}
        >
          <span className="hud-eyebrow" style={{ marginBottom: "1rem", display: "inline-flex" }}>// ENGINEERING ROADMAP</span>
          <h2 style={{ fontFamily: "var(--hud-font-body)", fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "var(--hud-text-primary)", margin: "1rem 0 0" }}>
            Core Execution Road Map
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.25rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          {ROADMAP.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="hud-glass-card"
              style={{ padding: "1.75rem" }}
            >
              {/* HUD corner brackets */}
              <span className="hgc-corner tl" />
              <span className="hgc-corner tr" />
              <span className="hgc-corner bl" />
              <span className="hgc-corner br" />

              {/* Number dot */}
              <div
                style={{
                  position: "absolute",
                  top: "1.25rem",
                  right: "1.25rem",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  border: "1px solid var(--hud-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--hud-font-mono)",
                  fontSize: "0.625rem",
                  color: "var(--hud-text-tertiary)",
                }}
              >
                {item.num}
              </div>

              <div style={{ fontFamily: "var(--hud-font-mono)", fontSize: "0.625rem", color: "var(--hud-accent-green)", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
                {item.tag}
              </div>
              <h3 style={{ fontFamily: "var(--hud-font-body)", fontWeight: 700, fontSize: "1.0625rem", color: "var(--hud-text-primary)", marginBottom: "0.75rem" }}>
                {item.title}
              </h3>
              <p style={{ fontFamily: "var(--hud-font-body)", fontSize: "0.875rem", color: "var(--hud-text-secondary)", lineHeight: 1.65, marginBottom: "1.25rem" }}>
                {item.desc}
              </p>
              <span className="hgc-badge">{item.badge}</span>
            </motion.div>
          ))}

              {/* Number dot */}
              <div
                style={{
                  position: "absolute",
                  top: "1.25rem",
                  right: "1.25rem",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  border: "1px solid var(--hud-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--hud-font-mono)",
                  fontSize: "0.625rem",
                  color: "var(--hud-text-tertiary)",
                }}
              >
                {item.num}
              </div>

              <div style={{ fontFamily: "var(--hud-font-mono)", fontSize: "0.625rem", color: "var(--hud-accent-green)", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
                {item.tag}
              </div>
              <h3 style={{ fontFamily: "var(--hud-font-body)", fontWeight: 700, fontSize: "1.0625rem", color: "var(--hud-text-primary)", marginBottom: "0.75rem" }}>
                {item.title}
              </h3>
              <p style={{ fontFamily: "var(--hud-font-body)", fontSize: "0.875rem", color: "var(--hud-text-secondary)", lineHeight: 1.65, marginBottom: "1.25rem" }}>
                {item.desc}
              </p>
              <span
                style={{
                  display: "inline-flex",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "999px",
                  border: "1px solid var(--hud-border)",
                  fontFamily: "var(--hud-font-mono)",
                  fontSize: "0.625rem",
                  color: "var(--hud-text-tertiary)",
                  letterSpacing: "0.08em",
                }}
              >
                {item.badge}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
