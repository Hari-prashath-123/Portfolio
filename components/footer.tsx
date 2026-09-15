"use client"

import type { ContactData } from "@/lib/portfolio-data"

export default function Footer({ name, contact }: { name?: string; contact?: ContactData }) {
  const currentYear = new Date().getFullYear()
  const authorName = name || "Hariprashath B"
  const githubUrl = contact?.github || "https://github.com/Hari-prashath-123"
  const linkedinUrl = contact?.linkedin || "https://linkedin.com/in/hariprashath-b-3029s/"
  const email = contact?.email || "hariprashath321@gmail.com"

  return (
    <footer className="relative bg-[#05070b] border-t border-white/10 py-8 px-4 sm:px-6 lg:px-8 z-20">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/60">
        <p>© {currentYear} {authorName}. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white hover:underline transition-colors duration-200"
          >
            GitHub
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white hover:underline transition-colors duration-200"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${email}`}
            className="text-white/70 hover:text-white hover:underline transition-colors duration-200"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
