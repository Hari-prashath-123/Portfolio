"use client"

import React, { useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface HolographicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  cardClassName?: string
  glowClassName?: string
  glowVariant?: "cyan" | "purple" | "emerald" | "amber" | "white"
  interactive?: boolean
  portrait?: boolean
  cardVariant?: "glass" | "solid-black"
}

export function HolographicCard({
  children,
  className,
  cardClassName,
  glowClassName,
  glowVariant = "white",
  interactive = true,
  portrait = true,
  cardVariant = "glass",
  ...props
}: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  // Normal facing straightly (0 deg sideways tilt)
  const baseTiltY = 0
  const baseTiltX = 0
  const baseTiltZ = 0

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    // Interactive mouse tilt offset when hovering
    const maxTilt = 8 // degrees of dynamic movement
    const tiltX = -(y / (rect.height / 2)) * maxTilt
    const tiltY = (x / (rect.width / 2)) * maxTilt

    setMouseOffset({ x: tiltY, y: tiltX })
  }

  const { onMouseEnter, onMouseLeave, ...restProps } = props

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (interactive) setIsHovered(true)
    onMouseEnter?.(e)
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (interactive) {
      setIsHovered(false)
      setMouseOffset({ x: 0, y: 0 })
    }
    onMouseLeave?.(e)
  }

  // Color profiles for the rotating glowing blurred card behind - white/silver luminous blur
  const glowGradients = {
    cyan: "from-white via-slate-100/80 to-slate-300/50",
    purple: "from-white via-purple-100/80 to-indigo-300/50",
    emerald: "from-white via-emerald-100/80 to-teal-300/50",
    amber: "from-white via-amber-100/80 to-orange-300/50",
    white: "from-white via-slate-100/90 to-white/80",
  }

  // Calculated 3D transform for main front card:
  // Normal straight-facing when not hovered, responsive cursor tilt when hovered
  const currentTransform = isHovered
    ? `perspective(1000px) rotateY(${mouseOffset.x}deg) rotateX(${mouseOffset.y}deg) scale3d(1.02, 1.02, 1.02)`
    : `perspective(1000px) rotateY(0deg) rotateX(0deg) rotateZ(0deg)`

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        /* isolate keeps stacking context strictly local to this card */
        "relative perspective-1200 group group/holo select-none flex items-center justify-center isolate transition-all duration-300 ease-out",
        portrait && "w-full max-w-[340px]",
        className
      )}
      {...restProps}
    >
      {/* 
        ========================================================================
        CARD BEHIND IT: Rotating Blurred & Shaded Card (Matches Reference Photo)
        ========================================================================
      */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10"
        aria-hidden="true"
      >
        {/* Rotating shaded blur shape — smooth, volumetric shaded light around the card */}
        <div 
          className="relative w-[96%] h-[96%] flex items-center justify-center rotate-clockwise-smooth"
        >
          {/* Layer 1: Wide diffuse shaded halo (blur-3xl, soft feathered edge) */}
          <div
            className={cn(
              "absolute inset-0 rounded-[40px] blur-3xl opacity-50 group-hover/holo:opacity-75 transition-opacity duration-500 bg-gradient-to-tr",
              glowGradients[glowVariant],
              glowClassName
            )}
          />

          {/* Layer 2: Shaded card silhouette — diagonal shaded gradient without hard borders (blur-2xl) */}
          <div
            className="absolute inset-2 rounded-[32px] blur-2xl opacity-65 group-hover/holo:opacity-85 transition-opacity duration-500 bg-gradient-to-br from-white/90 via-slate-200/50 to-transparent"
          />

          {/* Layer 3: Concentrated luminous core (blur-xl, shaded white/silver core) */}
          <div
            className="absolute inset-5 rounded-[26px] blur-xl opacity-60 group-hover/holo:opacity-80 transition-opacity duration-500 bg-white/70"
          />
        </div>
      </div>

      {/* 
        ========================================================================
        MAIN CARD IN FRONT: Solid Black or Glass UI based on cardVariant
        ========================================================================
      */}
      <div
        className={cn(
          "relative w-full rounded-[28px] overflow-hidden preserve-3d shadow-2xl transition-all duration-300 ease-out",
          cardVariant === "solid-black"
            ? "bg-[#0b0d13] border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)]"
            : "water-glass-card",
          cardClassName
        )}
        style={{
          transform: currentTransform,
          transformStyle: "preserve-3d",
        }}
      >
        {cardVariant === "glass" && (
          <>
            {/* Top specular reflection / liquid sheen line */}
            <div 
              className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none z-30"
              aria-hidden="true"
            />

            {/* Diagonal liquid glass sheen overlay on hover */}
            <div 
              className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none opacity-40 group-hover/holo:opacity-80 transition-opacity duration-700 -rotate-45"
              aria-hidden="true"
            />
          </>
        )}

        {/* 
          Elevated inner container to maintain 100% readability 
        */}
        <div 
          className="relative z-10 h-full w-full flex flex-col"
          style={{ transform: "translateZ(24px)" }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
