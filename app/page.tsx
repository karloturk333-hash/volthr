import { Hero } from "@/components/sections/Hero"
import { ClientLogos } from "@/components/sections/ClientLogos"
import { AboutSplit } from "@/components/sections/AboutSplit"

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ClientLogos />
      <AboutSplit />
    </main>
  )
}
