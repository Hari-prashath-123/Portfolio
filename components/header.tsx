"use client"

import Link from "next/link"
import { useState } from "react"
import { useTheme } from "./theme-provider"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const navItems = [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-[#07090e]/75 backdrop-blur-2xl border-b border-white/10 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand / Name Logo matching reference Sushmita . style */}
        <Link href="/" className="flex items-center gap-1.5 group">
          <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white group-hover:text-white/90 transition-colors">
            Hariprashath
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-white ml-0.5 animate-pulse" />
        </Link>

        {/* Desktop Navigation - Centered Minimal Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right CTA Button & Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.828-2.828a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm.707 6.364l-.707-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414zm-7.071 0a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM9 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4-9a1 1 0 00-1-1H3a1 1 0 000 2h1a1 1 0 001-1zm13 0a1 1 0 00-1-1h-1a1 1 0 000 2h1a1 1 0 001-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
          <a
            href="#contact"
            className="hud-tag px-5 py-2 hover:bg-white/15 hover:text-white border border-white/20 hover:border-white/40 transition-all text-xs font-semibold text-white/90 shadow-sm"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-white/70 hover:text-white"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.828-2.828a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm.707 6.364l-.707-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414zm-7.071 0a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM9 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4-9a1 1 0 00-1-1H3a1 1 0 000 2h1a1 1 0 001-1zm13 0a1 1 0 00-1-1h-1a1 1 0 000 2h1a1 1 0 001-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
          <button
            className="p-2 text-white/80"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#07090e]/95 backdrop-blur-2xl border-b border-white/10 md:hidden animate-in fade-in slide-in-from-top-2">
            <nav className="flex flex-col gap-4 p-5">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-base font-medium text-white/80 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="#contact"
                className="hud-pill-btn w-full mt-2"
                onClick={() => setIsOpen(false)}
              >
                Hire Me
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
