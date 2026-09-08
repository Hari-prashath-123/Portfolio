"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import Image from "next/image"

// 7 photos for full 360° head-turn illusion
const PHOTOS = [
  { src: "/front.png",            alt: "Hariprashath - Front view" },
  { src: "/45° left.png",         alt: "Hariprashath - 45° left" },
  { src: "/Exact left side.png",  alt: "Hariprashath - Left side" },
  { src: "/Back 45 left.png",     alt: "Hariprashath - Back 45° left" },
  { src: "/Back.png",             alt: "Hariprashath - Back view" },
  { src: "/Back 45° right.png",   alt: "Hariprashath - Back 45° right" },
  { src: "/Exact right side.png", alt: "Hariprashath - Right side" },
]

const HEADLINES = [
  {
    heading: "CREATIVE\nDEVELOPER",
    tag: "// USER-FOCUSED INTERFACES",
    sub: "Available for hire. Building fast, responsive web applications using modern tech stacks.",
  },
  {
    heading: "FULL-STACK\nENGINEER",
    tag: "// ROBUST BACKEND ARCHITECTURE",
    sub: "Architecting secure REST APIs, databases, and scalable server infrastructure.",
  },
  {
    heading: "AI & GENAI\nSYSTEMS",
    tag: "// INTELLIGENT AUTOMATION",
    sub: "Building agentic AI tools, LLM-powered apps, and automation pipelines.",
  },
]

