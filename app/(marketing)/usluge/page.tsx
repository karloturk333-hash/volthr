import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { SEO } from "@/lib/content"
import { ServicesHero } from "@/components/sections/ServicesHero"
import { ServicesChapters } from "@/components/sections/ServicesChapters"
import { CtaPanel } from "@/components/sections/CtaPanel"

const ServicesGrid = dynamic(() =>
  import("@/components/sections/ServicesGrid").then((m) => ({ default: m.ServicesGrid }))
)

export const metadata: Metadata = {
  title: SEO.services.title,
  description: SEO.services.description,
  alternates: { canonical: "/usluge" },
  openGraph: {
    title: SEO.services.title,
    description: SEO.services.description,
    url: "/usluge",
    type: "website",
    locale: "hr_HR",
  },
}

export default function UslugePage() {
  return (
    <main>
      <ServicesHero />
      <ServicesGrid />
      <ServicesChapters />
      <CtaPanel />
    </main>
  )
}
