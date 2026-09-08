"use client"

import { useEffect, useState } from "react"

export default function Preloader() {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    // Only show once per session
    if (sessionStorage.getItem("hud_loaded")) {
      setHidden(true)
      return
    }

    const duration = 1800 // ms
    const interval = 16
    const steps = duration / interval
    let step = 0

    const timer = setInterval(() => {
      step++
      setCount(Math.min(Math.round((step / steps) * 100), 100))
      if (step >= steps) {
        clearInterval(timer)
        setTimeout(() => {
          setDone(true)
          setTimeout(() => {
            setHidden(true)
            sessionStorage.setItem("hud_loaded", "1")
          }, 400)
        }, 200)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  if (hidden) return null

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "var(--hud-bg)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        transition: done ? "opacity 0.4s ease, transform 0.4s ease" : "none",
        opacity: done ? 0 : 1,
        transform: done ? "translateY(-12px)" : "translateY(0)",
        pointerEvents: done ? "none" : "all",
      }}
    >
      {/* Top corners */}
      <div style={{ position: "absolute", top: "2rem", left: "2rem", fontFamily: "var(--hud-font-mono)", fontSize: "0.625rem", color: "var(--hud-text-tertiary)", letterSpacing: "0.15em" }}>
        INITIALIZING SYSTEM
      </div>
      <div style={{ position: "absolute", top: "2rem", right: "2rem", fontFamily: "var(--hud-font-mono)", fontSize: "0.625rem", color: "var(--hud-text-tertiary)", letterSpacing: "0.15em" }}>
        PORTFOLIO {new Date().getFullYear()}
      </div>

      {/* Center content */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{ fontFamily: "var(--hud-font-display)", fontSize: "clamp(2.5rem, 8vw, 5rem)", lineHeight: 1, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
          <span style={{ color: "var(--hud-text-primary)" }}>HARIPRASHATH</span>
          <span style={{ color: "var(--hud-text-tertiary)" }}> B</span>
        </div>
        <div style={{ fontFamily: "var(--hud-font-mono)", fontSize: "0.6875rem", color: "var(--hud-text-tertiary)", letterSpacing: "0.25em" }}>
          AI ENGINEER · FULL-STACK DEVELOPER
        </div>
      </div>

      {/* Counter */}
      <div style={{ fontFamily: "var(--hud-font-display)", fontSize: "clamp(4rem, 15vw, 9rem)", lineHeight: 1, color: "var(--hud-text-primary)", marginBottom: "1.5rem" }}>
        {String(count).padStart(3, "0")}%
      </div>

      {/* Progress bar */}
      <div style={{ width: "min(400px, 80vw)", height: "1px", background: "var(--hud-border)", marginBottom: "0.75rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${count}%`, background: "var(--hud-text-primary)", transition: "width 0.016s linear" }} />
      </div>

      {/* Bottom status */}
      <div style={{ display: "flex", justifyContent: "space-between", width: "min(400px, 80vw)" }}>
        <span style={{ fontFamily: "var(--hud-font-mono)", fontSize: "0.5625rem", color: "var(--hud-text-tertiary)", letterSpacing: "0.15em" }}>LOADING MODULES...</span>
        <span style={{ fontFamily: "var(--hud-font-mono)", fontSize: "0.5625rem", color: "var(--hud-text-tertiary)", letterSpacing: "0.15em" }}>SECURE CONNECTION</span>
      </div>
    </div>
  )
}
