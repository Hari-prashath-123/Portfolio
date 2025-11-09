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
  autofixhub: {
    title: "AutoFixHub",
    date: "2024",
    role: "Creator & Lead Developer",
    description:
      "An intelligent code-fixing bot that automatically identifies and resolves bugs using generative AI and agentic workflows.",
    fullDescription: `AutoFixHub is an agentic AI system designed to autonomously identify, analyze, and fix code bugs. It leverages multiple LLMs to understand code context, generate fixes, and validate solutions. The system can handle various programming languages and integrates with popular version control systems.`,
    stack: ["Python", "LLM", "Agentic AI", "TypeScript", "Node.js"],
    achievements: [
      "Achieved 85% bug detection accuracy across multiple programming languages",
      "Reduced manual debugging time by 60% in pilot deployments",
      "Successfully integrated with 10+ popular open-source projects",
    ],
    tags: ["Agentic AI", "Generative AI", "Python", "LLM"],
    repoUrl: "https://github.com/Hari-prashath-123/autofixhub",
    liveUrl: "#",
  },
  "wire-edm": {
    title: "Wire EDM AI Simulator",
    date: "2024",
    role: "ML Engineer",
    description:
      "Machine learning simulation of wire electrical discharge machining processes for manufacturing optimization.",
    fullDescription: `This project simulates wire EDM manufacturing processes using machine learning models trained on industrial data. It predicts optimal machining parameters, surface finish quality, and tool wear patterns to improve manufacturing efficiency and reduce waste.`,
    stack: ["Python", "TensorFlow", "scikit-learn", "Data Analysis"],
    achievements: [
      "Built ML model predicting surface finish with 94% accuracy",
      "Reduced simulation time from hours to minutes",
      "Validated against real manufacturing data with <2% error margin",
    ],
    tags: ["ML", "Manufacturing", "Simulation", "Python"],
    repoUrl: "https://github.com/Hari-prashath-123/wire-edm",
    liveUrl: "#",
  },
  "ai-career": {
    title: "AI Career Navigator",
    date: "2024",
    role: "Full Stack Developer",
    description:
      "Personalized career guidance platform powered by generative AI that analyzes skills and recommends career paths.",
    fullDescription: `AI Career Navigator provides personalized career recommendations based on individual skills, interests, and market trends. It uses generative AI to create customized learning paths, identifies skill gaps, and connects users with relevant opportunities.`,
    stack: ["React", "TypeScript", "Node.js", "Generative AI", "PostgreSQL"],
    achievements: [
      "Onboarded 500+ beta users in first month",
      "Generated personalized learning paths for 95% of users",
      "Achieved 4.8/5 user satisfaction rating",
    ],
    tags: ["Generative AI", "TypeScript", "React", "Full Stack"],
    repoUrl: "https://github.com/Hari-prashath-123/ai-career",
    liveUrl: "#",
  },
  qpg: {
    title: "Question Paper Generator",
    date: "2023",
    role: "NLP Engineer",
    description:
      "Automated tool that generates custom question papers using NLP and machine learning from educational content.",
    fullDescription: `Question Paper Generator automates the creation of customized educational assessments. Using NLP, it analyzes textbooks and course materials, generates questions of varying difficulty levels, and creates balanced papers aligned with curriculum standards.`,
    stack: ["Python", "NLP", "scikit-learn", "FastAPI"],
    achievements: [
      "Generated over 10,000+ unique question papers",
      "Supports 5+ educational frameworks",
      "Reduced paper creation time by 80%",
    ],
    tags: ["NLP", "Python", "Education", "AI"],
    repoUrl: "https://github.com/Hari-prashath-123/qpg",
    liveUrl: "#",
  },
  "ecommerce-ai": {
    title: "E-Commerce AI Website",
    date: "2023",
    role: "Full Stack Developer",
    description: "Complete e-commerce platform featuring AI-powered product recommendations and intelligent search.",
    fullDescription: `A production-ready e-commerce platform built with modern web technologies and integrated AI for personalized shopping experiences. Features include recommendation engine, intelligent search, user profiling, and analytics dashboard.`,
    stack: ["React", "Node.js", "MongoDB", "TensorFlow", "Redis"],
    achievements: [
      "Implemented recommendation engine with 70% CTR improvement",
      "Handled 1000+ concurrent users with <200ms response time",
      "Generated $50K+ in test revenue during pilot",
    ],
    tags: ["React", "Node.js", "E-Commerce", "AI"],
    repoUrl: "https://github.com/Hari-prashath-123/ecommerce-ai",
    liveUrl: "#",
  },
  idcs: {
    title: "IDCS Project",
    date: "2023",
    role: "Data Analyst & Developer",
    description: "Data-driven insights system for collaborative college projects with analytics and reporting.",
    fullDescription: `IDCS (Intelligent Data Collaboration System) provides comprehensive analytics and insights for academic projects. It includes data visualization, collaboration tools, and AI-powered insights generation for team-based learning.`,
    stack: ["TypeScript", "React", "Python", "PostgreSQL"],
    achievements: [
      "Processed data from 100+ student projects",
      "Generated actionable insights improving project outcomes by 35%",
      "Built collaborative dashboard used by 50+ teams",
    ],
    tags: ["Data Analysis", "TypeScript", "React", "Analytics"],
    repoUrl: "https://github.com/Hari-prashath-123/idcs",
    liveUrl: "#",
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
