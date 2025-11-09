"use client"

import { useState } from "react"

export default function About() {
  const skills = [
    "Python",
    "TypeScript",
    "React.js",
    "Next.js",
    "Node.js",
    "TensorFlow",
    "Scikit-Learn",
    "Hugging Face",
    "Power BI",
    "Flask",
    "LLMs",
    "Generative AI",
    "Prompt Engineering",
    "Data Analysis",
    "SQL",
    "Figma",
  ]

  const [expandedCategory, setExpandedCategory] = useState<string | null>("coding")

  const skillCategories = {
    coding: ["Python", "Java", "C", "JavaScript", "TypeScript", "HTML", "CSS", "SQL"],
    aiml: ["TensorFlow", "Scikit-Learn", "OpenAI API", "Hugging Face", "LLMs", "Generative AI", "Prompt Engineering"],
    data: ["Power BI", "Excel Analytics", "Data Analysis", "Tableau"],
    frameworks: ["Flask", "Node.js", "React.js", "Next.js"],
    tools: ["Figma", "Canva", "Blender", "ChatGPT", "Grok", "Gemini", "Perplexity"],
  }

  return (
    <section id="about" className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">About Me</h2>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed hover:text-foreground transition-colors duration-300">
              <p>
                I'm a 3rd-year B.Tech student in Artificial Intelligence and Data Science from K. Ramakrishnan College
                of Technology (KRCT), Trichy, with a CGPA of 7.93. Passionate about building intelligent systems that
                solve real-world problems, I specialize in generative AI, agentic AI systems, and data-driven
                applications.
              </p>

              <p>
                As President of the AGEN Club (Agentic & Generative AI Club) at KRCT since 2025, I lead initiatives
                around emerging AI technologies, conduct webinars, and organize workshops. I completed a Cloud Computing
                with AI Specialist internship at CloudplusAI Tech and am certified in PL-300 (Microsoft Power BI) and
                Generative AI fundamentals.
              </p>

              <p>
                My goal is to build agentic AI tools that augment human capabilities and drive innovation. I have
                hands-on experience across the full AI stack—from model training to production deployment. When not
                coding, you'll find me exploring new frameworks, contributing to open-source projects, or designing
                solutions at hackathons.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wide">Certifications</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary transition-colors duration-300">
                  ✓ PL-300: Microsoft Power BI Data Analyst (May 2025)
                </li>
                <li className="hover:text-primary transition-colors duration-300">
                  ✓ Generative AI, Prompt Engineering & ChatGPT – Simplilearn (May 2025)
                </li>
                <li className="hover:text-primary transition-colors duration-300">
                  ✓ Cloud Computing with AI Specialist – CloudplusAI Tech (Apr–Jun 2025)
                </li>
                <li className="hover:text-primary transition-colors duration-300">
                  ✓ Machine Learning using Python – Simplilearn
                </li>
              </ul>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              {skills.slice(0, 8).map((skill) => (
                <div
                  key={skill}
                  className="px-3 py-2 rounded-lg bg-primary/10 text-primary text-xs font-semibold text-center hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default"
                >
                  {skill}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {skills.slice(8).map((skill) => (
                <div
                  key={skill}
                  className="px-3 py-2 rounded-lg bg-accent/10 text-accent text-xs font-semibold text-center hover:bg-accent hover:text-accent-foreground hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
