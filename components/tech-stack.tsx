"use client"

import { AnimateOnScroll } from "./scroll-animations"
import type { SkillsData } from "@/lib/portfolio-data"

const DEFAULT_ROW_1 = [
  "Tailwind CSS",
  "Bootstrap",
  "Node.js",
  "Express.js",
  "Java",
  "Python",
  "REST APIs",
  "JWT Auth",
  "MySQL",
  "MongoDB",
  "PostgreSQL",
  "Docker",
  "TypeScript",
  "React",
  "Next.js",
]

const DEFAULT_ROW_2 = [
  "LLMs",
  "Computer Vision",
  "Prompt Engineering",
  "Machine Learning",
  "NLP",
  "Generative AI",
  "Agentic AI",
  "Deep Learning",
  "TensorFlow",
  "PyTorch",
  "Hugging Face",
  "Autonomous Agents",
  "LangChain",
  "Vector DBs",
]

export default function TechStack({ skills }: { skills?: SkillsData }) {
  const row1 = (skills?.row1 && skills.row1.length > 0) ? skills.row1 : DEFAULT_ROW_1
  const row2 = (skills?.row2 && skills.row2.length > 0) ? skills.row2 : DEFAULT_ROW_2

  // Duplicate items so the marquee looks seamless (we translate -50%)
  const row1Double = [...row1, ...row1]
  const row2Double = [...row2, ...row2]

  return (
    <section id="skills" className="relative py-28 px-4 overflow-hidden bg-[#07090e]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-white/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header - Silver White HUD Theme */}
        <AnimateOnScroll animation="fade-up">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-block">
              <span className="hud-tag">
                <span className="text-white font-bold">#</span>
                TECHNICAL STACK
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Technologies I Work With
            </h2>
            <p className="text-sm sm:text-base text-white/60 max-w-2xl mx-auto leading-relaxed">
              Full-stack expertise across modern web development, artificial intelligence, and cloud infrastructure.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Train / Marquee Rows */}
        <AnimateOnScroll animation="fade-up" delay={100}>
          <div className="space-y-6">
            {/* Row 1: Left to Right */}
            <div className="marquee-container overflow-hidden relative">
              <div className="marquee-fade-left" />
              <div className="marquee-fade-right" />
              <div className="marquee-track flex gap-3 w-max animate-marquee">
                {row1Double.map((tech, index) => (
                  <div
                    key={`${tech}-${index}`}
                    className="water-glass-pill px-5 py-2.5 rounded-2xl flex items-center gap-2 text-sm font-medium text-white/90 whitespace-nowrap border border-white/10 hover:border-white/30 hover:scale-105 transition-all duration-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Right to Left */}
            <div className="marquee-container overflow-hidden relative">
              <div className="marquee-fade-left" />
              <div className="marquee-fade-right" />
              <div className="marquee-track flex gap-3 w-max animate-marquee-reverse">
                {row2Double.map((tech, index) => (
                  <div
                    key={`${tech}-${index}`}
                    className="water-glass-pill px-5 py-2.5 rounded-2xl flex items-center gap-2 text-sm font-medium text-white/90 whitespace-nowrap border border-white/10 hover:border-white/30 hover:scale-105 transition-all duration-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
