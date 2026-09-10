import HeroLanding from "@/components/hero-landing"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Roadmap from "@/components/roadmap"
import TechStack from "@/components/tech-stack"
import Projects from "@/components/projects"
import About from "@/components/about"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* 100vh Pure White Cinematic Editorial Landing Hero with Liquid Typography */}
      <HeroLanding />

      {/* Existing Portfolio Architecture & Navigation */}
      <Header />
      <Hero />
      <Roadmap />
      <TechStack />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