export default function HudHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [activePhoto, setActivePhoto] = useState(0)
  const [activeHeadline, setActiveHeadline] = useState(0)
  const [headlineVisible, setHeadlineVisible] = useState(true)
  const [scrollStarted, setScrollStarted] = useState(false)
  const prefersReduced = useRef(false)

  useEffect(() => {
    prefersReduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  }, [])

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  // Map scroll to photo index (0–6)
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (prefersReduced.current) return
    if (v > 0.01) setScrollStarted(true)
    else setScrollStarted(false)

    const idx = Math.min(Math.floor(v * PHOTOS.length), PHOTOS.length - 1)
    setActivePhoto(idx)

    const newHeadline = v < 0.33 ? 0 : v < 0.66 ? 1 : 2
    if (newHeadline !== activeHeadline) {
      setHeadlineVisible(false)
      setTimeout(() => {
        setActiveHeadline(newHeadline)
        setHeadlineVisible(true)
      }, 180)
    }
  })

  const hl = HEADLINES[activeHeadline]

  return (
    <section
      id="home"
      ref={heroRef}
      style={{
        position: "relative",
        minHeight: "200vh", // tall for scroll scrubbing
        background: "var(--hud-bg)",
      }}
    >
      {/* Sticky viewport that holds the visible hero */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Radial glow behind photo */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            background: "radial-gradient(ellipse, rgba(245,245,245,0.04) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Corner decorators */}
        <div style={{ position: "absolute", top: "80px", left: "2rem", fontFamily: "var(--hud-font-mono)", fontSize: "0.5625rem", color: "var(--hud-text-tertiary)", letterSpacing: "0.2em" }}>
          {`// PORTFOLIO 2026`}
        </div>
        <div style={{ position: "absolute", top: "80px", right: "2rem", fontFamily: "var(--hud-font-mono)", fontSize: "0.5625rem", color: "var(--hud-text-tertiary)", letterSpacing: "0.2em" }}>
          {`[ AI & FULL-STACK ]`}
        </div>

        {/* Grid layout */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 2rem",
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            gap: "3rem",
          }}
        >
          {/* LEFT — headline text */}
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: "var(--hud-font-mono)", fontSize: "0.6875rem", color: "var(--hud-text-tertiary)", letterSpacing: "0.12em", marginBottom: "1.25rem" }}>
              HI, I&apos;M HARIPRASHATH —{" "}
              <span style={{ borderBottom: "1px solid var(--hud-text-tertiary)", paddingBottom: "1px" }}>AI ENGINEER</span>
            </div>

            <motion.div
              key={activeHeadline}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: headlineVisible ? 1 : 0, y: headlineVisible ? 0 : -8 }}
              transition={{ duration: 0.2 }}
            >
              <h1
                className="hud-display"
                style={{
                  fontSize: "clamp(3rem, 6vw, 6.5rem)",
                  whiteSpace: "pre-line",
                  marginBottom: "2rem",
                }}
              >
                {hl.heading}
              </h1>
            </motion.div>

            {/* Bottom buttons */}
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a href="#projects" className="hud-btn-filled">View My Work</a>
              <a href="#contact" className="hud-btn-outlined">Contact Me</a>
            </div>
          </div>

          {/* CENTER — photo stack */}
          <div
            style={{
              position: "relative",
              width: "clamp(220px, 28vw, 380px)",
              aspectRatio: "3/4",
              flexShrink: 0,
            }}
          >
            {PHOTOS.map((photo, i) => (
              <motion.div
                key={photo.src}
                animate={{ opacity: i === activePhoto ? 1 : 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                style={{
                  position: i === 0 ? "relative" : "absolute",
                  inset: 0,
                  borderRadius: "16px",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover object-top"
                  priority={i === 0}
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </motion.div>
            ))}

            {/* Scroll hint overlay at bottom */}
            <motion.div
              animate={{ opacity: scrollStarted ? 0 : 1 }}
              transition={{ duration: 0.4 }}
              style={{
                position: "absolute",
                bottom: "1rem",
                left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "var(--hud-font-mono)",
                fontSize: "0.5625rem",
                color: "var(--hud-text-tertiary)",
                letterSpacing: "0.15em",
                whiteSpace: "nowrap",
                background: "rgba(10,10,10,0.7)",
                padding: "0.3rem 0.75rem",
                borderRadius: "999px",
                border: "1px solid var(--hud-border)",
              }}
            >
              ↓ SCROLL TO SCRUB TIMELINE
            </motion.div>
          </div>

          {/* RIGHT — tag + subtext */}
          <div style={{ minWidth: 0 }}>
            <motion.div
              key={`tag-${activeHeadline}`}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div
                style={{
                  fontFamily: "var(--hud-font-mono)",
                  fontSize: "0.6875rem",
                  color: "var(--hud-accent-green)",
                  letterSpacing: "0.1em",
                  marginBottom: "0.75rem",
                  fontStyle: "italic",
                }}
              >
                {hl.tag}
              </div>
              <p
                style={{
                  fontFamily: "var(--hud-font-body)",
                  fontSize: "0.875rem",
                  color: "var(--hud-text-secondary)",
                  lineHeight: 1.7,
                  maxWidth: "260px",
                }}
              >
                {hl.sub}
              </p>
            </motion.div>

            {/* Scroll progress indicator */}
            <div style={{ marginTop: "2rem" }}>
              <div style={{ display: "flex", gap: "6px" }}>
                {HEADLINES.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: "2px",
                      flex: 1,
                      borderRadius: "2px",
                      background: i === activeHeadline ? "var(--hud-text-primary)" : "var(--hud-border)",
                      transition: "background 300ms ease",
                    }}
                  />
                ))}
              </div>
              <div style={{ fontFamily: "var(--hud-font-mono)", fontSize: "0.5625rem", color: "var(--hud-text-tertiary)", letterSpacing: "0.12em", marginTop: "0.5rem" }}>
                {`0${activeHeadline + 1} / 03`}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile layout (< md): simple centered layout */}
        <style>{`
          @media (max-width: 767px) {
            #hud-hero-grid { display: none !important; }
            #hud-hero-mobile { display: flex !important; }
          }
          @media (min-width: 768px) {
            #hud-hero-mobile { display: none !important; }
          }
        `}</style>

        {/* Mobile hero */}
        <div
          id="hud-hero-mobile"
          style={{
            display: "none",
            position: "absolute",
            inset: 0,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "5rem 1.5rem 2rem",
            gap: "1.5rem",
            zIndex: 1,
          }}
        >
          <div style={{ position: "relative", width: "200px", height: "260px", borderRadius: "16px", overflow: "hidden" }}>
            <Image src="/front.png" alt="Hariprashath" fill className="object-cover object-top" priority />
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "var(--hud-font-mono)", fontSize: "0.625rem", color: "var(--hud-text-tertiary)", letterSpacing: "0.12em", marginBottom: "0.75rem" }}>HI, I&apos;M HARIPRASHATH</div>
            <h1 className="hud-display" style={{ fontSize: "2.75rem" }}>CREATIVE<br />DEVELOPER</h1>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <a href="#projects" className="hud-btn-filled">View My Work</a>
            <a href="#contact" className="hud-btn-outlined">Contact Me</a>
          </div>
        </div>
      </div>
    </section>
  )
}
