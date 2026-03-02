import type { Metadata } from "next"
import { SEO } from "@/lib/content"
import { PricingHero } from "@/components/sections/PricingHero"
import { PricingTiers } from "@/components/sections/PricingTiers"
import { EuGrantBanner } from "@/components/sections/EuGrantBanner"
import { FaqAccordion } from "@/components/sections/FaqAccordion"
import { CtaPanel } from "@/components/sections/CtaPanel"

export const metadata: Metadata = {
  title: SEO.pricing.title,
  description: SEO.pricing.description,
}

export default function CijenePage() {
  return (
    <main>
      <PricingHero />
      <PricingTiers />
      <EuGrantBanner />
      <FaqAccordion />
      <CtaPanel />
    </main>
  )
}
