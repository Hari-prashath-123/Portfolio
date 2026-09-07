"use client"

import { AnimateOnScroll } from "./scroll-animations"
import FloatingElements from "./floating-elements"

export default function About() {
  const skillCategories = [
    {
      label: "Programming Languages",
      skills: ["Python", "JavaScript", "TypeScript", "Java", "C", "SQL", "HTML5", "CSS3"],
      color: "primary",
    },
    {
      label: "Frameworks & Libraries",
      skills: ["React.js", "Node.js", "Flask", "Django", "Express.js", "TensorFlow", "Scikit-Learn"],
      color: "accent",
    },
    {
      label: "AI / ML / GenAI",
      skills: ["Machine Learning", "Deep Learning", "Generative AI", "Prompt Engineering", "AI Automation", "Hugging Face APIs", "OpenAI APIs", "Agentic AI Systems"],
      color: "primary",
    },
    {
      label: "Databases & Cloud",
      skills: ["PostgreSQL", "SQLite", "Supabase", "Cloud Integration"],
      color: "accent",
    },
    {
      label: "Tools & Platforms",
      skills: ["Git", "GitHub", "Power BI", "Figma", "Blender", "Canva", "Excel Analytics"],
      color: "primary",
    },
    {
      label: "Core Concepts",
      skills: ["REST APIs", "Full Stack Development", "Data Analytics", "System Design", "Model Fine-Tuning", "AI Workflow Automation"],
      color: "accent",
    },
  ]

  const certifications = [
    "PL-300: Microsoft Power BI Data Analyst Associate (May 2025)",
    "Generative AI, Prompt Engineering & ChatGPT – Simplilearn (May 2025)",
    "Cloud Computing with AI Specialist Intern – CloudplusAI Tech (Apr–Jun 2025)",
    "Foundations: Programming Refresher – Simplilearn",
    "Python for Data Science – Simplilearn",
    "Machine Learning using Python – Simplilearn",
    "Data Science with Python & Tableau Desktop Specialist – Simplilearn",
    "HDCA (C, C++, Python) – Apollo Institute",
  ]

  return (
    <section id="about" className="relative py-20 px-4 bg-background overflow-hidden">
      <FloatingElements variant="section" />

      <div className="max-w-4xl mx-auto relative z-10">
        <AnimateOnScroll animation="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">About Me</h2>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-6">
            <AnimateOnScroll animation="fade-up" delay={100}>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed hover:text-foreground transition-colors duration-300">
                <p>
                  I'm a Final-year B.Tech student in Artificial Intelligence and Data Science from K. Ramakrishnan
                  College of Technology (KRCT), Trichy, with a CGPA of 7.89 (till 5th Semester). Passionate about
                  building intelligent systems that solve real-world problems, I specialize in generative AI, agentic AI
                  systems, and full-stack development.
                </p>

                <p>
                  As President of the AGEN Club (Agentic & Generative AI Club) at KRCT since 2025, I lead initiatives
                  around emerging AI technologies, conduct webinars, workshops, and organized events with 700+
                  impressions. I completed an AI & Cloud Computing internship at CloudplusAI Tech and am certified in
                  PL-300 (Microsoft Power BI) and Generative AI fundamentals.
                </p>

                <p>
                  My goal is to build scalable AI systems, autonomous agents, and production-ready software solutions. I
                  have hands-on experience across the full AI stack—from model training and fine-tuning to production
                  deployment. Skilled in React, Python, Flask, Django, Node.js, TensorFlow, and Generative AI
                  technologies.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={200}>
              <div className="space-y-3 pt-4">
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wide">Certifications</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {certifications.map((cert, i) => (
                    <AnimateOnScroll key={i} animation="fade-left" delay={250 + i * 60}>
                      <li className="hover:text-primary transition-colors duration-300">✓ {cert}</li>
                    </AnimateOnScroll>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Skills Grid */}
          <div className="space-y-5">
            {skillCategories.map((category, catIdx) => (
              <AnimateOnScroll key={category.label} animation="scale-in" delay={catIdx * 80}>
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {category.label}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <div
                        key={skill}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default ${
                          category.color === "primary"
                            ? "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                            : "bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground"
                        }`}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
