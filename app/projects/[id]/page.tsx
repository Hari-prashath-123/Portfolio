import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface ProjectPageProps {
  params: Promise<{ id: string }>
}

const PROJECT_DETAILS: Record<string, any> = {
  idcs: {
    title: "IDCS – Unified Institutional ERP Framework",
    date: "2026",
    role: "Full Stack Developer & Architect",
    description:
      "Centralized institutional ERP platform to automate academic and administrative workflows.",
    fullDescription: `IDCS is a unified institutional ERP framework developed to automate academic and administrative workflows. It includes biometric attendance tracking, payroll analytics, leave management, event approval workflows, and role-based access control. Built with React on the frontend and Django REST Framework on the backend, it uses JWT authentication for secure access and PostgreSQL for reliable data storage.\n\nNote: This repository is maintained under the Pixel-Square organization.`,
    stack: ["React", "Django REST Framework", "JWT Authentication", "PostgreSQL"],
    achievements: [
      "Automated biometric attendance and payroll analytics workflows",
      "Implemented role-based access control across multiple user types",
      "Built event approval system reducing manual processing by 70%",
    ],
    tags: ["React", "Django REST", "JWT", "PostgreSQL", "ERP"],
    repoUrl: "https://github.com/Pixel-Square/IDCS-Restart",
  },
  "centennial-connect": {
    title: "Centennial Connect – AI-Powered Business Calling SaaS",
    date: "2026 – Present",
    role: "React.js & Vite Developer Intern",
    description:
      "Production SaaS platform for AI-powered business calling with virtual number management, real-time AI voice agents, and intelligent power dialing.",
    fullDescription: `Centennial Connect is a real-world SaaS platform built at Centennial InfoTech Pvt. Ltd. for AI-powered business calling. The platform provides virtual number management, real-time AI voice agents, and intelligent power dialing for sales and support teams — giving them a single unified place to connect with customers.\n\nBuilt primarily in TypeScript as part of a production engineering team, the platform handles high-throughput calling workflows, AI voice agent integration, and scalable architecture for enterprise customers.`,
    stack: ["TypeScript", "React", "Vite", "AI Voice APIs", "Node.js"],
    achievements: [
      "Built as part of a real production engineering team at Centennial InfoTech",
      "Implemented virtual number management and power dialing features",
      "Integrated real-time AI voice agents for automated business calling",
    ],
    tags: ["TypeScript", "React", "SaaS", "AI Voice", "Production"],
    repoUrl: "https://github.com/Hari-prashath-123/centennial-connect",
  },
  autofixhub: {
    title: "AutoFixHub – Agentic AI",
    date: "2025",
    role: "Creator & Lead Developer",
    description:
      "An agentic AI tool that autonomously analyzes code issues and commits fixes directly to GitHub.",
    fullDescription: `AutoFixHub is an agentic AI system designed to autonomously identify, analyze, and fix code bugs. It leverages LLM agents to understand code context, generate fixes, and commit directly to GitHub repositories via the GitHub API. The system demonstrates end-to-end AI-driven automation for software development workflows, reducing manual debugging effort significantly.`,
    stack: ["Python", "LLM Agents", "GitHub API", "Agentic AI"],
    achievements: [
      "Built autonomous code analysis and fix generation pipeline",
      "Integrated directly with GitHub API for automated commits",
      "Demonstrated end-to-end agentic AI automation for code repair",
    ],
    tags: ["Agentic AI", "Generative AI", "Python", "LLM"],
    repoUrl: "https://github.com/Hari-prashath-123",
  },
  "wire-edm": {
    title: "Wire EDM AI Simulator",
    date: "2025",
    role: "ML Engineer & Frontend Developer",
    description:
      "Web-based CNC Wire EDM simulation with AI-powered performance metrics visualization.",
    fullDescription: `This project simulates wire EDM (Electrical Discharge Machining) manufacturing processes using a web-based interface. Built with React and TypeScript, it provides AI-powered performance metrics visualization, allowing users to simulate CNC Wire EDM operations and analyze machining parameters in real-time. The system helps optimize manufacturing efficiency through predictive analytics and interactive simulation.`,
    stack: ["React", "TypeScript", "AI/ML", "Data Visualization"],
    achievements: [
      "Built real-time CNC Wire EDM simulation with interactive UI",
      "Implemented AI-powered performance metrics dashboard",
      "Enabled predictive analysis of machining parameters",
    ],
    tags: ["React", "TypeScript", "AI", "CNC Simulation"],
    repoUrl: "https://github.com/Hari-prashath-123/Wire-EDM-new",
  },
  "academic-rag": {
    title: "Academic RAG",
    date: "2025",
    role: "Full Stack Developer & AI Engineer",
    description:
      "Retrieval-Augmented Generation system for querying academic course materials using natural language.",
    fullDescription: `Academic RAG is a Retrieval-Augmented Generation (RAG) system that enables students to query academic and course materials using natural language and receive context-grounded, accurate answers powered by LLM APIs.\n\nThe system indexes academic content and performs semantic retrieval to ground LLM responses in verified source material, reducing hallucinations and improving answer accuracy for study and learning workflows.`,
    stack: ["React", "TypeScript", "LLM APIs", "RAG Pipeline", "Python"],
    achievements: [
      "Built end-to-end RAG pipeline for academic content indexing and retrieval",
      "Integrated LLM APIs for context-grounded natural language answers",
      "Reduced hallucination risk by grounding responses in verified course material",
    ],
    tags: ["RAG", "GenAI", "React", "LLM APIs", "Python"],
    repoUrl: "https://github.com/Hari-prashath-123/Academic-Rag",
  },
  "recruitment-automation": {
    title: "Recruitment Automation – Centennial",
    date: "2026 – Present",
    role: "Developer at Centennial InfoTech",
    description:
      "Automation tool for resume screening and candidate shortlisting to streamline internal recruitment workflows.",
    fullDescription: `Recruitment Automation is an internal tool developed at Centennial InfoTech Pvt. Ltd. to automate the resume screening and candidate shortlisting process for internal hiring workflows.\n\nThe tool leverages AI to parse and evaluate resumes against job requirements, automatically ranking and shortlisting candidates, significantly reducing manual effort in the early stages of recruitment.`,
    stack: ["TypeScript", "React", "AI/ML", "Node.js"],
    achievements: [
      "Automated resume parsing and AI-based candidate evaluation",
      "Built shortlisting engine reducing manual screening effort significantly",
      "Integrated seamlessly into internal recruitment workflows at Centennial InfoTech",
    ],
    tags: ["Automation", "TypeScript", "AI", "React"],
    repoUrl: "https://github.com/Hari-prashath-123/Recruitment-Automation-Centennial",
  },
  marksheet: {
    title: "Student Marksheet Management System",
    date: "2024",
    role: "Full Stack Developer",
    description: "CRUD web application for managing student academic records and marksheets.",
    fullDescription: `A complete student marksheet management system built with Node.js, Express, and SQLite. It provides full CRUD functionality for managing student academic records, generating marksheets, and tracking academic performance. The application features a clean interface for data entry and report generation.`,
    stack: ["Node.js", "Express.js", "SQLite", "HTML/CSS"],
    achievements: [
      "Built complete CRUD operations for student record management",
      "Implemented automated marksheet generation",
      "Designed intuitive interface for data management",
    ],
    tags: ["Node.js", "Express", "SQLite", "CRUD"],
    repoUrl: "https://github.com/Hari-prashath-123",
  },
  "brick-tool": {
    title: "Brick Lifting Tool & Sand Separator Design",
    date: "2024",
    role: "Inventor & Designer",
    description: "Innovative mechanical design registered with the Indian Patent Office.",
    fullDescription: `An innovative mechanical design for a brick lifting tool combined with a sand separator, registered with the Indian Patent Office. This project demonstrates engineering creativity and practical problem-solving, addressing real-world construction challenges with an efficient, ergonomic design that improves worker productivity and safety.`,
    stack: ["Mechanical Design", "CAD", "Patent Filing", "Engineering"],
    achievements: [
      "Successfully registered with the Indian Patent Office",
      "Designed ergonomic tool improving worker safety",
      "Combined two functions into a single innovative device",
    ],
    tags: ["Patent", "Design", "Innovation", "Engineering"],
  },
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  const project = PROJECT_DETAILS[id]

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />

      <article className="py-12 px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Link href="/#projects" className="inline-flex items-center gap-2 water-glass-btn px-4 py-2 rounded-xl text-xs font-semibold text-primary mb-8 hover:text-primary">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          {/* Header Card */}
          <div className="water-glass-card p-6 sm:p-8 rounded-3xl space-y-6 mb-10 shadow-2xl">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
                {project.date} • {project.role}
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 tracking-tight">{project.title}</h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{project.description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg water-glass-pill text-xs font-semibold text-foreground/90 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="gap-2 water-glass-btn rounded-xl text-xs font-semibold uppercase tracking-wider text-white">
                    <Github className="w-4 h-4 text-white" />
                    View Repository
                  </Button>
                </a>
              )}
              {project.liveUrl && project.liveUrl !== "#" && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2 water-glass-btn rounded-xl text-xs font-semibold uppercase tracking-wider bg-transparent">
                    <ExternalLink className="w-4 h-4 text-primary" />
                    Live Demo
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-10">
            <section className="water-glass-panel p-6 sm:p-8 rounded-3xl">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white" />
                Overview
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base">{project.fullDescription}</p>
            </section>

            {/* Tech Stack */}
            <section className="water-glass-panel p-6 sm:p-8 rounded-3xl">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Technology Stack
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {project.stack.map((tech: string) => (
                  <div key={tech} className="flex items-center gap-3 p-3.5 rounded-xl water-glass-card hover:border-white/40 transition-all">
                    <div className="w-2 h-2 rounded-full bg-white" />
                    <span className="text-foreground font-semibold text-sm">{tech}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Key Achievements */}
            <section className="water-glass-panel p-6 sm:p-8 rounded-3xl">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                Key Achievements
              </h2>
              <ul className="space-y-3">
                {project.achievements.map((achievement: string, idx: number) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-lg water-glass-pill flex items-center justify-center text-xs font-bold text-white">
                      ✓
                    </span>
                    <span className="text-muted-foreground text-sm leading-relaxed pt-0.5">{achievement}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* CTA */}
            <section className="pt-4">
              <div className="water-glass-card p-8 rounded-3xl text-center shadow-2xl">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Interested in this project?</h3>
                <p className="text-muted-foreground text-sm mb-6">Check out the code on GitHub or reach out for more details</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                      <Button className="gap-2 water-glass-btn rounded-xl text-xs uppercase tracking-wider text-white">
                        <Github className="w-4 h-4 text-white" />
                        View Code
                      </Button>
                    </a>
                  )}
                  <a href="/#contact">
                    <Button variant="outline" className="water-glass-btn rounded-xl text-xs uppercase tracking-wider">
                      Get in Touch
                    </Button>
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
