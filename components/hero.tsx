"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { AnimateOnScroll } from "./scroll-animations"
import FloatingElements from "./floating-elements"
import { useTheme } from "./theme-provider"

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
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className={`space-y-6 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="space-y-4">
              <div className="inline-block">
                <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                  isDark
                    ? "bg-blue-500/20 text-blue-300"
                    : "bg-indigo-500/15 text-indigo-600"
                }`}>
                  AI Engineer | Full-Stack Developer
                </span>
              </div>
              <h1 className={`text-5xl md:text-6xl font-bold text-balance leading-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}>
                Hariprashath B<span className="gradient-text block"> Crafting Intelligent Systems</span>
              </h1>

              <p className={`text-lg md:text-xl max-w-xl leading-relaxed ${
                isDark ? "text-blue-100" : "text-slate-600"
              }`}>
                Final-year B.Tech AI & Data Science student building agentic AI systems, generative AI solutions, and
                full-stack platforms that solve real-world problems.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="#projects" className="inline-flex">
                <Button
                  size="lg"
                  className={`text-base hover:shadow-lg hover:scale-105 transition-all duration-300 ${
                    isDark ? "bg-blue-600 hover:bg-blue-700" : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
                >
                  Explore My Work
                </Button>
              </Link>
              <a href="#contact" className="inline-flex">
                <Button
                  size="lg"
                  variant="outline"
                  className={`text-base bg-transparent hover:shadow-lg hover:scale-105 transition-all duration-300 ${
                    isDark
                      ? "border-blue-500 text-blue-300 hover:bg-blue-500/10"
                      : "border-indigo-500 text-indigo-600 hover:bg-indigo-500/10"
                  }`}
                >
                  Get in Touch
                </Button>
              </a>
            </div>

            {/* Stats */}
            <AnimateOnScroll animation="fade-up" delay={400}>
              <div className={`pt-8 border-t flex flex-col sm:flex-row gap-6 text-sm ${
                isDark ? "border-blue-700/30" : "border-indigo-200"
              }`}>
                <div className="hover:translate-x-1 transition-transform duration-300">
                  <div className={`font-semibold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>Final Year</div>
                  <div className={isDark ? "text-blue-200" : "text-slate-500"}>B.Tech AI & Data Science</div>
                </div>
                <div className="hover:translate-x-1 transition-transform duration-300">
                  <div className={`font-semibold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>8+ Projects</div>
                  <div className={isDark ? "text-blue-200" : "text-slate-500"}>Production AI Systems</div>
                </div>
                <div className="hover:translate-x-1 transition-transform duration-300">
                  <div className={`font-semibold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>President</div>
                  <div className={isDark ? "text-blue-200" : "text-slate-500"}>AGEN Club @ KRCT</div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Right Profile Image */}
          <div
            className={`flex justify-center transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <div className="relative w-72 h-96 md:w-80 md:h-96">
              <div className={`absolute inset-0 rounded-2xl blur-xl glow-pulse ${
                isDark
                  ? "bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-400"
                  : "bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-300"
              }`} />
              <div className={`absolute inset-0 rounded-2xl p-1 ${
                isDark
                  ? "bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-400"
                  : "bg-gradient-to-br from-indigo-500 via-purple-400 to-pink-400"
              }`}>
                <div className={`relative w-full h-full rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300 ${
                  isDark ? "bg-slate-900" : "bg-white"
                }`}>
                  <Image
                    src="/Profile.jpeg"
                    alt="Hariprashath B - Profile Photo"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
