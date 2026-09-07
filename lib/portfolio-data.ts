import fs from "fs"
import path from "path"

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  repoUrl?: string
  liveUrl?: string
  year: string
}

export interface HeroData {
  name: string
  tagline: string
  bio: string
  role: string
  stats: { label: string; value: string }[]
}

export interface AboutData {
  bio: string[]
  skillCategories: { label: string; skills: string[]; color: string }[]
  certifications: string[]
}

export interface ContactData {
  email: string
  phone: string
  location: string
  github: string
  linkedin: string
  funFact: string
}

export interface PortfolioData {
  hero: HeroData
  about: AboutData
  projects: Project[]
  contact: ContactData
}

const DATA_FILE = path.join(process.cwd(), "data", "portfolio.json")

export const DEFAULT_DATA: PortfolioData = {
  hero: {
    name: "Hariprashath B",
    role: "AI Engineer | Full-Stack Developer",
    tagline: "Crafting Intelligent Systems",
    bio: "Final-year B.Tech AI & Data Science student building agentic AI systems, generative AI solutions, and full-stack platforms that solve real-world problems.",
    stats: [
      { value: "Final Year", label: "B.Tech AI & Data Science" },
      { value: "8+ Projects", label: "Production AI Systems" },
      { value: "President", label: "AGEN Club @ KRCT" },
    ],
  },
  about: {
    bio: [
      "I'm a Final-year B.Tech student in Artificial Intelligence and Data Science from K. Ramakrishnan College of Technology (KRCT), Trichy, with a CGPA of 7.89 (till 5th Semester). Passionate about building intelligent systems that solve real-world problems, I specialize in generative AI, agentic AI systems, and full-stack development.",
      "As President of the AGEN Club (Agentic & Generative AI Club) at KRCT since 2025, I lead initiatives around emerging AI technologies, conduct webinars, workshops, and organized events with 700+ impressions. I completed an AI & Cloud Computing internship at CloudplusAI Tech and am certified in PL-300 (Microsoft Power BI) and Generative AI fundamentals.",
      "My goal is to build scalable AI systems, autonomous agents, and production-ready software solutions. I have hands-on experience across the full AI stack—from model training and fine-tuning to production deployment. Skilled in React, Python, Flask, Django, Node.js, TensorFlow, and Generative AI technologies.",
    ],
    skillCategories: [
      { label: "Programming Languages", skills: ["Python", "JavaScript", "TypeScript", "Java", "C", "SQL", "HTML5", "CSS3"], color: "primary" },
      { label: "Frameworks & Libraries", skills: ["React.js", "Node.js", "Flask", "Django", "Express.js", "TensorFlow", "Scikit-Learn"], color: "accent" },
      { label: "AI / ML / GenAI", skills: ["Machine Learning", "Deep Learning", "Generative AI", "Prompt Engineering", "AI Automation", "Hugging Face APIs", "OpenAI APIs", "Agentic AI Systems"], color: "primary" },
      { label: "Databases & Cloud", skills: ["PostgreSQL", "SQLite", "Supabase", "Cloud Integration"], color: "accent" },
      { label: "Tools & Platforms", skills: ["Git", "GitHub", "Power BI", "Figma", "Blender", "Canva", "Excel Analytics"], color: "primary" },
      { label: "Core Concepts", skills: ["REST APIs", "Full Stack Development", "Data Analytics", "System Design", "Model Fine-Tuning", "AI Workflow Automation"], color: "accent" },
    ],
    certifications: [
      "PL-300: Microsoft Power BI Data Analyst Associate (May 2025)",
      "Generative AI, Prompt Engineering & ChatGPT – Simplilearn (May 2025)",
      "Cloud Computing with AI Specialist Intern – CloudplusAI Tech (Apr–Jun 2025)",
      "Foundations: Programming Refresher – Simplilearn",
      "Python for Data Science – Simplilearn",
      "Machine Learning using Python – Simplilearn",
      "Data Science with Python & Tableau Desktop Specialist – Simplilearn",
      "HDCA (C, C++, Python) – Apollo Institute",
    ],
  },
  projects: [
    { id: "idcs", title: "IDCS – Unified Institutional ERP Framework", description: "Centralized institutional ERP platform to automate academic and administrative workflows including biometric attendance, payroll analytics, leave management, event approvals, and role-based access control.", tags: ["React", "Django REST", "JWT", "PostgreSQL"], repoUrl: "https://github.com/Hari-prashath-123", year: "2026" },
    { id: "autofixhub", title: "AutoFixHub", description: "Agentic AI tool that autonomously analyzes and commits code fixes to GitHub using generative AI and multi-agent workflows.", tags: ["Agentic AI", "Python", "LLM", "GitHub"], repoUrl: "https://github.com/Hari-prashath-123", year: "2025" },
    { id: "wire-edm", title: "Wire EDM AI Simulator", description: "Web-based CNC simulation using React, TypeScript, and AI-powered performance metrics visualization for wire electrical discharge machining.", tags: ["React", "TypeScript", "AI", "CNC Simulation"], repoUrl: "https://github.com/Hari-prashath-123", year: "2025" },
    { id: "ai-career", title: "AI Career Navigator", description: "AI-powered career guidance platform built using React, Supabase, and Hugging Face APIs. Developed at HackFinity 2025 National Hackathon.", tags: ["React", "Supabase", "Hugging Face", "GenAI"], repoUrl: "https://github.com/Hari-prashath-123", year: "2025" },
    { id: "qpg", title: "Question Paper Generator", description: "Flask-based website that generates question papers using syllabus PDFs and Bloom's taxonomy logic with NLP processing.", tags: ["Flask", "NLP", "Python", "Education"], repoUrl: "https://github.com/Hari-prashath-123", year: "2025" },
    { id: "ecommerce-ai", title: "E-Commerce AI Website", description: "Developed using Canva AI (Magic Media & Magic Write) for product management automation and intelligent content generation.", tags: ["Canva AI", "E-Commerce", "Automation"], repoUrl: "https://github.com/Hari-prashath-123", year: "2025" },
    { id: "marksheet", title: "Student Marksheet Management System", description: "Node.js + Express + SQLite-based CRUD web application for managing student academic records and generating marksheets.", tags: ["Node.js", "Express", "SQLite", "CRUD"], repoUrl: "https://github.com/Hari-prashath-123", year: "2024" },
    { id: "brick-tool", title: "Brick Lifting Tool & Sand Separator Design", description: "Innovative mechanical design registered with the Indian Patent Office, combining engineering and practical problem-solving.", tags: ["Patent", "Design", "Innovation"], year: "2024" },
  ],
  contact: {
    email: "hariprashath321@gmail.com",
    phone: "+91 9944 227 061",
    location: "Trichy, Tamil Nadu",
    github: "https://github.com/Hari-prashath-123",
    linkedin: "https://linkedin.com/in/hariprashath-b-3029s/",
    funFact: "I'm passionate about emerging AI technologies, love building agentic AI systems, and enjoy exploring the intersection of AI and human creativity. My hobbies include coding, web design, AI projects, and 3D modeling!",
  },
}

export function readPortfolioData(): PortfolioData {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return DEFAULT_DATA
    }
    const raw = fs.readFileSync(DATA_FILE, "utf-8")
    return { ...DEFAULT_DATA, ...JSON.parse(raw) }
  } catch {
    return DEFAULT_DATA
  }
}

export function writePortfolioData(data: PortfolioData): void {
  const dir = path.dirname(DATA_FILE)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8")
}
