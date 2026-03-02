"use client"

import { m } from "motion/react"
import { Layout, Palette, Search, ShoppingCart } from "lucide-react"
import { SERVICES_ACCORDION } from "@/lib/content"
import { fadeUp, staggerContainer } from "@/lib/animations"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"

const serviceConfig = [
  {
    Icon: Layout,
    href: "/usluge",
    cta: "Saznaj više",
    background: (
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)",
        }}
      />
    ),
    className:
      "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: Palette,
    href: "/usluge",
    cta: "Saznaj više",
    background: (
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: "linear-gradient(135deg, #0D0D0D 0%, #555 100%)",
        }}
      />
    ),
    className:
      "lg:col-start-2 lg:col-end-4 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Search,
    href: "/usluge",
    cta: "Saznaj više",
    background: (
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: "linear-gradient(135deg, #059669 0%, #065F46 100%)",
        }}
      />
    ),
    className:
      "lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3",
  },
  {
    Icon: ShoppingCart,
    href: "/usluge",
    cta: "Saznaj više",
    background: (
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: "linear-gradient(135deg, #D97706 0%, #92400E 100%)",
        }}
      />
    ),
    className:
      "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3",
  },
] as const

export function ServicesGrid() {
  const cards = SERVICES_ACCORDION.items.map((item, i) => ({
    name: item.title,
    description: item.description,
    ...serviceConfig[i],
  }))

  return (
    <section
      id="services"
      className="bg-[#F5F4F0] px-6 py-24 md:px-12 md:py-32 lg:py-36"
    >
      <m.div
        className="mx-auto max-w-7xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <m.div variants={fadeUp} className="mb-14">
          <span className="section-label">{SERVICES_ACCORDION.label}</span>
        </m.div>

        <m.div variants={fadeUp}>
          <BentoGrid>
            {cards.map((card) => (
              <BentoCard key={card.name} {...card} />
            ))}
          </BentoGrid>
        </m.div>
      </m.div>
    </section>
  )
}
