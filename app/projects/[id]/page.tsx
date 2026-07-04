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
    fullDescription: `IDCS is a unified institutional ERP framework developed to automate academic and administrative workflows. It includes biometric attendance tracking, payroll analytics, leave management, event approval workflows, and role-based access control. Built with React on the frontend and Django REST Framework on the backend, it uses JWT authentication for secure access and PostgreSQL for reliable data storage. The platform streamlines operations across departments in an educational institution.`,
    stack: ["React", "Django REST Framework", "JWT Authentication", "PostgreSQL"],
    achievements: [
      "Automated biometric attendance and payroll analytics workflows",
      "Implemented role-based access control across multiple user types",
      "Built event approval system reducing manual processing by 70%",
    ],
    tags: ["React", "Django REST", "JWT", "PostgreSQL", "ERP"],
    repoUrl: "https://github.com/Hari-prashath-123",
  },
  autofixhub: {
    title: "AutoFixHub",
    date: "2025",
    role: "Creator & Lead Developer",
    description:
      "An agentic AI tool that autonomously analyzes and commits code fixes to GitHub.",
    fullDescription: `AutoFixHub is an agentic AI system designed to autonomously identify, analyze, and fix code bugs. It leverages multiple LLMs to understand code context, generate fixes, and validate solutions before committing directly to GitHub repositories. The system uses multi-agent workflows to handle various programming languages and integrates seamlessly with version control.`,
    stack: ["Python", "LLM", "Agentic AI", "GitHub API"],
    achievements: [
      "Built autonomous code analysis and fix generation pipeline",
      "Integrated directly with GitHub for automated commits",
      "Supports multiple programming languages and frameworks",
    ],
    tags: ["Agentic AI", "Generative AI", "Python", "LLM"],
    repoUrl: "https://github.com/Hari-prashath-123",
  },
  "wire-edm": {
    title: "Wire EDM AI Simulator",
    date: "2025",
    role: "ML Engineer & Frontend Developer",
    description:
      "Web-based CNC simulation with AI-powered performance metrics visualization.",
    fullDescription: `This project simulates wire EDM (Electrical Discharge Machining) manufacturing processes using a web-based interface. Built with React and TypeScript, it provides AI-powered performance metrics visualization, allowing users to simulate CNC operations and analyze machining parameters in real-time. The system helps optimize manufacturing efficiency through predictive analytics.`,
    stack: ["React", "TypeScript", "AI/ML", "Data Visualization"],
    achievements: [
      "Built real-time CNC simulation with interactive UI",
      "Implemented AI-powered performance metrics dashboard",
      "Enabled predictive analysis of machining parameters",
    ],
    tags: ["React", "TypeScript", "AI", "CNC Simulation"],
    repoUrl: "https://github.com/Hari-prashath-123",
  },
  "ai-career": {
    title: "AI Career Navigator",
    date: "2025",
    role: "Full Stack Developer",
    description:
      "AI-powered career guidance platform developed at HackFinity 2025 National Hackathon.",
    fullDescription: `AI Career Navigator provides personalized career recommendations based on individual skills, interests, and market trends. Built at the HackFinity 2025 National Hackathon at SIMATS Engineering, Chennai, it uses Hugging Face APIs for AI-driven analysis, React for the frontend, and Supabase for backend and authentication. The platform generates customized learning paths and identifies skill gaps.`,
    stack: ["React", "Supabase", "Hugging Face APIs", "Generative AI"],
    achievements: [
      "Developed during HackFinity 2025 National Hackathon",
      "Integrated Hugging Face APIs for intelligent career analysis",
      "Built real-time personalized learning path generation",
    ],
    tags: ["React", "Supabase", "Hugging Face", "GenAI"],
    repoUrl: "https://github.com/Hari-prashath-123",
  },
  qpg: {
    title: "Question Paper Generator",
    date: "2025",
    role: "Backend Developer & NLP Engineer",
    description:
      "Flask-based website that generates question papers using syllabus PDFs and Bloom's taxonomy logic.",
    fullDescription: `Question Paper Generator automates the creation of customized educational assessments. Using Flask as the web framework, it processes syllabus PDFs with NLP techniques and applies Bloom's taxonomy logic to generate questions of varying cognitive levels. The system ensures balanced coverage of topics and difficulty levels aligned with curriculum standards.`,
    stack: ["Python", "Flask", "NLP", "PDF Processing"],
    achievements: [
      "Automated question generation from syllabus PDFs",
      "Implemented Bloom's taxonomy-based difficulty classification",
      "Reduced paper creation time significantly for educators",
    ],
    tags: ["Flask", "NLP", "Python", "Education"],
    repoUrl: "https://github.com/Hari-prashath-123",
  },
  "ecommerce-ai": {
    title: "E-Commerce AI Website",
    date: "2025",
    role: "Developer & AI Integrator",
    description: "E-commerce platform using Canva AI for product management automation.",
    fullDescription: `An e-commerce website developed using Canva AI's Magic Media and Magic Write features for automated product content generation and visual asset creation. The platform streamlines product management by leveraging AI for creating product descriptions, marketing copy, and visual assets, significantly reducing manual content creation effort.`,
    stack: ["Canva AI", "Magic Media", "Magic Write", "Web Technologies"],
    achievements: [
      "Integrated Canva AI's Magic Media for automated visual content",
      "Used Magic Write for intelligent product description generation",
      "Streamlined end-to-end product management workflow",
    ],
    tags: ["Canva AI", "E-Commerce", "Automation"],
    repoUrl: "https://github.com/Hari-prashath-123",
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

      <article className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Link href="/#projects" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          {/* Header */}
          <div className="space-y-6 mb-12">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {project.date} • {project.role}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
              <p className="text-lg text-muted-foreground">{project.description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="gap-2">
                    <Github className="w-4 h-4" />
                    View Repository
                  </Button>
                </a>
              )}
              {project.liveUrl && project.liveUrl !== "#" && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="prose prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{project.fullDescription}</p>
            </section>

            {/* Tech Stack */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.stack.map((tech: string) => (
                  <div key={tech} className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-foreground font-medium">{tech}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Key Achievements */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Key Achievements</h2>
              <ul className="space-y-3">
                {project.achievements.map((achievement: string, idx: number) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-semibold">
                      ✓
                    </span>
                    <span className="text-muted-foreground pt-1">{achievement}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* CTA */}
            <section className="border-t border-border pt-12">
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                <h3 className="text-xl font-bold mb-3">Interested in this project?</h3>
                <p className="text-muted-foreground mb-6">Check out the code on GitHub or reach out for more details</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                      <Button className="gap-2">
                        <Github className="w-4 h-4" />
                        View Code
                      </Button>
                    </a>
                  )}
                  <a href="/#contact">
                    <Button variant="outline">Get in Touch</Button>
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
