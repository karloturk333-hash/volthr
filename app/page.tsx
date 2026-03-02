import { Hero } from "@/components/sections/Hero"
import { ClientLogos } from "@/components/sections/ClientLogos"
import { AboutSplit } from "@/components/sections/AboutSplit"
import { ServicesGrid } from "@/components/sections/ServicesGrid"
import { KeywordMarquee } from "@/components/sections/KeywordMarquee"
import { PortfolioGrid } from "@/components/sections/PortfolioGrid"
import { StatsCounters } from "@/components/sections/StatsCounters"

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ClientLogos />
      <AboutSplit />
      <ServicesGrid />
      <KeywordMarquee />
      <PortfolioGrid />
      <StatsCounters />
    </main>
  )
}
