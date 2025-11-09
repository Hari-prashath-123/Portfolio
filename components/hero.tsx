"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-background via-slate-900 to-blue-950 px-4">
      <div className="max-w-6xl w-full py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className={`space-y-6 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="space-y-4">
              <div className="inline-block">
                <span className="px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold">
                  AI & Data Science Student
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-balance leading-tight text-white">
                Hariprashath B<span className="gradient-text block"> Crafting Intelligent Systems</span>
              </h1>

              <p className="text-lg md:text-xl text-blue-100 max-w-xl leading-relaxed">
                3rd-year B.Tech AI & Data Science student building agentic AI systems, generative AI solutions, and
                data-driven applications that solve real-world problems.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="#projects" className="inline-flex">
                <Button
                  size="lg"
                  className="text-base hover:shadow-lg hover:scale-105 transition-all duration-300 bg-blue-600 hover:bg-blue-700"
                >
                  Explore My Work
                </Button>
              </Link>
              <a href="#contact" className="inline-flex">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base bg-transparent border-blue-500 text-blue-300 hover:bg-blue-500/10 hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Get in Touch
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="pt-8 border-t border-blue-700/30 flex flex-col sm:flex-row gap-6 text-sm">
              <div className="hover:translate-x-1 transition-transform duration-300">
                <div className="font-semibold text-white text-lg">3rd Year</div>
                <div className="text-blue-200">B.Tech AI & Data Science</div>
              </div>
              <div className="hover:translate-x-1 transition-transform duration-300">
                <div className="font-semibold text-white text-lg">7+ Projects</div>
                <div className="text-blue-200">Production AI Systems</div>
              </div>
              <div className="hover:translate-x-1 transition-transform duration-300">
                <div className="font-semibold text-white text-lg">President</div>
                <div className="text-blue-200">AGEN Club @ KRCT</div>
              </div>
            </div>
          </div>

          {/* Right Profile Image */}
          <div
            className={`flex justify-center transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <div className="relative w-72 h-96 md:w-80 md:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-400 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-400 rounded-2xl p-1">
                <div className="relative w-full h-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/passport%20size%20photo-ZEti37X4DcgOKTdaXUDeT7pvdaMaHs.jpg"
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
