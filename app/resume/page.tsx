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
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-medium text-lg hover:scale-105 hover:shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  Download Resume (PDF)
                </button>
              </div>
            </AnimateOnScroll>

            {/* Resume Preview */}
            <AnimateOnScroll animation="fade-up" delay={200}>
              <div className="bg-card border border-border rounded-xl p-8 space-y-8">
                {/* Career Objective */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Career Objective</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Final-year B.Tech student specializing in Artificial Intelligence & Data Science with hands-on experience in developing AI-powered web applications, automation systems, and intelligent full-stack platforms. Skilled in React, Python, Flask, Django, Node.js, TensorFlow, and Generative AI technologies. Passionate about building scalable AI systems, autonomous agents, and production-ready software solutions.
                  </p>
                </section>

                {/* Education */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Education</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold">B.Tech in AI & Data Science</h3>
                      <p className="text-muted-foreground">K. Ramakrishnan College of Technology (KRCT), Trichy</p>
                      <p className="text-sm text-muted-foreground">Anna University • Graduating 2027 • CGPA: 7.89 (till 5th Semester)</p>
                    </div>
                  </div>
                </section>

                {/* Experience */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Experience</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold">AI & Cloud Computing Intern</h3>
                      <p className="text-muted-foreground">CloudplusAI Tech</p>
                      <p className="text-sm text-muted-foreground">Apr 2025 – Jun 2025</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Worked on AI-integrated cloud solutions and deployment workflows.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Certifications */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Certifications</h2>
                  <ul className="space-y-3">
                    {[
                      "PL-300: Microsoft Power BI Data Analyst Associate – Microsoft (May 2025)",
                      "Generative AI, Prompt Engineering & ChatGPT – Simplilearn (May 2025)",
                      "Cloud Computing with AI Specialist Intern – CloudplusAI Tech (Apr–Jun 2025)",
                      "Foundations: Programming Refresher – Simplilearn",
                      "Python for Data Science – Simplilearn",
                      "Machine Learning using Python – Simplilearn",
                      "Data Science with Python & Tableau Desktop Specialist – Simplilearn",
                      "HDCA (C, C++, Python) – Apollo Institute",
                    ].map((cert, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Leadership */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Leadership & Achievements</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold">President – AGEN Club</h3>
                      <p className="text-muted-foreground">Agentic & Generative AI Club at KRCT (2025 – Present)</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Conducted webinars, workshops, AI awareness sessions. Organized "Generative AI & Data Science Webinar" with 700+ impressions.
                      </p>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>🏆 1st Prize – Hackathon (Isysway, Tanjore)</li>
                      <li>🏅 Certificate of Excellence – HackXelerate'25, KPR Institute</li>
                      <li>⭐ Top Performer – National Workshop on Cyber Warfare & Ethical Hacking</li>
                      <li>🎯 HackFinity 2025 – National Hackathon, SIMATS Engineering, Chennai</li>
                      <li>💻 Participant – Temenos' HACKZ'24 (Round 1, CEG Anna University)</li>
                    </ul>
                  </div>
                </section>

                {/* Skills */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">Technical Skills</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Programming</h4>
                      <p className="text-muted-foreground text-sm">Python, JavaScript, TypeScript, Java, C, SQL, HTML5, CSS3</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">AI/ML/GenAI</h4>
                      <p className="text-muted-foreground text-sm">Machine Learning, Deep Learning, Generative AI, Prompt Engineering, Hugging Face, OpenAI APIs, Agentic AI</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Frameworks</h4>
                      <p className="text-muted-foreground text-sm">React.js, Node.js, Flask, Django, Express.js, TensorFlow, Scikit-Learn</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Databases & Tools</h4>
                      <p className="text-muted-foreground text-sm">PostgreSQL, SQLite, Supabase, Power BI, Figma, Git, GitHub</p>
                    </div>
                  </div>
                </section>
              </div>
            </AnimateOnScroll>

            {/* CTA */}
            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                <h3 className="text-xl font-bold mb-3">Ready to collaborate?</h3>
                <p className="text-muted-foreground mb-6">Let's discuss how I can contribute to your team or project</p>
                <a href="/#contact">
                  <Button size="lg">Get in Touch</Button>
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
