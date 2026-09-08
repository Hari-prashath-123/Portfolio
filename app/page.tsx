import Preloader from "@/components/hud/Preloader"
import HudNavbar from "@/components/hud/HudNavbar"
import HudHero from "@/components/hud/HudHero"
import HudAbout from "@/components/hud/HudAbout"
import HudSkills from "@/components/hud/HudSkills"
import HudRoadMap from "@/components/hud/HudRoadMap"
import HudProjects from "@/components/hud/HudProjects"
import HudContact from "@/components/hud/HudContact"
import HudFooter from "@/components/hud/HudFooter"

export default function Home() {
  return (
    <main style={{ background: "var(--hud-bg)", minHeight: "100vh" }}>
      <Preloader />
      <HudNavbar />
      <HudHero />
      <HudAbout />
      <HudSkills />
      <HudRoadMap />
      <HudProjects />
      <HudContact />
      <HudFooter />
    </main>
  )
}
