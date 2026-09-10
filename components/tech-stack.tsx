"use client"

import { AnimateOnScroll } from "./scroll-animations"

export default function TechStack() {
  const row1 = [
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

  const row2 = [
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
          <div className="space-y-4 max-w-5xl mx-auto">

            {/* Row 1 — scrolls RIGHT (→) */}
            <div className="marquee-row py-1">
              <div className="marquee-track marquee-track--right gap-2.5 sm:gap-3">
                {row1Double.map((tech, i) => (
                  <div
                    key={`r1-${i}`}
                    className="flex-shrink-0 px-5 py-2.5 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/10 text-white/85 text-xs sm:text-sm font-medium tracking-wide shadow-sm
                      hover:border-white/50 hover:text-white hover:bg-white/[0.1] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:scale-105
                      transition-all duration-200 cursor-default select-none mx-1.5"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 — scrolls LEFT (←) */}
            <div className="marquee-row py-1">
              <div className="marquee-track marquee-track--left gap-2.5 sm:gap-3">
                {row2Double.map((tech, i) => (
                  <div
                    key={`r2-${i}`}
                    className="flex-shrink-0 px-5 py-2.5 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/10 text-white/85 text-xs sm:text-sm font-medium tracking-wide shadow-sm
                      hover:border-white/50 hover:text-white hover:bg-white/[0.1] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:scale-105
                      transition-all duration-200 cursor-default select-none mx-1.5"
                  >
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
