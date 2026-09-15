"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { AnimateOnScroll } from "@/components/scroll-animations"

export default function ResumePage() {
  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = "/resume.pdf"
    link.download = "Hariprashath-B-Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <main className="min-h-screen">
      <Header />

      <section className="py-20 px-4 bg-background">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            {/* Header */}
            <AnimateOnScroll animation="fade-up">
              <div className="text-center space-y-4 mb-12">
                <h1 className="text-4xl md:text-5xl font-bold">My Resume</h1>
                <p className="text-xl text-muted-foreground">
                  Download my comprehensive resume or explore my qualifications below
                </p>
              </div>
            </AnimateOnScroll>

            {/* Download Button */}
            <AnimateOnScroll animation="scale-in" delay={100}>
              <div className="flex justify-center">
                <button
                  onClick={handleDownload}
                  className="water-glass-btn flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-base hover:scale-105 shadow-2xl"
                >
                  <Download className="w-5 h-5 text-white" />
                  Download Resume (PDF)
                </button>
              </div>
            </AnimateOnScroll>

            {/* Resume Preview */}
            <AnimateOnScroll animation="fade-up" delay={200}>
              <div className="water-glass-card p-8 sm:p-10 rounded-3xl space-y-8 shadow-2xl">
                {/* Career Objective */}
                <section className="water-glass-panel p-6 rounded-2xl">
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 text-foreground flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white" />
                    Career Objective
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    Final-year B.Tech student specializing in Artificial Intelligence & Data Science with hands-on experience in developing AI-powered web applications, automation systems, and intelligent full-stack platforms. Skilled in React, Python, Flask, Django, Node.js, TensorFlow, and Generative AI technologies. Passionate about building scalable AI systems, autonomous agents, and production-ready software solutions.
                  </p>
                </section>

                {/* Education */}
                <section className="water-glass-panel p-6 rounded-2xl">
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 text-foreground flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Education
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">B.Tech in AI & Data Science</h3>
                      <p className="text-muted-foreground text-sm">K. Ramakrishnan College of Technology (KRCT), Trichy</p>
                      <p className="text-xs text-primary font-semibold mt-1">Anna University • Graduating 2027 • CGPA: 7.84 (till 6th Semester)</p>
                    </div>
                  </div>
                </section>

                {/* Experience */}
                <section className="water-glass-panel p-6 rounded-2xl">
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 text-foreground flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white" />
                    Experience
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">React.js &amp; Vite Developer Intern</h3>
                      <p className="text-muted-foreground text-sm">Centennial InfoTech Pvt. Ltd.</p>
                      <p className="text-xs text-primary font-semibold mt-1">Jul 2026 &ndash; Present</p>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                        Building Centennial Connect, a production SaaS platform for AI-powered business calling — virtual numbers, real-time AI voice agents, and intelligent power dialing. Also contributing to a Recruitment Automation tool for internal hiring workflows.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">AI &amp; Cloud Computing Intern</h3>
                      <p className="text-muted-foreground text-sm">CloudplusAI Tech</p>
                      <p className="text-xs text-primary font-semibold mt-1">Apr 2025 &ndash; Jun 2025</p>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                        Worked on AI-integrated cloud solutions and deployment workflows.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Certifications */}
                <section className="water-glass-panel p-6 rounded-2xl">
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 text-foreground flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    Certifications
                  </h2>
                  <ul className="space-y-2.5">
                    {[
                      "Applied Generative AI Specialization – Simplilearn (Completed with Distinction, May 2026)",
                      "PL-300: Microsoft Power BI Data Analyst Associate – Microsoft (May 2025)",
                      "Essentials of Generative AI, Prompt Engineering & ChatGPT – Simplilearn (May 2025)",
                      "Cloud Computing with AI Specialist Intern – CloudplusAI Tech (Apr–Jun 2025)",
                      "Foundations: Programming Refresher – Simplilearn",
                      "Python for Data Science – Simplilearn",
                      "Machine Learning using Python – Simplilearn",
                      "Data Science with Python & Tableau Desktop Specialist – Simplilearn",
                      "HDCA (C, C++, Python) – Apollo Institute",
                    ].map((cert, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <span className="text-white font-bold">✓</span>
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Leadership */}
                <section className="water-glass-panel p-6 rounded-2xl">
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 text-foreground flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white" />
                    Leadership & Achievements
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">President – AGEN Club</h3>
                      <p className="text-muted-foreground text-sm">Agentic & Generative AI Club at KRCT (2025 – Present)</p>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                        Conducted webinars, workshops, AI awareness sessions. Organized "Generative AI & Data Science Webinar" with 700+ impressions.
                      </p>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                      <li>🏆 1st Prize – Hackathon (Isysway, Tanjore)</li>
                      <li>🏅 Certificate of Excellence – HackXelerate'25, KPR Institute</li>
                      <li>⭐ Top Performer – National Workshop on Cyber Warfare & Ethical Hacking</li>
                      <li>🎯 HackFinity 2025 – National Hackathon, SIMATS Engineering, Chennai</li>
                      <li>💻 Participant – Temenos' HACKZ'24 (Round 1, CEG Anna University)</li>
                    </ul>
                  </div>
                </section>

                {/* Skills */}
                <section className="water-glass-panel p-6 rounded-2xl">
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 text-foreground flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Technical Skills
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="water-glass-pill p-3.5 rounded-xl border border-white/10">
                      <h4 className="font-bold text-foreground text-xs uppercase tracking-wider mb-1">Programming</h4>
                      <p className="text-muted-foreground text-xs">Python, JavaScript, TypeScript, Java, C, SQL, HTML5, CSS3</p>
                    </div>
                    <div className="water-glass-pill p-3.5 rounded-xl border border-white/10">
                      <h4 className="font-bold text-foreground text-xs uppercase tracking-wider mb-1">AI/ML/GenAI</h4>
                      <p className="text-muted-foreground text-xs">Machine Learning, Deep Learning, Generative AI, Prompt Engineering, Hugging Face, OpenAI APIs, Agentic AI</p>
                    </div>
                    <div className="water-glass-pill p-3.5 rounded-xl border border-white/10">
                      <h4 className="font-bold text-foreground text-xs uppercase tracking-wider mb-1">Frameworks</h4>
                      <p className="text-muted-foreground text-xs">React.js, Node.js, Flask, Django, Express.js, TensorFlow, Scikit-Learn</p>
                    </div>
                    <div className="water-glass-pill p-3.5 rounded-xl border border-white/10">
                      <h4 className="font-bold text-foreground text-xs uppercase tracking-wider mb-1">Databases & Tools</h4>
                      <p className="text-muted-foreground text-xs">PostgreSQL, SQLite, Supabase, Power BI, Figma, Git, GitHub</p>
                    </div>
                  </div>
                </section>
              </div>
            </AnimateOnScroll>

            {/* CTA */}
            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="water-glass-card p-8 rounded-3xl text-center shadow-2xl">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Ready to collaborate?</h3>
                <p className="text-muted-foreground text-sm mb-6">Let's discuss how I can contribute to your team or project</p>
                <a href="/#contact">
                  <Button size="lg" className="water-glass-btn rounded-xl text-xs uppercase tracking-wider text-white">
                    Get in Touch
                  </Button>
                </a>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
