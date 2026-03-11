import dynamic from "next/dynamic"
import { SCHEMA_ORG } from "@/lib/content"
import { safeJsonLd } from "@/lib/utils"
import { Hero } from "@/components/sections/Hero"
import { AboutSplit } from "@/components/sections/AboutSplit"
import { client } from "@/lib/sanity/client"
import { FEATURED_PROJECTS_QUERY } from "@/lib/sanity/queries"
import { FALLBACK_PROJECTS } from "@/lib/sanity/fallback"
import type { SanityProject } from "@/lib/sanity/types"

const ServicesGrid = dynamic(() =>
  import("@/components/sections/ServicesGrid").then((m) => ({ default: m.ServicesGrid }))
)
const StatsCounters = dynamic(() =>
  import("@/components/sections/StatsCounters").then((m) => ({ default: m.StatsCounters }))
)
const PortfolioGrid = dynamic(() =>
  import("@/components/sections/PortfolioGrid").then((m) => ({ default: m.PortfolioGrid }))
)
const WhyUs = dynamic(() =>
  import("@/components/sections/WhyUs").then((m) => ({ default: m.WhyUs }))
)
const Testimonials = dynamic(() =>
  import("@/components/sections/Testimonials").then((m) => ({ default: m.Testimonials }))
)
const EuGrantBanner = dynamic(() =>
  import("@/components/sections/EuGrantBanner").then((m) => ({ default: m.EuGrantBanner }))
)
const PricingPreview = dynamic(() =>
  import("@/components/sections/PricingPreview").then((m) => ({ default: m.PricingPreview }))
)
const FaqAccordion = dynamic(() =>
  import("@/components/sections/FaqAccordion").then((m) => ({ default: m.FaqAccordion }))
)
const CtaPanel = dynamic(() =>
  import("@/components/sections/CtaPanel").then((m) => ({ default: m.CtaPanel }))
)

async function getFeaturedProjects(): Promise<SanityProject[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return FALLBACK_PROJECTS
  }
  try {
    const projects = await client.fetch<SanityProject[]>(
      FEATURED_PROJECTS_QUERY,
      {},
      { next: { tags: ["project"] } }
    )
    return projects.length > 0 ? projects : FALLBACK_PROJECTS
  } catch {
    return FALLBACK_PROJECTS
  }
}

export default async function HomePage() {
  const projects = await getFeaturedProjects()

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(SCHEMA_ORG.localBusiness),
        }}
      />
      <Hero />
      <AboutSplit />
      <ServicesGrid />
      <StatsCounters />
      <PortfolioGrid projects={projects} />
      <WhyUs />
      <Testimonials />
      <EuGrantBanner />
      <PricingPreview />
      <FaqAccordion />
      <CtaPanel />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(SCHEMA_ORG.faqPage),
        }}
      />
    </main>
  )
}
