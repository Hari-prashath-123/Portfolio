"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { AnimateOnScroll } from "./scroll-animations"
import FloatingElements from "./floating-elements"
import { useTheme } from "./theme-provider"
import { HolographicCard } from "@/components/ui/holographic-card"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const isDark = theme === "dark"

  return (
    <section
      className={`relative min-h-[calc(100vh-80px)] flex items-center justify-center px-4 overflow-hidden ${
        isDark ? "animated-gradient-dark" : "animated-gradient-light"
      }`}
    >
      {/* Floating background elements */}
      <FloatingElements variant="hero" />

      <div className="max-w-6xl w-full py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center md:[grid-template-columns:auto_1fr]">
          {/* LEFT: Profile Card — matches reference image layout */}
          <div
            className={`flex justify-center transition-all duration-1000 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <HolographicCard
              glowVariant="white"
              portrait={true}
              interactive={true}
              className="w-72 sm:w-80"
              cardClassName="h-[340px] sm:h-[370px] p-2"
            >
              {/* Photo Area — badge overlaid at bottom */}
              <div className="relative w-full h-full overflow-hidden rounded-[22px]">
                <Image
                  src="/Profile.jpeg"
                  alt="Hariprashath B - Profile Photo"
                  fill
                  className="object-cover object-top"
                  priority
                />

                {/* Dark gradient vignette from bottom so badge is readable */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                {/* Status Pill Badge — absolute overlay on photo, bottom */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 z-20">
                  <div className="water-glass-pill rounded-xl px-4 py-2.5 flex items-center justify-between border border-white/25 shadow-2xl backdrop-blur-xl bg-black/60">
                    <div className="flex items-center gap-2.5">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="status-dot-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                      </span>
                      <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-white/95">
                        OPEN TO OPPORTUNITIES
                      </span>
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold text-white/60 tracking-wider font-mono">
                      2026
                    </span>
                  </div>
                </div>
              </div>
            </HolographicCard>
          </div>

          {/* RIGHT: Text content */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="space-y-4">
              <div className="inline-block">
                <span className="hud-tag">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-200 animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  AI Engineer &amp; Full-Stack Architect
                </span>
              </div>

              {/* Name is the primary anchor — large and bold */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight text-white">
                Hariprashath B
              </h1>

              {/* Subtitle is smaller — de-emphasised relative to name */}
              <p className="text-base sm:text-lg md:text-xl font-medium text-slate-300/80 tracking-wide">
                Crafting Intelligent Systems
              </p>

              <p className="text-base sm:text-lg max-w-lg leading-relaxed text-white/70">
                Final-year B.Tech AI &amp; Data Science student building agentic AI systems, generative AI solutions, and
                full-stack platforms that solve real-world problems.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="#projects" className="inline-flex">
                <button type="button" className="hud-pill-btn px-6 py-3 text-sm">
                  Explore My Work
                </button>
              </Link>
              <a href="#contact" className="inline-flex">
                <button
                  type="button"
                  className="hud-tag px-6 py-3 text-sm text-white/90 hover:text-white border-white/20 hover:border-white/40 hover:bg-white/10 transition-all font-sans"
                >
                  Get in Touch
                </button>
              </a>
            </div>

            {/* Stats */}
            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4 text-sm">
                <div className="hud-card p-4 rounded-2xl flex-1 hover:-translate-y-1 transition-all duration-300">
                  <div className="font-bold text-lg text-white">Final Year</div>
                  <div className="text-white/50 text-xs">B.Tech AI &amp; Data Science</div>
                </div>
                <div className="hud-card p-4 rounded-2xl flex-1 hover:-translate-y-1 transition-all duration-300">
                  <div className="font-bold text-lg text-white">8+ Projects</div>
                  <div className="text-white/50 text-xs">Production AI Systems</div>
                </div>
                <div className="hud-card p-4 rounded-2xl flex-1 hover:-translate-y-1 transition-all duration-300">
                  <div className="font-bold text-lg text-white">President</div>
                  <div className="text-white/50 text-xs">AGEN Club @ KRCT</div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  )
}
