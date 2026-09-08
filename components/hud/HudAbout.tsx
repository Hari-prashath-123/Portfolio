"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
}

const STAT_CARDS = [
  { value: "Full-Stack", label: "ARCHITECTURE" },
  { value: "React & Node", label: "CORE TECH" },
  { value: "Scalable", label: "SYSTEMS" },
]

export default function HudAbout() {
  return (
    <section
      id="about"
      style={{
        background: "var(--hud-bg)",
        padding: "8rem 2rem",
        borderTop: "1px solid var(--hud-border)",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "5rem",
          alignItems: "center",
        }}
      >
        {/* ── LEFT: Phone-frame card with glow ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          style={{ position: "relative", width: "260px", flexShrink: 0 }}
        >
          {/* Glow behind card */}
          <div
            style={{
              position: "absolute",
              inset: "-20px",
              background: "radial-gradient(ellipse at center, rgba(245,245,245,0.06) 0%, transparent 70%)",
              filter: "blur(24px)",
              borderRadius: "32px",
              pointerEvents: "none",
            }}
          />

          {/* Card frame */}
          <div
            style={{
              position: "relative",
              borderRadius: "28px",
              overflow: "hidden",
              aspectRatio: "3/4",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "#111",
              boxShadow: "0 32px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <Image
              src="/hero-front.png"
              alt="Hariprashath B"
              fill
              className="object-cover object-top"
              loading="lazy"
            />

            {/* Status chip inside card, bottom */}
            <div
              style={{
                position: "absolute",
                bottom: "1rem",
                left: "0.75rem",
                right: "0.75rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(10,10,10,0.82)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
                padding: "0.5rem 0.75rem",
              }}
            >
              <span
                className="hud-dot-pulse"
                style={{
                  display: "inline-block",
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "var(--hud-accent-green)",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--hud-font-mono)",
                  fontSize: "0.5625rem",
                  color: "var(--hud-accent-green)",
                  letterSpacing: "0.1em",
                  fontWeight: 700,
                }}
              >
                OPEN TO OPPORTUNITIES
              </span>
              <span
                style={{
                  marginLeft: "auto",
                  fontFamily: "var(--hud-font-mono)",
                  fontSize: "0.5625rem",
                  color: "var(--hud-text-tertiary)",
                  letterSpacing: "0.05em",
                }}
              >
                {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── RIGHT: Bio ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0.05}
            variants={fadeUp}
          >
            <span className="hud-eyebrow">// SYSTEM PROFILE</span>
          </motion.div>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0.1}
            variants={fadeUp}
            style={{
              fontFamily: "var(--hud-font-body)",
              fontWeight: 700,
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              color: "var(--hud-text-primary)",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Hello, I&apos;m{" "}
            <span style={{ color: "var(--hud-text-secondary)" }}>Hariprashath</span>{" "}
            <span style={{ fontWeight: 400, color: "var(--hud-text-secondary)" }}>B</span>
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0.15}
            variants={fadeUp}
            style={{
              fontFamily: "var(--hud-font-body)",
              fontSize: "0.9375rem",
              color: "var(--hud-text-secondary)",
              lineHeight: 1.75,
              margin: 0,
              maxWidth: "520px",
            }}
          >
            A passionate Full-Stack Developer dedicated to crafting clean, functional, and highly
            scalable web applications. Specializing in AI-integrated platforms, intuitive user
            experiences, and robust backend pipelines.
          </motion.p>

          {/* Stat cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0.2}
            variants={fadeUp}
            style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
          >
            {STAT_CARDS.map((card) => (
              <div
                key={card.value}
                className="hud-card-hover"
                style={{
                  background: "var(--hud-elevated)",
                  border: "1px solid var(--hud-border)",
                  borderRadius: "12px",
                  padding: "1rem 1.25rem",
                  minWidth: "120px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--hud-font-body)",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "var(--hud-text-primary)",
                    marginBottom: "0.2rem",
                  }}
                >
                  {card.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--hud-font-mono)",
                    fontSize: "0.5rem",
                    color: "var(--hud-text-tertiary)",
                    letterSpacing: "0.15em",
                  }}
                >
                  {card.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 767px) {
          #hud-about-inner { grid-template-columns: 1fr !important; gap: 3rem !important; }
          #hud-about-photo { width: 100% !important; }
        }
      `}</style>
    </section>
  )
}
