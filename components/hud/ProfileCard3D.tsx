"use client"

/**
 * ProfileCard3D — v3
 *
 * Architecture (separation of concerns):
 *   .pc3-scene              → perspective container, overflow: visible
 *   .pc3-glow-blob          → soft ambient glow, CSS animated independently
 *   .pc3-bg-card-1/2        → shadow cards behind main, CSS animated independently
 *   .pc3-float-wrap         → ONLY handles vertical float (translateY) via CSS animation
 *     .pc3-card             → ONLY handles 3D tilt via JS transform
 *       image + overlays
 *
 * This way CSS float and JS tilt NEVER write to the same element's transform.
 *
 * Tuning:
 *   BASE_TILT_Y  — permanent Y lean, matches reference left-leaning (default -12)
 *   BASE_TILT_X  — permanent X tilt forward (default 5)
 *   MAX_MOUSE    — extra degrees from mouse (default 6)
 *   LERP         — mouse smoothing lag (default 0.08)
 *   PERSPECTIVE  — 3D depth (default 1000px)
 */

import { useEffect, useRef } from "react"
import Image from "next/image"

const BASE_TILT_Y  = -12   // permanent Y lean — negative = leans left like reference
const BASE_TILT_X  =  5    // permanent forward pitch
const MAX_MOUSE    =  6    // max extra degrees from mouse
const LERP         =  0.08
const PERSPECTIVE  = 1000

const PHOTO = "/hero-front.png"

export default function ProfileCard3D() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const cardRef  = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const rafRef   = useRef<number>(0)
  const tgt      = useRef({ x: BASE_TILT_X, y: BASE_TILT_Y })
  const cur      = useRef({ x: BASE_TILT_X, y: BASE_TILT_Y })
  const looping  = useRef(false)

  const buildTransform = (rx: number, ry: number) =>
    `perspective(${PERSPECTIVE}px) rotateX(${rx}deg) rotateY(${ry}deg)`

  useEffect(() => {
    const scene = sceneRef.current
    const card  = cardRef.current
    const glare = glareRef.current
    if (!scene || !card || !glare) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Apply base tilt immediately so card isn't flat on load
    card.style.transform = buildTransform(BASE_TILT_X, BASE_TILT_Y)

    if (reduced) return

    const loop = () => {
      cur.current.x += (tgt.current.x - cur.current.x) * LERP
      cur.current.y += (tgt.current.y - cur.current.y) * LERP
      card.style.transform = buildTransform(cur.current.x, cur.current.y)

      const dx = Math.abs(tgt.current.x - cur.current.x)
      const dy = Math.abs(tgt.current.y - cur.current.y)
      if (dx > 0.02 || dy > 0.02) {
        rafRef.current = requestAnimationFrame(loop)
      } else {
        looping.current = false
        card.style.transform = buildTransform(tgt.current.x, tgt.current.y)
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
      tgt.current.x = BASE_TILT_X + ny * MAX_MOUSE
      tgt.current.y = BASE_TILT_Y - nx * MAX_MOUSE

      // Move glare to cursor position
      const px = ((e.clientX - rect.left) / rect.width)  * 100
      const py = ((e.clientY - rect.top)  / rect.height) * 100
      glare.style.opacity = "1"
      glare.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.12) 0%, transparent 55%)`
      startLoop()
    }

    const onLeave = () => {
      tgt.current = { x: BASE_TILT_X, y: BASE_TILT_Y }
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

      {/* Ambient glow blob */}
      <div className="pc3-glow-blob" />

      {/* Shadow cards — behind main card, independently animated */}
      <div className="pc3-bg-card pc3-bg-1" />
      <div className="pc3-bg-card pc3-bg-2" />

      {/* Float wrapper — only CSS translateY, no transform conflict */}
      <div className="pc3-float-wrap">

        {/* Main card — only JS 3D tilt written here */}
        <div className="pc3-card" ref={cardRef}>

          {/* Photo */}
          <Image
            src={PHOTO}
            alt="Hariprashath B"
            fill
            className="object-cover object-top"
            priority
          />

          {/* Glass gradient */}
          <div className="pc3-overlay" />

          {/* Mouse glare */}
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
