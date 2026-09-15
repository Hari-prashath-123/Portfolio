import HeroLanding from "@/components/hero-landing"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Roadmap from "@/components/roadmap"
import TechStack from "@/components/tech-stack"
import Projects from "@/components/projects"
import About from "@/components/about"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { readPortfolioData } from "@/lib/portfolio-data"

// Force dynamic server rendering on every request — ensures MongoDB changes reflect immediately
export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function Home() {
  const portfolioData = await readPortfolioData()

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* 100vh Pure White Cinematic Editorial Landing Hero with Liquid Typography */}
      <HeroLanding name={portfolioData.hero.name} />

      {/* Existing Portfolio Architecture & Navigation */}
      <Header name={portfolioData.hero.name} />
      <Hero data={portfolioData.hero} />
      <Roadmap />
      <TechStack skills={portfolioData.skills} />
      <Projects projects={portfolioData.projects} />
      <About data={portfolioData.about} />
      <Contact contact={portfolioData.contact} />
      <Footer name={portfolioData.hero.name} contact={portfolioData.contact} />
    </main>
  )
}
