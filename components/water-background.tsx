"use client"

import React from "react"

export default function WaterBackground() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none"
      aria-hidden="true"
    >
      {/* Ambient silver caustic gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.08),rgba(255,255,255,0))]" />

      {/* Large Morphing Silver Blob 1 - Top Left */}
      <div 
        className="absolute -top-24 -left-24 w-[480px] h-[480px] rounded-[50%] water-blob bg-gradient-to-tr from-white/10 via-slate-300/10 to-transparent blur-3xl opacity-60"
        style={{ animationDuration: "18s" }}
      />

      {/* Large Morphing Silver Blob 2 - Bottom Right */}
      <div 
        className="absolute -bottom-32 -right-32 w-[520px] h-[520px] rounded-[50%] water-blob bg-gradient-to-br from-slate-400/10 via-white/10 to-zinc-500/10 blur-3xl opacity-55"
        style={{ animationDuration: "22s", animationDirection: "reverse" }}
      />

      {/* Floating Center Silver Droplet - Center Left */}
      <div 
        className="absolute top-1/3 -left-20 w-[340px] h-[340px] rounded-[50%] water-blob bg-gradient-to-tr from-white/10 via-slate-400/5 to-transparent blur-2xl opacity-40"
        style={{ animationDuration: "14s" }}
      />

      {/* Floating Center Silver Droplet - Center Right */}
      <div 
        className="absolute top-2/3 -right-20 w-[380px] h-[380px] rounded-[50%] water-blob bg-gradient-to-bl from-zinc-300/10 via-white/5 to-transparent blur-2xl opacity-45"
        style={{ animationDuration: "16s", animationDirection: "reverse" }}
      />

      {/* Silver Caustic Rings */}
      <div 
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full border border-white/10 opacity-30 blur-sm rotate-bg-glow"
        style={{ animationDuration: "35s" }}
      />
      <div 
        className="absolute top-1/4 right-1/4 w-[800px] h-[800px] rounded-full border border-slate-300/5 opacity-20 blur-md rotate-bg-glow"
        style={{ animationDuration: "45s", animationDirection: "reverse" }}
      />
    </div>
  )
}
