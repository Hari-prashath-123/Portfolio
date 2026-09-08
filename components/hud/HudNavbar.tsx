"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

export default function HudNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 2rem",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(10,10,10,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--hud-border)" : "1px solid transparent",
        transition: "background 300ms ease, backdrop-filter 300ms ease, border-color 300ms ease",
      }}
    >
      {/* Left: Name */}
      <a
        href="#home"
        style={{
          fontFamily: "var(--hud-font-body)",
          fontWeight: 700,
          fontSize: "1rem",
          color: "var(--hud-text-primary)",
          textDecoration: "none",
          letterSpacing: "-0.01em",
        }}
      >
        Hariprashath<span style={{ color: "var(--hud-text-tertiary)" }}>.</span>
      </a>

      {/* Center: Nav links (desktop) */}
      <div
        style={{
          display: "flex",
          gap: "2rem",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        className="hidden md:flex"
      >
        {NAV_LINKS.map((link) => (
          <a key={link.label} href={link.href} className="hud-nav-link">
            {link.label}
          </a>
        ))}
      </div>

      {/* Right: Hire Me button */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <a href="#contact" className="hud-btn-filled hidden md:inline-flex">
          Hire Me
        </a>
        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
          style={{
            background: "none",
            border: "1px solid var(--hud-border)",
            borderRadius: "6px",
            padding: "0.4rem 0.5rem",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "18px",
                height: "1.5px",
                background: "var(--hud-text-secondary)",
                transition: "transform 200ms ease, opacity 200ms ease",
                transform:
                  menuOpen && i === 0
                    ? "rotate(45deg) translateY(8px)"
                    : menuOpen && i === 2
                    ? "rotate(-45deg) translateY(-8px)"
                    : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "64px",
            left: 0,
            right: 0,
            background: "rgba(10,10,10,0.97)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid var(--hud-border)",
            padding: "1.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--hud-font-body)",
                fontSize: "1rem",
                color: "var(--hud-text-secondary)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" className="hud-btn-filled" style={{ alignSelf: "flex-start" }} onClick={() => setMenuOpen(false)}>
            Hire Me
          </a>
        </div>
      )}
    </nav>
  )
}
