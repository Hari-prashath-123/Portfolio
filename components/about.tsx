"use client"

import { AnimateOnScroll } from "./scroll-animations"
import { Award, Briefcase, GraduationCap, Sparkles, CheckCircle2, Terminal, ArrowUpRight, Cpu, Layers } from "lucide-react"

export default function About() {
  const certifications = [
    {
      title: "PL-300: Microsoft Power BI Data Analyst Associate",
      issuer: "Microsoft",
      date: "May 2025",
      type: "Certified Associate",
    },
    {
      title: "Generative AI, Prompt Engineering & ChatGPT",
      issuer: "Simplilearn",
      date: "May 2025",
      type: "Specialization",
    },
    {
      title: "Cloud Computing with AI Specialist Intern",
      issuer: "CloudplusAI Tech",
      date: "Apr–Jun 2025",
      type: "Industry Internship",
    },
    {
      title: "Python for Data Science & Tableau Desktop Specialist",
      issuer: "Simplilearn",
      date: "2024",
      type: "Data Science Track",
    },
    {
      title: "Machine Learning using Python",
      issuer: "Simplilearn",
      date: "2024",
      type: "Core ML",
    },
    {
      title: "HDCA (Honours Diploma in Computer Applications)",
      issuer: "Apollo Institute",
      date: "Foundation",
      type: "C / C++ / Python",
    },
  ]

  const pillars = [
    {
      icon: Cpu,
      title: "Autonomous Agentic AI",
      tag: "AGENTIC_NODE",
      description:
        "Architecting reasoning loops, autonomous tool-calling systems, and multi-agent workflows using LangGraph, CrewAI, and modern LLM frameworks.",
    },
    {
      icon: Layers,
      title: "Production Full-Stack AI",
      tag: "FULLSTACK_CORE",
      description:
        "Building reactive, ultra-fast interfaces in Next.js & React, backed by robust asynchronous APIs in FastAPI, Node.js, PostgreSQL, and Supabase.",
    },
    {
      icon: Terminal,
      title: "Data Intelligence & Analytics",
      tag: "DATA_PIPELINE",
      description:
        "PL-300 certified data modeling, exploratory business intelligence, fine-tuning evaluations, and end-to-end telemetry for real-world reliability.",
    },
  ]

  return (
    <section id="about" className="relative py-28 px-4 bg-[#07090e] overflow-hidden">
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-white/5 blur-[160px] rounded-full pointer-events-none -z-0" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-10 -left-40 w-96 h-96 bg-white/5 blur-[140px] rounded-full pointer-events-none -z-0" 
        aria-hidden="true" 
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <AnimateOnScroll animation="fade-up">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-block">
              <span className="hud-tag">
                <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse" />
                // SYSTEM DOSSIER · ABOUT
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Engineering Profile & Credentials
            </h2>
            <p className="text-sm sm:text-base text-white/60 max-w-2xl mx-auto leading-relaxed">
              Academic foundation at KRCT, leadership as President of the AGEN Club, and verified industry credentials in Artificial Intelligence.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* BENTO CARD 1: Main Bio & Academic Narrative (2 Columns) */}
          <AnimateOnScroll animation="fade-up" delay={100} className="lg:col-span-2 h-full">
            <div className="hud-card rounded-[32px] p-8 sm:p-10 h-full flex flex-col justify-between relative overflow-hidden border border-white/10 group hover:border-white/25 hover:shadow-[0_25px_60px_rgba(0,0,0,0.8)] transition-all duration-300">
              {/* Top Specular Sheen line */}
              <div 
                className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none z-20"
                aria-hidden="true"
              />

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-white/50 tracking-widest uppercase flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-slate-300" />
                    // 01 · ACADEMIC & ENGINEERING DIRECTIVE
                  </span>
                  <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    STATUS: ACTIVE CANDIDATE
                  </span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                    Architecting Autonomous AI Systems with Production-Grade Engineering.
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                    I am a Final-Year B.Tech student in <span className="text-white font-medium">Artificial Intelligence & Data Science</span> at <span className="text-white font-medium">K. Ramakrishnan College of Technology (KRCT)</span>, Trichy, maintaining a strong academic standing with a <span className="text-emerald-300 font-mono font-semibold">7.89 CGPA</span>.
                  </p>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                    My core expertise spans designing multi-agent collaborative workflows, fine-tuning large language models, prompt engineering, and building resilient full-stack platforms. I thrive at the convergence of research-driven generative AI and scalable software architecture.
                  </p>
                </div>
              </div>

              {/* KPI Metrics Pill Strip */}
              <div className="pt-8 mt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all duration-300 group/kpi">
                  <div className="text-xl sm:text-2xl font-black text-white group-hover/kpi:text-emerald-300 transition-colors font-mono">
                    7.89
                  </div>
                  <div className="text-[11px] text-white/50 tracking-wide font-mono uppercase mt-0.5">
                    CGPA (Till 5th Sem)
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all duration-300 group/kpi">
                  <div className="text-xl sm:text-2xl font-black text-white group-hover/kpi:text-emerald-300 transition-colors font-mono">
                    2026
                  </div>
                  <div className="text-[11px] text-white/50 tracking-wide font-mono uppercase mt-0.5">
                    Graduation Batch
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all duration-300 group/kpi">
                  <div className="text-xl sm:text-2xl font-black text-white group-hover/kpi:text-emerald-300 transition-colors font-mono">
                    8+
                  </div>
                  <div className="text-[11px] text-white/50 tracking-wide font-mono uppercase mt-0.5">
                    Production Systems
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all duration-300 group/kpi">
                  <div className="text-xl sm:text-2xl font-black text-white group-hover/kpi:text-emerald-300 transition-colors font-mono">
                    700+
                  </div>
                  <div className="text-[11px] text-white/50 tracking-wide font-mono uppercase mt-0.5">
                    Event Attendees
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* BENTO CARD 2: Leadership & Industry Experience (1 Column) */}
          <AnimateOnScroll animation="fade-up" delay={200} className="h-full">
            <div className="hud-card rounded-[32px] p-8 h-full flex flex-col justify-between relative overflow-hidden border border-white/10 group hover:border-white/25 hover:shadow-[0_25px_60px_rgba(0,0,0,0.8)] transition-all duration-300">
              {/* Top Specular Sheen line */}
              <div 
                className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none z-20"
                aria-hidden="true"
              />

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-white/50 tracking-widest uppercase flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-slate-300" />
                    // 02 · LEADERSHIP & INDUSTRY
                  </span>
                </div>

                {/* Role 1: Club President */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/25 hover:bg-white/[0.05] transition-all duration-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                      2025 - PRESENT
                    </span>
                    <span className="text-xs font-mono text-white/50">KRCT</span>
                  </div>
                  <h4 className="text-base font-bold text-white flex items-center gap-1.5">
                    President · AGEN Club
                  </h4>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Lead the Agentic & Generative AI Club. Organized campus-wide webinars, hands-on hackathons, and technical workshops generating 700+ impressions.
                  </p>
                </div>

                {/* Role 2: Industry Internship */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/25 hover:bg-white/[0.05] transition-all duration-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-300 font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/10 border border-white/15">
                      APR–JUN 2025
                    </span>
                    <span className="text-xs font-mono text-white/50">INTERNSHIP</span>
                  </div>
                  <h4 className="text-base font-bold text-white flex items-center gap-1.5">
                    AI & Cloud Specialist Intern
                  </h4>
                  <p className="text-xs text-white/60 leading-relaxed">
                    CloudplusAI Tech. Engineered cloud computing integration with AI workloads, containerized model APIs, and assisted in deployment architectures.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
                <span>FOCUS: LEADERSHIP & SCALE</span>
                <span className="text-emerald-400">VERIFIED ✓</span>
              </div>
            </div>
          </AnimateOnScroll>

          {/* BENTO CARD 3: Core Architectural Capabilities (3 Columns full width) */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon
              return (
                <AnimateOnScroll key={pillar.title} animation="fade-up" delay={250 + idx * 80}>
                  <div className="hud-card rounded-[28px] p-6 h-full flex flex-col justify-between relative overflow-hidden border border-white/10 group hover:border-white/30 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300">
                    {/* Top Specular Sheen line */}
                    <div 
                      className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-20"
                      aria-hidden="true"
                    />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center text-slate-200 group-hover:text-white group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest font-semibold">
                          // {pillar.tag}
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                        {pillar.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40 group-hover:text-white/70 transition-colors">
                      <span>PILLAR 0{idx + 1}</span>
                      <span className="text-emerald-400">READY</span>
                    </div>
                  </div>
                </AnimateOnScroll>
              )
            })}
          </div>

          {/* BENTO CARD 4: Verified Certifications & Industry Credentials (3 Columns full width) */}
          <AnimateOnScroll animation="fade-up" delay={350} className="lg:col-span-3">
            <div className="hud-card rounded-[32px] p-8 sm:p-10 relative overflow-hidden border border-white/10 group hover:border-white/25 transition-all duration-300">
              {/* Top Specular Sheen line */}
              <div 
                className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none z-20"
                aria-hidden="true"
              />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span className="font-mono text-xs font-semibold text-white/50 tracking-widest uppercase">
                      // 03 · VERIFIED INDUSTRY CREDENTIALS
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    Certifications & Professional Standards
                  </h3>
                </div>
                <div className="hud-tag text-[11px] py-1 px-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  6 VERIFIED CREDENTIALS
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-2xl bg-white/[0.025] hover:bg-white/[0.06] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between group/cert hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono text-white/50">
                        <span className="text-emerald-400/90 font-medium px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                          {cert.type}
                        </span>
                        <span>{cert.date}</span>
                      </div>
                      <h5 className="text-sm font-bold text-white/90 group-hover/cert:text-white transition-colors leading-snug">
                        {cert.title}
                      </h5>
                    </div>

                    <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-white/50">
                      <span>{cert.issuer}</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

        </div>
      </div>
    </section>
  )
}
