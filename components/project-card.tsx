"use client"

import { useRouter } from "next/navigation"
import { ExternalLink, Github } from "lucide-react"
import { useState } from "react"

interface ProjectCardProps {
  id: string
  title: string
  description: string
  tags: string[]
  image?: string
  repoUrl?: string
  liveUrl?: string
  year?: string
}

export default function ProjectCard({ id, title, description, tags, repoUrl, liveUrl, year }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/projects/${id}`)
  }

  return (
    <div
      onClick={handleCardClick}
      className="group relative h-full p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 cursor-pointer hover:-translate-y-2 card-shimmer overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleCardClick()
        }
      }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      <div className="space-y-4 relative z-10">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">{title}</h3>
            {year && (
              <span className="text-xs text-muted-foreground font-medium px-2 py-0.5 rounded-full bg-secondary">
                {year}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2 group-hover:text-foreground transition-colors duration-300">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-300 ${
                isHovered ? "bg-primary text-primary-foreground scale-105" : "bg-secondary text-secondary-foreground"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {(repoUrl || liveUrl) && (
          <div className="flex gap-3 pt-4">
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-all duration-300 hover:translate-x-1"
              >
                <Github className="w-4 h-4" />
                Repo
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-all duration-300 hover:translate-x-1"
              >
                <ExternalLink className="w-4 h-4" />
                Live
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
