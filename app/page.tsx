import dynamic from "next/dynamic"
import { SCHEMA_ORG } from "@/lib/content"
import { Hero } from "@/components/sections/Hero"
import { ClientLogos } from "@/components/sections/ClientLogos"
import { AboutSplit } from "@/components/sections/AboutSplit"

const ServicesGrid = dynamic(() =>
  import("@/components/sections/ServicesGrid").then((m) => ({ default: m.ServicesGrid }))
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
const CtaPanel = dynamic(() =>
  import("@/components/sections/CtaPanel").then((m) => ({ default: m.CtaPanel }))
)
const PricingPreview = dynamic(() =>
  import("@/components/sections/PricingPreview").then((m) => ({ default: m.PricingPreview }))
)
const FaqAccordion = dynamic(() =>
  import("@/components/sections/FaqAccordion").then((m) => ({ default: m.FaqAccordion }))
)

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ClientLogos />
      <AboutSplit />
      <ServicesGrid />
      <PortfolioGrid />
      <WhyUs />
      <Testimonials />
      <CtaPanel />
      <PricingPreview />
      <FaqAccordion />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(SCHEMA_ORG.faqPage),
        }}
      />
    </main>
  )
}
