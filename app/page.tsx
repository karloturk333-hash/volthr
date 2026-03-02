import { SCHEMA_ORG } from "@/lib/content"
import { Hero } from "@/components/sections/Hero"
import { ClientLogos } from "@/components/sections/ClientLogos"
import { AboutSplit } from "@/components/sections/AboutSplit"
import { ServicesGrid } from "@/components/sections/ServicesGrid"
import { PortfolioGrid } from "@/components/sections/PortfolioGrid"
import { WhyUs } from "@/components/sections/WhyUs"
import { Testimonials } from "@/components/sections/Testimonials"
import { CtaPanel } from "@/components/sections/CtaPanel"
import { PricingPreview } from "@/components/sections/PricingPreview"
import { FaqAccordion } from "@/components/sections/FaqAccordion"

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
