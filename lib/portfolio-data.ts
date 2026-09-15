import { getDb } from "@/lib/mongodb"

export interface StatItem {
  value: string
  label: string
}

export interface KpiMetric {
  value: string
  label: string
}

export interface ExperienceRole {
  title: string
  organization: string
  period: string
  type: string
  description: string
}

export interface PillarItem {
  tag: string
  title: string
  description: string
}

export interface CertificationItem {
  title: string
  issuer: string
  date: string
  type: string
}

export interface HeroData {
  name: string
  role: string
  tagline: string
  bio: string
  stats: StatItem[]
}

export interface AboutData {
  heading: string
  paragraphs: string[]
  kpis: KpiMetric[]
  experience: ExperienceRole[]
  pillars: PillarItem[]
  certifications: CertificationItem[]
}

export interface SkillsData {
  row1: string[]
  row2: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  repoUrl?: string
  liveUrl?: string
  year: string
  category?: string
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
  skills: SkillsData
  projects: Project[]
  contact: ContactData
}

// ─── Default / seed data exactly matching current website ─────────────────────
export const DEFAULT_DATA: PortfolioData = {
  hero: {
    name: "Hariprashath B",
    role: "AI Engineer & Full-Stack Architect",
    tagline: "Crafting Intelligent Systems",
    bio: "Final-year B.Tech AI & Data Science student building agentic AI systems, generative AI solutions, and full-stack platforms that solve real-world problems.",
    stats: [
      { value: "Final Year", label: "B.Tech AI & Data Science" },
      { value: "6+ Projects", label: "Production AI Systems" },
      { value: "President", label: "AGEN Club @ KRCT" },
    ],
  },
  about: {
    heading: "Architecting Autonomous AI Systems with Production-Grade Engineering.",
    paragraphs: [
      "I am a Final-Year B.Tech student in Artificial Intelligence & Data Science at K. Ramakrishnan College of Technology (KRCT), Trichy, maintaining a strong academic standing with a 7.84 CGPA.",
      "My core expertise spans designing multi-agent collaborative workflows, fine-tuning large language models, prompt engineering, and building resilient full-stack platforms. I thrive at the convergence of research-driven generative AI and scalable software architecture.",
    ],
    kpis: [
      { value: "7.84", label: "CGPA (Till 6th Sem)" },
      { value: "2027", label: "Graduation Batch" },
      { value: "8+", label: "Production Systems" },
      { value: "700+", label: "Event Attendees" },
    ],
    experience: [
      {
        title: "President · AGEN Club",
        organization: "KRCT",
        period: "2025 - PRESENT",
        type: "LEADERSHIP",
        description: "Lead the Agentic & Generative AI Club. Organized campus-wide webinars, hands-on hackathons, and technical workshops generating 700+ impressions.",
      },
      {
        title: "React.js & Vite Developer Intern",
        organization: "Centennial InfoTech Pvt. Ltd.",
        period: "JUL 2026 - PRESENT",
        type: "INTERNSHIP",
        description: "Centennial InfoTech Pvt. Ltd. Building Centennial Connect, a production SaaS platform for AI-powered business calling with real-time AI voice agents and intelligent power dialing.",
      },
      {
        title: "AI & Cloud Specialist Intern",
        organization: "CloudplusAI Tech",
        period: "APR–JUN 2025",
        type: "INTERNSHIP",
        description: "CloudplusAI Tech. Engineered cloud computing integration with AI workloads, containerized model APIs, and assisted in deployment architectures.",
      },
    ],
    pillars: [
      {
        tag: "AGENTIC_NODE",
        title: "Autonomous Agentic AI",
        description: "Architecting reasoning loops, autonomous tool-calling systems, and multi-agent workflows using LangGraph, CrewAI, and modern LLM frameworks.",
      },
      {
        tag: "FULLSTACK_CORE",
        title: "Production Full-Stack AI",
        description: "Building reactive, ultra-fast interfaces in Next.js & React, backed by robust asynchronous APIs in FastAPI, Node.js, PostgreSQL, and Supabase.",
      },
      {
        tag: "DATA_PIPELINE",
        title: "Data Intelligence & Analytics",
        description: "PL-300 certified data modeling, exploratory business intelligence, fine-tuning evaluations, and end-to-end telemetry for real-world reliability.",
      },
    ],
    certifications: [
      {
        title: "Applied Generative AI Specialization",
        issuer: "Simplilearn",
        date: "May 2026",
        type: "Distinction Award",
      },
      {
        title: "PL-300: Microsoft Power BI Data Analyst Associate",
        issuer: "Microsoft",
        date: "May 2025",
        type: "Certified Associate",
      },
      {
        title: "Essentials of Generative AI, Prompt Engineering & ChatGPT",
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
    ],
  },
  skills: {
    row1: [
      "Tailwind CSS",
      "Bootstrap",
      "Node.js",
      "Express.js",
      "Java",
      "Python",
      "REST APIs",
      "JWT Auth",
      "MySQL",
      "MongoDB",
      "PostgreSQL",
      "Docker",
      "TypeScript",
      "React",
      "Next.js",
    ],
    row2: [
      "LLMs",
      "Computer Vision",
      "Prompt Engineering",
      "Machine Learning",
      "NLP",
      "Generative AI",
      "Agentic AI",
      "Deep Learning",
      "TensorFlow",
      "PyTorch",
      "Hugging Face",
      "Autonomous Agents",
      "LangChain",
      "Vector DBs",
    ],
  },
  projects: [
    {
      id: "idcs",
      title: "IDCS – Unified Institutional ERP Framework",
      description: "Centralized institutional ERP platform to automate academic and administrative workflows including biometric attendance, payroll analytics, leave management, event approvals, and role-based access control.",
      tags: ["React", "Django REST", "JWT", "PostgreSQL"],
      repoUrl: "https://github.com/Pixel-Square/IDCS-Restart",
      year: "2026",
    },
    {
      id: "centennial-connect",
      title: "Centennial Connect – AI-Powered Business Calling SaaS",
      description: "Production SaaS platform for AI-powered business calling featuring virtual number management, real-time AI voice agents, and intelligent power dialing for sales and support teams.",
      tags: ["TypeScript", "React", "SaaS", "AI Voice"],
      repoUrl: "https://github.com/Hari-prashath-123/centennial-connect",
      year: "2026",
    },
    {
      id: "autofixhub",
      title: "AutoFixHub – Agentic AI",
      description: "Agentic AI tool that autonomously analyzes code issues and commits code fixes directly to GitHub using LLM agents and the GitHub API.",
      tags: ["Agentic AI", "Python", "LLM", "GitHub"],
      repoUrl: "https://github.com/Hari-prashath-123",
      year: "2025",
    },
    {
      id: "wire-edm",
      title: "Wire EDM AI Simulator",
      description: "Web-based CNC Wire EDM simulation built with React and TypeScript featuring AI-powered performance metrics visualization.",
      tags: ["React", "TypeScript", "AI", "CNC Simulation"],
      repoUrl: "https://github.com/Hari-prashath-123/Wire-EDM-new",
      year: "2025",
    },
    {
      id: "academic-rag",
      title: "Academic RAG",
      description: "Retrieval-Augmented Generation system enabling students to query academic and course materials using natural language, receiving context-grounded answers via LLM APIs.",
      tags: ["RAG", "GenAI", "React", "LLM APIs"],
      repoUrl: "https://github.com/Hari-prashath-123/Academic-Rag",
      year: "2025",
    },
    {
      id: "recruitment-automation",
      title: "Recruitment Automation – Centennial",
      description: "Automation tool for resume screening and candidate shortlisting to streamline internal recruitment workflows at Centennial InfoTech.",
      tags: ["Automation", "TypeScript", "AI", "React"],
      repoUrl: "https://github.com/Hari-prashath-123/Recruitment-Automation-Centennial",
      year: "2026",
    },
    {
      id: "marksheet",
      title: "Student Marksheet Management System",
      description: "Node.js + Express + SQLite-based CRUD web application for managing student academic records and generating marksheets.",
      tags: ["Node.js", "Express", "SQLite", "CRUD"],
      repoUrl: "https://github.com/Hari-prashath-123",
      year: "2024",
    },
    {
      id: "brick-tool",
      title: "Brick Lifting Tool & Sand Separator Design",
      description: "Innovative mechanical design registered with the Indian Patent Office, combining engineering and practical problem-solving.",
      tags: ["Patent", "Design", "Innovation"],
      year: "2024",
    },
  ],
  contact: {
    email: "hariprashath321@gmail.com",
    phone: "+91 9944 227 061",
    location: "Trichy, Tamil Nadu",
    github: "https://github.com/Hari-prashath-123",
    linkedin: "https://linkedin.com/in/hariprashath-b-3029s",
    funFact: "I'm passionate about emerging AI technologies, love building agentic AI systems, and enjoy exploring the intersection of AI and human creativity. My hobbies include coding, web design, AI projects, and 3D modeling!",
  },
}

// ─── MongoDB document key ─────────────────────────────────────────────────────
const DOC_ID = "main"
const COLLECTION = "portfolio"

// ─── Read from MongoDB (falls back to DEFAULT_DATA and merges subfields) ──────
export async function readPortfolioData(): Promise<PortfolioData> {
  try {
    const db = await getDb()
    const doc = await db.collection(COLLECTION).findOne({ _id: DOC_ID as any })
    if (!doc) {
      // First run — seed MongoDB with complete defaults
      await db.collection(COLLECTION).insertOne({ _id: DOC_ID as any, ...DEFAULT_DATA })
      return DEFAULT_DATA
    }

    const { _id, ...saved } = doc as any

    // Ensure deep merging so newly introduced sections (like full about or skills)
    // are never undefined if an older doc exists in MongoDB
    return {
      hero: { ...DEFAULT_DATA.hero, ...(saved.hero || {}) },
      about: {
        heading: saved.about?.heading || DEFAULT_DATA.about.heading,
        paragraphs: Array.isArray(saved.about?.paragraphs) && saved.about.paragraphs.length > 0 
          ? saved.about.paragraphs 
          : DEFAULT_DATA.about.paragraphs,
        kpis: Array.isArray(saved.about?.kpis) && saved.about.kpis.length > 0 
          ? saved.about.kpis 
          : DEFAULT_DATA.about.kpis,
        experience: Array.isArray(saved.about?.experience) && saved.about.experience.length > 0 
          ? saved.about.experience 
          : DEFAULT_DATA.about.experience,
        pillars: Array.isArray(saved.about?.pillars) && saved.about.pillars.length > 0 
          ? saved.about.pillars 
          : DEFAULT_DATA.about.pillars,
        certifications: Array.isArray(saved.about?.certifications) && saved.about.certifications.length > 0 
          ? saved.about.certifications 
          : DEFAULT_DATA.about.certifications,
      },
      skills: {
        row1: Array.isArray(saved.skills?.row1) && saved.skills.row1.length > 0 
          ? saved.skills.row1 
          : DEFAULT_DATA.skills.row1,
        row2: Array.isArray(saved.skills?.row2) && saved.skills.row2.length > 0 
          ? saved.skills.row2 
          : DEFAULT_DATA.skills.row2,
      },
      projects: Array.isArray(saved.projects) && saved.projects.length > 0 
        ? saved.projects 
        : DEFAULT_DATA.projects,
      contact: { ...DEFAULT_DATA.contact, ...(saved.contact || {}) },
    }
  } catch (err) {
    console.error("[MongoDB] readPortfolioData error:", err)
    return DEFAULT_DATA
  }
}

// ─── Write to MongoDB ─────────────────────────────────────────────────────────
export async function writePortfolioData(data: PortfolioData): Promise<void> {
  try {
    const db = await getDb()
    await db.collection(COLLECTION).replaceOne(
      { _id: DOC_ID as any },
      { _id: DOC_ID as any, ...data },
      { upsert: true }
    )
  } catch (err) {
    console.error("[MongoDB] writePortfolioData error:", err)
    throw err
  }
}
