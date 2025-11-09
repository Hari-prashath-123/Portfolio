"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function ResumePage() {
  const handleDownload = () => {
    // In production, this would download the actual resume file
    const link = document.createElement("a")
    link.href = "/resume/HARI-PRASHATH-RESUME.pdf"
    link.download = "Hari-Prashath-Resume.pdf"
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
            <div className="text-center space-y-4 mb-12">
              <h1 className="text-4xl md:text-5xl font-bold">My Resume</h1>
              <p className="text-xl text-muted-foreground">
                Download my comprehensive resume or explore my qualifications below
              </p>
            </div>

            {/* Download Button */}
            <div className="flex justify-center">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-lg"
              >
                <Download className="w-5 h-5" />
                Download Resume (PDF)
              </button>
            </div>

            {/* Resume Preview */}
            <div className="bg-card border border-border rounded-xl p-8 space-y-8">
              {/* Education */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Education</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">B.Tech in AI & Data Science</h3>
                    <p className="text-muted-foreground">Karpagam Institute of Technology (KRCT)</p>
                    <p className="text-sm text-muted-foreground">Graduating 2025</p>
                  </div>
                </div>
              </section>

              {/* Certifications */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Certifications</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                    <span>Microsoft PL-300: Data Analyst</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                    <span>Generative AI with Large Language Models</span>
                  </li>
                </ul>
              </section>

              {/* Experience */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Experience</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">Intern - CloudplusAI</h3>
                    <p className="text-muted-foreground">2023 - 2024</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Worked on deploying production AI systems and optimizing machine learning pipelines
                    </p>
                  </div>
                </div>
              </section>

              {/* Leadership */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Leadership</h2>
                <div>
                  <h3 className="text-xl font-semibold">President - AGEN Club</h3>
                  <p className="text-muted-foreground">2024 - Present</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Leading initiatives and discussions around emerging AI technologies
                  </p>
                </div>
              </section>

              {/* Skills */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Technical Skills</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Programming</h4>
                    <p className="text-muted-foreground text-sm">Python, TypeScript, JavaScript</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">AI/ML</h4>
                    <p className="text-muted-foreground text-sm">Hugging Face, TensorFlow, scikit-learn</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Web Development</h4>
                    <p className="text-muted-foreground text-sm">React, Next.js, Node.js</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Data & BI</h4>
                    <p className="text-muted-foreground text-sm">Power BI, PostgreSQL, Data Analysis</p>
                  </div>
                </div>
              </section>
            </div>

            {/* CTA */}
            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <h3 className="text-xl font-bold mb-3">Ready to collaborate?</h3>
              <p className="text-muted-foreground mb-6">Let's discuss how I can contribute to your team or project</p>
              <a href="/#contact">
                <Button size="lg">Get in Touch</Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
