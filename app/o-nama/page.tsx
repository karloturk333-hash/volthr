import type { Metadata } from "next"
import { SEO } from "@/lib/content"
import { AboutHero } from "@/components/sections/AboutHero"
import { AboutStory } from "@/components/sections/AboutStory"
import { AboutValues } from "@/components/sections/AboutValues"
import { AboutProcess } from "@/components/sections/AboutProcess"
import { CtaPanel } from "@/components/sections/CtaPanel"

export const metadata: Metadata = {
  title: SEO.about.title,
  description: SEO.about.description,
}

export default function ONamaPage() {
  return (
    <main>
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutProcess />
      <CtaPanel />
    </main>
  )
}
