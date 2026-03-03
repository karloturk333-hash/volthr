import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { SEO, SCHEMA_ORG } from "@/lib/content"
import { safeJsonLd } from "@/lib/utils"
import { PricingHero } from "@/components/sections/PricingHero"
import { PricingTiers } from "@/components/sections/PricingTiers"
import { EuGrantBanner } from "@/components/sections/EuGrantBanner"
import { CtaPanel } from "@/components/sections/CtaPanel"

const FaqAccordion = dynamic(() =>
  import("@/components/sections/FaqAccordion").then((m) => ({ default: m.FaqAccordion }))
)

export const metadata: Metadata = {
  title: SEO.pricing.title,
  description: SEO.pricing.description,
  alternates: { canonical: "/cijene" },
  openGraph: {
    title: SEO.pricing.title,
    description: SEO.pricing.description,
    url: "/cijene",
    type: "website",
    locale: "hr_HR",
  },
}

export default function CijenePage() {
  return (
    <main>
      <PricingHero />
      <PricingTiers />
      <EuGrantBanner />
      <FaqAccordion />
      <CtaPanel />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(SCHEMA_ORG.faqPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(SCHEMA_ORG.pricingPage) }}
      />
    </main>
  )
}
