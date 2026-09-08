"use client"

/**
 * ProfileCard3D — v4 (reliable)
 *
 * Permanent base tilt is applied via CSS class (not JS) so the card is
 * always visually tilted even before JS hydrates. JS only adds the mouse
 * follow delta on top of the CSS base transform.
 *
 * Layer stack:
 *   .pc3-scene            → perspective container
 *   .pc3-glow-blob        → ambient glow, CSS animated
 *   .pc3-bg-1             → back shadow card, CSS animated (visible offset)
 *   .pc3-bg-2             → mid shadow card, CSS animated
 *   .pc3-float-wrap       → vertical float wrapper (CSS translateY)
 *     .pc3-card.pc3-tilted→ base tilt via CSS class; mouse-follow overrides via JS
 *
 * Tuning:
 *   MAX_MOUSE  — extra tilt from mouse (degrees, default 6)
 *   LERP       — mouse lag (0–1, default 0.08)
 */

import { useEffect, useRef } from "react"
import Image from "next/image"

const MAX_MOUSE = 6
const LERP      = 0.08

export default function ProfileCard3D() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const cardRef  = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const rafRef   = useRef<number>(0)
  const tgt      = useRef({ x: 5, y: -12 })  // matches CSS base
  const cur      = useRef({ x: 5, y: -12 })
  const looping  = useRef(false)

  useEffect(() => {
    const scene = sceneRef.current
    const card  = cardRef.current
    const glare = glareRef.current
    if (!scene || !card || !glare) return

    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const loop = () => {
      cur.current.x += (tgt.current.x - cur.current.x) * LERP
      cur.current.y += (tgt.current.y - cur.current.y) * LERP

      // Override the CSS class transform with JS while mouse is near
      card.style.transform =
        `perspective(1000px) rotateX(${cur.current.x}deg) rotateY(${cur.current.y}deg)`

      const dx = Math.abs(tgt.current.x - cur.current.x)
      const dy = Math.abs(tgt.current.y - cur.current.y)

      if (dx > 0.03 || dy > 0.03) {
        rafRef.current = requestAnimationFrame(loop)
      } else {
        looping.current = false
        // Back to base tilt — remove inline style so CSS class resumes
        card.style.transform = ""
      }
    }

    const startLoop = () => {
      if (!looping.current) {
        looping.current = true
        rafRef.current = requestAnimationFrame(loop)
      }
    }

    const onMove = (e: MouseEvent) => {
      const rect = scene.getBoundingClientRect()
      const nx = ((e.clientX - rect.left)  / rect.width  - 0.5) * 2
      const ny = ((e.clientY - rect.top)   / rect.height - 0.5) * 2
      // Add mouse delta on top of base tilt
      tgt.current.x = 5  + ny * MAX_MOUSE
      tgt.current.y = -12 - nx * MAX_MOUSE

      const px = ((e.clientX - rect.left) / rect.width)  * 100
      const py = ((e.clientY - rect.top)  / rect.height) * 100
      glare.style.opacity = "1"
      glare.style.background =
        `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.12) 0%, transparent 55%)`
      startLoop()
    }

    const onLeave = () => {
      tgt.current = { x: 5, y: -12 }
      glare.style.opacity = "0"
      startLoop()
    }

    scene.addEventListener("mousemove", onMove)
    scene.addEventListener("mouseleave", onLeave)
    return () => {
      scene.removeEventListener("mousemove", onMove)
      scene.removeEventListener("mouseleave", onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="pc3-scene" ref={sceneRef}>

      {/* Ambient glow blob — independent CSS animation */}
      <div className="pc3-glow-blob" />

      {/* Shadow cards behind main — independent CSS animations */}
      <div className="pc3-bg-card pc3-bg-1" />
      <div className="pc3-bg-card pc3-bg-2" />

      {/* Float wrapper: only translateY lives here */}
      <div className="pc3-float-wrap">

        {/* Main card: CSS class applies base tilt; JS overrides on hover */}
        <div className="pc3-card pc3-tilted" ref={cardRef}>

          <Image
            src="/hero-front.png"
            alt="Hariprashath B"
            fill
            className="object-cover object-top"
            priority
          />

          {/* Glass gradient overlay */}
          <div className="pc3-overlay" />

          {/* Mouse glare highlight */}
          <div className="pc3-glare" ref={glareRef} />

          {/* HUD corner brackets */}
          <span className="pc3-c pc3-tl" />
          <span className="pc3-c pc3-tr" />
          <span className="pc3-c pc3-bl" />
          <span className="pc3-c pc3-br" />

          {/* Status chip */}
          <div className="pc3-chip">
            <span className="pc3-dot hud-dot-pulse" />
            <span className="pc3-chip-label">OPEN TO OPPORTUNITIES</span>
            <span className="pc3-chip-year">{new Date().getFullYear()}</span>
          </div>

        </div>
      </div>
    </div>
  )
}
