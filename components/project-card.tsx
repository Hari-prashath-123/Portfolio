"use client"

import { useRouter } from "next/navigation"
import { ArrowUpRight } from "lucide-react"

interface ProjectCardProps {
  id: string
  projectIndex?: string
  category?: string
  title: string
  description: string
  tags: string[]
  repoUrl?: string
  liveUrl?: string
  year?: string
}

export default function ProjectCard({
  id,
  projectIndex = "01",
  category = "Engineering",
  title,
  description,
  tags,
  repoUrl,
  liveUrl,
}: ProjectCardProps) {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/projects/${id}`)
  }

  return (
    <div
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleCardClick()
        }
      }}
      /* When hovering a card, pause the parent marquee track via CSS group */
      className="hud-card group rounded-[28px] p-6 sm:p-7 flex flex-col justify-between h-full cursor-pointer hover:border-white/30 hover:-translate-y-2 hover:shadow-[0_8px_40px_rgba(255,255,255,0.1)] transition-all duration-300 relative overflow-hidden [.marquee-track:hover_&]:![animation-play-state:paused]"
    >
      {/* Top subtle light reflection */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      <div>
        {/* Top Meta Row: // PROJECT 01 and Category Pill */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <span className="font-mono text-xs font-semibold text-white/50 tracking-widest uppercase">
            // PROJECT {projectIndex}
          </span>
          <span className="hud-tag text-[10px] sm:text-[11px] py-1 px-3 bg-white/[0.04] text-white/70 border-white/10 group-hover:border-white/20 transition-all">
            {category}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-white/95 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/60 line-clamp-3 leading-relaxed mb-6 group-hover:text-white/75 transition-colors">
          {description}
        </p>
      </div>

      {/* Bottom Row: Tech Chips and CODE -> Action Button */}
      <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
        {/* Tech Badges */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/[0.03] text-white/75 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Code / Details Button matching Screenshot 4 CODE -> */}
        <div className="ml-auto">
          {repoUrl ? (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="hud-tag text-[11px] py-1.5 px-3 bg-white/[0.06] hover:bg-white/15 text-white/90 hover:text-white border border-white/15 hover:border-white/30 transition-all inline-flex items-center gap-1 font-mono uppercase"
            >
              CODE <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="hud-tag text-[11px] py-1.5 px-3 bg-white/[0.06] text-white/90 border border-white/15 inline-flex items-center gap-1 font-mono uppercase">
              VIEW <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
