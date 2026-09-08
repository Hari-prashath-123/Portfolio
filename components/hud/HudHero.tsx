"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import Image from "next/image"

// All 7 photos for the 360° scroll-driven turn — safe ASCII filenames
const PHOTOS = [
  "/hero-front.png",
  "/hero-45left.png",
  "/hero-leftside.png",
  "/hero-back45left.png",
  "/hero-back.png",
  "/hero-back45right.png",
  "/hero-rightside.png",
]

const HEADLINES = [
  {
    heading: ["CREATIVE", "DEVELOPER"],
    tag: "// TURNING IDEAS INTO REALITY",
    sub: "Available for hire. Building fast, responsive web applications using modern tech stacks.",
  },
  {
    heading: ["FULL-STACK", "ENGINEER"],
    tag: "// ROBUST BACKEND ARCHITECTURE",
    sub: "Architecting secure REST APIs, databases, and scalable server infrastructure.",
  },
  {
    heading: ["AI & GENAI", "SYSTEMS"],
    tag: "// INTELLIGENT AUTOMATION",
    sub: "Building agentic AI tools, LLM-powered apps, and automation pipelines.",
  },
]

export default function HudHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [activePhoto, setActivePhoto] = useState(0)
  const [activeHeadline, setActiveHeadline] = useState(0)
  const [headlineKey, setHeadlineKey] = useState(0)
  const [scrollStarted, setScrollStarted] = useState(false)
  const prefersReduced = useRef(false)

  useEffect(() => {
    prefersReduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  }, [])

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (prefersReduced.current) return
    setScrollStarted(v > 0.02)

    // Map to photo index 0–6
    const photoIdx = Math.min(Math.floor(v * PHOTOS.length), PHOTOS.length - 1)
    setActivePhoto(photoIdx)

    // Headline swap at 1/3 and 2/3
    const newHL = v < 0.33 ? 0 : v < 0.66 ? 1 : 2
    if (newHL !== activeHeadline) {
      setActiveHeadline(newHL)
      setHeadlineKey((k) => k + 1)
    }
  })

  const hl = HEADLINES[activeHeadline]

  return (
    <section
      id="home"
      ref={heroRef}
      style={{ position: "relative", height: "200vh", background: "var(--hud-bg)" }}
    >
      {/* ── STICKY VIEWPORT ── */}
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

        {/* ── FULL-BLEED PHOTO BACKGROUND ── */}
        <div style={{ position: "absolute", inset: 0 }}>
          {PHOTOS.map((src, i) => (
            <motion.div
              key={src}
              animate={{ opacity: i === activePhoto ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ position: "absolute", inset: 0 }}
            >
              <Image
                src={src}
                alt={`Hariprashath view ${i}`}
                fill
                className="object-cover object-center"
                priority={i === 0}
                loading={i === 0 ? "eager" : "lazy"}
              />
            </motion.div>
          ))}

          {/* Left vignette — where text lives */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.7) 38%, rgba(10,10,10,0.15) 60%, rgba(10,10,10,0.5) 100%)",
          }} />
          {/* Bottom vignette */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 40%)",
          }} />
          {/* Top vignette for navbar */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, transparent 20%)",
          }} />
        </div>

        {/* ── CONTENT LAYER ── */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 3rem 4rem" }}>

          {/* SCROLL hint — top-left */}
          <motion.div
            animate={{ opacity: scrollStarted ? 0 : 0.6 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "absolute",
              top: "78px",
              left: "3rem",
              fontFamily: "var(--hud-font-mono)",
              fontSize: "0.5625rem",
              color: "var(--hud-text-secondary)",
              letterSpacing: "0.2em",
            }}
          >
            ↓ SCROLL TO SCRUB TIMELINE
          </motion.div>

          {/* BOTTOM LAYOUT — two columns */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem" }}>

            {/* LEFT — headline */}
            <div style={{ flex: "0 0 auto", maxWidth: "520px" }}>
              {/* Small label */}
              <div style={{
                fontFamily: "var(--hud-font-mono)",
                fontSize: "0.6875rem",
                color: "var(--hud-text-secondary)",
                letterSpacing: "0.15em",
                marginBottom: "0.75rem",
              }}>
                HI, I&apos;M{" "}
                <span style={{ borderBottom: "1px solid var(--hud-text-secondary)", paddingBottom: "1px" }}>
                  HARIPRASHATH
                </span>
              </div>

              {/* Animated headline */}
              <motion.div
                key={headlineKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <h1
                  style={{
                    fontFamily: "var(--hud-font-display)",
                    fontSize: "clamp(4rem, 9vw, 8.5rem)",
                    lineHeight: 0.9,
                    letterSpacing: "-0.02em",
                    color: "var(--hud-text-primary)",
                    margin: 0,
                    textShadow: "0 2px 40px rgba(0,0,0,0.5)",
                  }}
                >
                  {hl.heading[0]}
                  <br />
                  {hl.heading[1]}
                </h1>
              </motion.div>
            </div>

            {/* RIGHT — tag + subtext + buttons */}
            <div style={{ flex: "0 0 auto", maxWidth: "300px", textAlign: "right", paddingBottom: "0.25rem" }}>
              <motion.div
                key={`tag-${headlineKey}`}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div style={{
                  fontFamily: "var(--hud-font-mono)",
                  fontSize: "0.5625rem",
                  color: "var(--hud-text-tertiary)",
                  letterSpacing: "0.18em",
                  marginBottom: "0.5rem",
                  fontStyle: "italic",
                }}>
                  {hl.tag}
                </div>
                <p style={{
                  fontFamily: "var(--hud-font-body)",
                  fontSize: "0.8125rem",
                  color: "var(--hud-text-secondary)",
                  lineHeight: 1.65,
                  margin: "0 0 1.5rem",
                }}>
                  {hl.sub}
                </p>
              </motion.div>

              {/* Buttons */}
              <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                <a href="#projects" className="hud-btn-filled">View My Work</a>
                <a href="#contact" className="hud-btn-outlined">Contact Me</a>
              </div>
            </div>
          </div>

          {/* Scroll progress bar */}
          <motion.div
            animate={{ opacity: scrollStarted ? 1 : 0 }}
            style={{
              position: "absolute",
              bottom: "1.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "6px",
              alignItems: "center",
            }}
          >
            {HEADLINES.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === activeHeadline ? "32px" : "16px",
                  height: "2px",
                  borderRadius: "2px",
                  background: i === activeHeadline ? "var(--hud-text-primary)" : "rgba(245,245,245,0.2)",
                  transition: "all 300ms ease",
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* ── MOBILE LAYOUT ── */}
        <style>{`
          @media (max-width: 639px) {
            #hud-hero-desktop { display: none !important; }
            #hud-hero-mobile-overlay { display: flex !important; }
          }
          @media (min-width: 640px) {
            #hud-hero-mobile-overlay { display: none !important; }
          }
        `}</style>

        {/* Mobile: just static front photo + text */}
        <div
          id="hud-hero-mobile-overlay"
          style={{
            display: "none",
            position: "absolute",
            inset: 0,
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-end",
            padding: "2rem 1.5rem 3rem",
          }}
        >
          <div style={{ fontFamily: "var(--hud-font-mono)", fontSize: "0.625rem", color: "var(--hud-text-secondary)", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>
            HI, I&apos;M HARIPRASHATH
          </div>
          <h1 style={{ fontFamily: "var(--hud-font-display)", fontSize: "3.5rem", lineHeight: 0.9, color: "var(--hud-text-primary)", margin: "0 0 1.5rem" }}>
            CREATIVE<br />DEVELOPER
          </h1>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <a href="#projects" className="hud-btn-filled">View My Work</a>
            <a href="#contact" className="hud-btn-outlined">Contact Me</a>
          </div>
        </div>

      </div>
    </section>
  )
}
