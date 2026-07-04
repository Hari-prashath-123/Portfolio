"use client"

import { useTheme } from "./theme-provider"

interface FloatingElementsProps {
  variant?: "hero" | "section" | "sparse"
}

export default function FloatingElements({ variant = "section" }: FloatingElementsProps) {
  const { theme } = useTheme()

  const isDark = theme === "dark"

  const elements = variant === "hero" ? heroElements : variant === "sparse" ? sparseElements : sectionElements

  return (
    <div className="floating-container" aria-hidden="true">
      {elements.map((el, i) => (
        <div
          key={i}
          className={`floating-element ${el.shape}`}
          style={{
            width: el.size,
            height: el.size,
            top: el.top,
            left: el.left,
            right: el.right,
            bottom: el.bottom,
            animationDelay: el.delay,
            animationDuration: el.duration,
            background: isDark ? el.darkColor : el.lightColor,
            opacity: isDark ? el.darkOpacity : el.lightOpacity,
          }}
        />
      ))}
    </div>
  )
}

interface FloatingElementConfig {
  size: string
  shape: string
  top?: string
  left?: string
  right?: string
  bottom?: string
  delay: string
  duration: string
  darkColor: string
  lightColor: string
  darkOpacity: number
  lightOpacity: number
}

const heroElements: FloatingElementConfig[] = [
  {
    size: "300px", shape: "float-circle",
    top: "10%", left: "-5%",
    delay: "0s", duration: "20s",
    darkColor: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
    lightColor: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
    darkOpacity: 1, lightOpacity: 1,
  },
  {
    size: "200px", shape: "float-circle",
    top: "60%", right: "5%",
    delay: "3s", duration: "25s",
    darkColor: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
    lightColor: "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)",
    darkOpacity: 1, lightOpacity: 1,
  },
  {
    size: "8px", shape: "float-dot",
    top: "20%", left: "15%",
    delay: "1s", duration: "15s",
    darkColor: "rgba(59,130,246,0.6)",
    lightColor: "rgba(99,102,241,0.5)",
    darkOpacity: 1, lightOpacity: 1,
  },
  {
    size: "6px", shape: "float-dot",
    top: "70%", left: "25%",
    delay: "4s", duration: "18s",
    darkColor: "rgba(6,182,212,0.5)",
    lightColor: "rgba(168,85,247,0.4)",
    darkOpacity: 1, lightOpacity: 1,
  },
  {
    size: "10px", shape: "float-dot",
    top: "40%", right: "20%",
    delay: "2s", duration: "12s",
    darkColor: "rgba(59,130,246,0.4)",
    lightColor: "rgba(99,102,241,0.35)",
    darkOpacity: 1, lightOpacity: 1,
  },
  {
    size: "4px", shape: "float-dot",
    top: "85%", right: "35%",
    delay: "5s", duration: "16s",
    darkColor: "rgba(147,197,253,0.5)",
    lightColor: "rgba(196,181,253,0.4)",
    darkOpacity: 1, lightOpacity: 1,
  },
  {
    size: "120px", shape: "float-hexagon",
    top: "30%", right: "10%",
    delay: "2s", duration: "22s",
    darkColor: "rgba(59,130,246,0.06)",
    lightColor: "rgba(99,102,241,0.05)",
    darkOpacity: 1, lightOpacity: 1,
  },
  {
    size: "80px", shape: "float-hexagon",
    bottom: "15%", left: "10%",
    delay: "6s", duration: "28s",
    darkColor: "rgba(6,182,212,0.05)",
    lightColor: "rgba(168,85,247,0.04)",
    darkOpacity: 1, lightOpacity: 1,
  },
]

const sectionElements: FloatingElementConfig[] = [
  {
    size: "200px", shape: "float-circle",
    top: "5%", right: "-3%",
    delay: "0s", duration: "22s",
    darkColor: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
    lightColor: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
    darkOpacity: 1, lightOpacity: 1,
  },
  {
    size: "6px", shape: "float-dot",
    top: "25%", left: "8%",
    delay: "2s", duration: "14s",
    darkColor: "rgba(59,130,246,0.4)",
    lightColor: "rgba(99,102,241,0.3)",
    darkOpacity: 1, lightOpacity: 1,
  },
  {
    size: "4px", shape: "float-dot",
    top: "65%", right: "12%",
    delay: "4s", duration: "16s",
    darkColor: "rgba(6,182,212,0.35)",
    lightColor: "rgba(168,85,247,0.3)",
    darkOpacity: 1, lightOpacity: 1,
  },
  {
    size: "60px", shape: "float-hexagon",
    bottom: "10%", left: "5%",
    delay: "3s", duration: "24s",
    darkColor: "rgba(59,130,246,0.04)",
    lightColor: "rgba(99,102,241,0.035)",
    darkOpacity: 1, lightOpacity: 1,
  },
]

const sparseElements: FloatingElementConfig[] = [
  {
    size: "5px", shape: "float-dot",
    top: "30%", left: "5%",
    delay: "1s", duration: "18s",
    darkColor: "rgba(59,130,246,0.3)",
    lightColor: "rgba(99,102,241,0.25)",
    darkOpacity: 1, lightOpacity: 1,
  },
  {
    size: "4px", shape: "float-dot",
    top: "60%", right: "8%",
    delay: "3s", duration: "15s",
    darkColor: "rgba(6,182,212,0.3)",
    lightColor: "rgba(168,85,247,0.25)",
    darkOpacity: 1, lightOpacity: 1,
  },
]
