"use client"

import { AnimateOnScroll } from "./scroll-animations"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <AnimateOnScroll animation="fade-up">
      <footer className="border-t border-border bg-card py-8 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} Hariprashath B. All rights reserved.</p>
          <div className="flex gap-6">
            <a
              href="https://github.com/Hari-prashath-123"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors hover:translate-y-[-2px] transition-transform duration-300"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/hariprashath-b-3029s/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors hover:translate-y-[-2px] transition-transform duration-300"
            >
              LinkedIn
            </a>
            <a href="mailto:hariprashath321@gmail.com" className="hover:text-foreground transition-colors hover:translate-y-[-2px] transition-transform duration-300">
              Email
            </a>
          </div>
        </div>
      </footer>
    </AnimateOnScroll>
  )
}
