"use client"

/**
 * ProfileCard3D
 * ─────────────
 * Premium 3D floating profile card with:
 *  • 2 rotating translucent background layers (CSS animation)
 *  • Conic-gradient glow spinning behind everything
 *  • Mouse-follow tilt (requestAnimationFrame, no React re-renders)
 *  • Scan-line + HUD corner brackets
 *  • Floating animation with auto-pause on hover
 *  • Slow crossfade photo cycle through all 5 hero photos (optional)
 *  • prefers-reduced-motion support via CSS
 *
 * To change animation speed:
 *   background layer 1 → globals.css: pc-bg1-rotate  (default 10s)
 *   background layer 2 → globals.css: pc-bg2-rotate  (default 14s)
 *   glow spin          → globals.css: pc-glow-spin   (default 12s)
 *   float              → globals.css: pc-float        (default 6s)
 *   photo cycle        → PHOTO_INTERVAL_MS           (default 5000ms)
 *
 * To change tilt intensity: MAX_TILT constant (default 7 degrees)
 *
 * To replace images: update PHOTOS array below.
 */

import { useEffect, useRef } from "react"
import Image from "next/image"

// ── Photos — in 360° turn order ──────────────────────────────────────────────
const PHOTOS = [
  "/hero-front.png",
  "/hero-45left.png",
  "/hero-leftside.png",
  "/hero-back45left.png",
  "/hero-back.png",
  "/hero-back45right.png",
  "/hero-rightside.png",
]
// Only front-facing photos used in the slow card cycle (2 = front + 45left)
const CARD_PHOTOS = [PHOTOS[0], PHOTOS[1], PHOTOS[0], PHOTOS[6], PHOTOS[0]]
const PHOTO_INTERVAL_MS = 5000 // ms between crossfade steps

// ── Tilt config ───────────────────────────────────────────────────────────────
const MAX_TILT = 7 // degrees
const LERP_SPEED = 0.08 // 0-1, lower = smoother lag

export default function ProfileCard3D() {
  const sceneRef  = useRef<HTMLDivElement>(null)
  const cardRef   = useRef<HTMLDivElement>(null)
  const glareRef  = useRef<HTMLDivElement>(null)
  const rafRef    = useRef<number>(0)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef= useRef({ x: 0, y: 0 })

  // ── Photo crossfade ──────────────────────────────────────────────────────
  const imgRefs = useRef<(HTMLDivElement | null)[]>([])
  const photoIdx = useRef(0)

  useEffect(() => {
    // Respect prefers-reduced-motion for photo cycle
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const advance = () => {
      const imgs = imgRefs.current
      if (!imgs.length) return
      const prev = photoIdx.current
      const next = (prev + 1) % CARD_PHOTOS.length
      if (imgs[prev]) { imgs[prev]!.style.opacity = "0" }
      if (imgs[next]) { imgs[next]!.style.opacity = "1" }
      photoIdx.current = next
    }

    const id = setInterval(advance, PHOTO_INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  // ── Mouse-follow tilt ────────────────────────────────────────────────────
  useEffect(() => {
    const scene = sceneRef.current
    const card  = cardRef.current
    const glare = glareRef.current
    if (!scene || !card || !glare) return

    // Skip mouse interaction if reduced motion preferred
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let animating = false

    const onMouseMove = (e: MouseEvent) => {
      const rect = scene.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top  + rect.height / 2
      // normalise -1..+1
      const nx = (e.clientX - cx) / (rect.width / 2)
      const ny = (e.clientY - cy) / (rect.height / 2)

      targetRef.current.x = ny * MAX_TILT   // rotateX
      targetRef.current.y = -nx * MAX_TILT  // rotateY (inverted)

      // Move glare origin
      const px = ((e.clientX - rect.left) / rect.width) * 100
      const py = ((e.clientY - rect.top)  / rect.height) * 100
      glare.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.12) 0%, transparent 60%)`

      if (!animating) {
        animating = true
        card.classList.add("pc-interacting")
        loop()
      }
    }

    const onMouseLeave = () => {
      targetRef.current.x = 0
      targetRef.current.y = 0
      glare.style.background = "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)"
    }

    const loop = () => {
      // Lerp towards target
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * LERP_SPEED
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * LERP_SPEED

      const rx = currentRef.current.x
      const ry = currentRef.current.y
      const dist = Math.sqrt(rx * rx + ry * ry)

      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(16px)`

      // Keep looping until basically still
      if (dist > 0.03) {
        rafRef.current = requestAnimationFrame(loop)
      } else {
        animating = false
        card.classList.remove("pc-interacting")
        card.style.transform = ""
      }
    }

    scene.addEventListener("mousemove", onMouseMove)
    scene.addEventListener("mouseleave", onMouseLeave)

    return () => {
      scene.removeEventListener("mousemove", onMouseMove)
      scene.removeEventListener("mouseleave", onMouseLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="profile-card-scene" ref={sceneRef} aria-hidden="true">

      {/* ── Layer 0: conic glow ── */}
      <div className="profile-card-glow" />

      {/* ── Layer 1: furthest background card ── */}
      <div className="profile-card-background-1" />

      {/* ── Layer 2: middle background card ── */}
      <div className="profile-card-background-2" />

      {/* ── Layer 3: MAIN CARD ── */}
      <div className="profile-card" ref={cardRef}>

        {/* Photo stack — crossfade between CARD_PHOTOS */}
        {CARD_PHOTOS.map((src, i) => (
          <div
            key={`${src}-${i}`}
            ref={el => { imgRefs.current[i] = el }}
            style={{
              position: "absolute",
              inset: 0,
              opacity: i === 0 ? 1 : 0,
              transition: "opacity 1.2s ease",
            }}
          >
            <Image
              src={src}
              alt="Hariprashath B"
              fill
              className="object-cover object-top"
              priority={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}

        {/* Glass gradient overlay */}
        <div className="profile-card-overlay" />

        {/* Mouse-follow glare */}
        <div className="profile-card-highlight" ref={glareRef} />

        {/* Scan line */}
        <div className="profile-card-scanline" />

        {/* HUD corner brackets */}
        <div className="profile-card-corner tl" />
        <div className="profile-card-corner tr" />
        <div className="profile-card-corner bl" />
        <div className="profile-card-corner br" />

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
            background: "rgba(10,10,10,0.85)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "10px",
            padding: "0.5rem 0.75rem",
            zIndex: 5,
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

        {/* Tiny PROFILE label top-center */}
        <div
          style={{
            position: "absolute",
            top: "0.625rem",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "var(--hud-font-mono)",
            fontSize: "0.4375rem",
            letterSpacing: "0.25em",
            color: "rgba(245,245,245,0.3)",
            zIndex: 5,
            whiteSpace: "nowrap",
          }}
        >
          // PROFILE
        </div>

      </div>
      {/* end .profile-card */}

    </div>
    // end .profile-card-scene
  )
}
