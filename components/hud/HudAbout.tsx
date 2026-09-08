"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } }),
}

const STAT_CARDS = [
  { label: "Architecture", value: "Full-Stack" },
  { label: "Systems", value: "AI / GenAI" },
  { label: "Core Tech", value: "React & Node" },
]

export default function HudAbout() {
  return (
    <section
      id="about"
      style={{ background: "var(--hud-bg)", padding: "8rem 2rem", borderTop: "1px solid var(--hud-border)" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>

        {/* LEFT — photo with status chip */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          style={{ position: "relative" }}
        >
          <div
            style={{
              position: "relative",
              borderRadius: "20px",
              overflow: "hidden",
              aspectRatio: "3/4",
              border: "1px solid var(--hud-border)",
              background: "var(--hud-elevated)",
            }}
          >
            <Image
              src="/front.png"
              alt="Hariprashath B"
              fill
              className="object-cover object-top"
              loading="lazy"
            />
          </div>

          {/* Status chip */}
          <div
            style={{
              position: "absolute",
              bottom: "-1rem",
              left: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              background: "var(--hud-elevated)",
              border: "1px solid var(--hud-border)",
              borderRadius: "999px",
              padding: "0.5rem 1rem",
              whiteSpace: "nowrap",
            }}
          >
            <span
              className="hud-dot-pulse"
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "var(--hud-accent-green)",
                flexShrink: 0,
              }}
            />
            <span style={{ fontFamily: "var(--hud-font-mono)", fontSize: "0.625rem", color: "var(--hud-accent-green)", letterSpacing: "0.1em" }}>
              OPEN TO OPPORTUNITIES — {new Date().getFullYear()}
            </span>
          </div>
        </motion.div>

        {/* RIGHT — bio */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} custom={0.05} variants={fadeUp}>
            <span className="hud-eyebrow">// SYSTEM PROFILE</span>
          </motion.div>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0.1}
            variants={fadeUp}
            style={{ fontFamily: "var(--hud-font-body)", fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "var(--hud-text-primary)", lineHeight: 1.15, margin: 0 }}
          >
            Hello, I&apos;m Hariprashath B
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0.15}
            variants={fadeUp}
            style={{ fontFamily: "var(--hud-font-body)", fontSize: "0.9375rem", color: "var(--hud-text-secondary)", lineHeight: 1.75, margin: 0 }}
          >
            A final-year AI &amp; Data Science engineer who builds full-stack, AI-powered platforms —
            from agentic automation tools to production-ready web apps. Currently President of the
            AGEN Club at KRCT and a certified Microsoft Power BI Data Analyst. Previously worked on
            AI-integrated cloud deployment workflows at CloudplusAI Tech.
          </motion.p>

          {/* Stat cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0.2}
            variants={fadeUp}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}
          >
            {STAT_CARDS.map((card) => (
              <div
                key={card.value}
                className="hud-card-hover"
                style={{
                  background: "var(--hud-elevated)",
                  border: "1px solid var(--hud-border)",
                  borderRadius: "12px",
                  padding: "1rem",
                }}
              >
                <div style={{ fontFamily: "var(--hud-font-body)", fontWeight: 700, fontSize: "0.875rem", color: "var(--hud-text-primary)", marginBottom: "0.25rem" }}>
                  {card.value}
                </div>
                <div style={{ fontFamily: "var(--hud-font-mono)", fontSize: "0.5625rem", color: "var(--hud-text-tertiary)", letterSpacing: "0.1em" }}>
                  {card.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile stack */}
      <style>{`
        @media (max-width: 767px) {
          #hud-about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  )
}
