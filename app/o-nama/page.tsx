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
  alternates: { canonical: "/o-nama" },
  openGraph: {
    title: SEO.about.title,
    description: SEO.about.description,
    url: "/o-nama",
    type: "website",
    locale: "hr_HR",
  },
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
