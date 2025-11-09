import ProjectCard from "./project-card"

const PROJECTS = [
  {
    id: "autofixhub",
    title: "AutoFixHub",
    description: "An agentic code-fixing bot that automatically identifies and resolves bugs using generative AI",
    tags: ["Agentic AI", "Python", "LLM"],
    repoUrl: "https://github.com/Hari-prashath-123",
  },
  {
    id: "wire-edm",
    title: "Wire EDM AI Simulator",
    description: "Machine learning simulation of wire electrical discharge machining (EDM) manufacturing processes",
    tags: ["ML", "Manufacturing", "Simulation"],
    repoUrl: "https://github.com/Hari-prashath-123",
  },
  {
    id: "ai-career",
    title: "AI Career Navigator",
    description: "Personalized career guidance platform powered by generative AI and LLMs",
    tags: ["Generative AI", "TypeScript", "React"],
    repoUrl: "https://github.com/Hari-prashath-123",
  },
  {
    id: "qpg",
    title: "Question Paper Generator",
    description: "Automated tool for generating custom question papers using NLP and machine learning",
    tags: ["NLP", "Python", "AI"],
    repoUrl: "https://github.com/Hari-prashath-123",
  },
  {
    id: "ecommerce-ai",
    title: "E-Commerce AI Website",
    description: "Full-stack e-commerce platform with AI-powered product recommendations",
    tags: ["React", "Node.js", "AI"],
    repoUrl: "https://github.com/Hari-prashath-123",
  },
  {
    id: "idcs",
    title: "IDCS Project",
    description: "Data-driven insights and collaborative system for college projects",
    tags: ["Data Analysis", "TypeScript", "React"],
    repoUrl: "https://github.com/Hari-prashath-123",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 bg-secondary">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
          <p className="text-lg text-muted-foreground">
            Explore my latest work in AI, data science, and full-stack development
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}
