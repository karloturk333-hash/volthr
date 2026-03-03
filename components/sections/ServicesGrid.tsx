"use client"

import Image from "next/image"
import { m } from "motion/react"
import { Layout, Palette, Search, ShoppingCart } from "lucide-react"
import { SERVICES_ACCORDION } from "@/lib/content"
import { fadeUp, staggerContainer } from "@/lib/animations"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"

// Abstract/designer stock photos from Unsplash — each thematically matched to the service
const serviceConfig = [
  {
    Icon: Layout,
    href: "/usluge",
    cta: "Saznaj više",
    background: (
      <>
        {/* Abstract fluid design — web dizajn */}
        <Image
          src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=900&q=75&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover opacity-30"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Tint */}
        <div
          className="absolute inset-0 opacity-10"
          style={{ background: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)" }}
        />
        {/* Bottom scrim — keeps text readable */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-white via-white/90 to-transparent" />
      </>
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: Palette,
    href: "/usluge",
    cta: "Saznaj više",
    background: (
      <>
        {/* Colorful abstract paint pour — branding */}
        <Image
          src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=900&q=75&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover opacity-30"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 66vw"
        />
        {/* Bottom scrim */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-white via-white/90 to-transparent" />
      </>
    ),
    className: "lg:col-start-2 lg:col-end-4 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Search,
    href: "/usluge",
    cta: "Saznaj više",
    background: (
      <>
        {/* Data/analytics abstract — SEO */}
        <Image
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=75&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover opacity-30"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Tint */}
        <div
          className="absolute inset-0 opacity-10"
          style={{ background: "linear-gradient(135deg, #059669 0%, #065F46 100%)" }}
        />
        {/* Bottom scrim */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-white via-white/90 to-transparent" />
      </>
    ),
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3",
  },
  {
    Icon: ShoppingCart,
    href: "/usluge",
    cta: "Saznaj više",
    background: (
      <>
        {/* Minimal product flatlay — e-commerce */}
        <Image
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=75&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover opacity-30"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Tint */}
        <div
          className="absolute inset-0 opacity-10"
          style={{ background: "linear-gradient(135deg, #D97706 0%, #92400E 100%)" }}
        />
        {/* Bottom scrim */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-white via-white/90 to-transparent" />
      </>
    ),
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3",
  },
] as const

// Pre-computed at module level — both sources are constants
const cards = SERVICES_ACCORDION.items.map((item, i) => ({
  name: item.title,
  description: item.description,
  ...serviceConfig[i],
}))

export function ServicesGrid() {

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
