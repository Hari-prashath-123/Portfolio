"use client"

/**
 * ProfileCard3D — Redesigned to match reference image
 *
 * Visual: Portrait card with permanent 3D tilt in perspective,
 * 2 blurred card-shaped "shadow" layers behind it at different
 * angles, and a soft ambient glow blob.
 *
 * Tuneable constants at the top of this file:
 *   BASE_TILT_Y   — how much the card leans (Y axis, default -10deg)
 *   BASE_TILT_X   — forward/back tilt (X axis, default 4deg)
 *   MAX_MOUSE     — extra mouse-follow tilt (default 6deg on top of base)
 *   LERP          — mouse smoothing (0.06 = slower/smoother)
 */

import { useEffect, useRef } from "react"
import Image from "next/image"

// ── Config ───────────────────────────────────────────────────────────────────
const BASE_TILT_Y = -10  // degrees — permanent Y lean
const BASE_TILT_X =  4   // degrees — permanent X lean
const MAX_MOUSE   =  6   // degrees extra from mouse movement
const LERP        = 0.07 // 0–1: lower = smoother lag

// ── Photos ───────────────────────────────────────────────────────────────────
// Only the front photo is shown; change to enable crossfade
const MAIN_PHOTO = "/hero-front.png"

export default function ProfileCard3D() {
  const sceneRef   = useRef<HTMLDivElement>(null)
  const cardRef    = useRef<HTMLDivElement>(null)
  const glareRef   = useRef<HTMLDivElement>(null)
  const rafRef     = useRef<number>(0)
  const tgt        = useRef({ x: BASE_TILT_X, y: BASE_TILT_Y })
  const cur        = useRef({ x: BASE_TILT_X, y: BASE_TILT_Y })

  useEffect(() => {
    const scene = sceneRef.current
    const card  = cardRef.current
    const glare = glareRef.current
    if (!scene || !card || !glare) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      card.style.transform = `perspective(1100px) rotateX(${BASE_TILT_X}deg) rotateY(${BASE_TILT_Y}deg)`
      return
    }

    // Set initial tilt so card appears tilted immediately
    cur.current = { x: BASE_TILT_X, y: BASE_TILT_Y }
    card.style.transform = `perspective(1100px) rotateX(${BASE_TILT_X}deg) rotateY(${BASE_TILT_Y}deg) translateZ(8px)`

    let hovering = false

    const applyTilt = () => {
      cur.current.x += (tgt.current.x - cur.current.x) * LERP
      cur.current.y += (tgt.current.y - cur.current.y) * LERP
      card.style.transform = `perspective(1100px) rotateX(${cur.current.x}deg) rotateY(${cur.current.y}deg) translateZ(12px)`
      rafRef.current = requestAnimationFrame(applyTilt)
    }

    const startLoop = () => { if (!hovering) { hovering = true; applyTilt() } }

    const onMove = (e: MouseEvent) => {
      const rect = scene.getBoundingClientRect()
      const nx = ((e.clientX - rect.left) / rect.width  - 0.5) * 2  // -1..+1
      const ny = ((e.clientY - rect.top)  / rect.height - 0.5) * 2

      tgt.current.x = BASE_TILT_X + ny * MAX_MOUSE
      tgt.current.y = BASE_TILT_Y - nx * MAX_MOUSE // invert X so card tilts toward cursor

      // move glare
      const px = ((e.clientX - rect.left) / rect.width)  * 100
      const py = ((e.clientY - rect.top)  / rect.height) * 100
      glare.style.opacity = "1"
      glare.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.10) 0%, transparent 55%)`
      startLoop()
    }

    const onLeave = () => {
      tgt.current = { x: BASE_TILT_X, y: BASE_TILT_Y }
      glare.style.opacity = "0"
    }

    // Run the lerp loop continuously (for the float + base tilt)
    startLoop()
    scene.addEventListener("mousemove", onMove)
    scene.addEventListener("mouseleave", onLeave)

    return () => {
      scene.removeEventListener("mousemove", onMove)
      scene.removeEventListener("mouseleave", onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="pc3-scene" ref={sceneRef} aria-hidden="true">

      {/* ── Ambient glow blob behind everything ── */}
      <div className="pc3-glow-blob" />

      {/* ── Background shadow-card 1 (furthest back, bigger offset) ── */}
      <div className="pc3-bg-card pc3-bg-card-1" />

      {/* ── Background shadow-card 2 (middle) ── */}
      <div className="pc3-bg-card pc3-bg-card-2" />

      {/* ── MAIN CARD ── */}
      <div className="pc3-card" ref={cardRef}>

        {/* Photo */}
        <Image
          src={MAIN_PHOTO}
          alt="Hariprashath B"
          fill
          className="object-cover object-top"
          priority
        />

        {/* Glass gradient overlay */}
        <div className="pc3-overlay" />

        {/* Mouse glare */}
        <div className="pc3-glare" ref={glareRef} />

        {/* HUD corner brackets */}
        <span className="pc3-corner pc3-tl" />
        <span className="pc3-corner pc3-tr" />
        <span className="pc3-corner pc3-bl" />
        <span className="pc3-corner pc3-br" />

        {/* Status chip */}
        <div className="pc3-chip">
          <span className="pc3-dot hud-dot-pulse" />
          <span className="pc3-chip-label">OPEN TO OPPORTUNITIES</span>
          <span className="pc3-chip-year">{new Date().getFullYear()}</span>
        </div>

        {/* Profile label top */}
        <div className="pc3-top-label">// PROFILE</div>

      </div>
    </div>
  )
}
