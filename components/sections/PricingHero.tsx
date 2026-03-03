"use client"

import { m } from "motion/react"
import { PRICING_PAGE } from "@/lib/content"
import { heroStagger, heroWord, fadeUp, staggerContainer } from "@/lib/animations"
import { Zap, ShieldCheck, FileX } from "lucide-react"

const iconMap = {
  zap: Zap,
  "shield-check": ShieldCheck,
  "file-x": FileX,
} as const

export function PricingHero() {
  const words = PRICING_PAGE.hero.heading.split(" ")

  return (
    <section className="bg-transparent px-6 py-32 md:py-40">
      <div className="mx-auto max-w-3xl text-center">

        {/* Label + rule */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex flex-col items-center gap-3"
        >
          <span className="section-label">{PRICING_PAGE.hero.label}</span>
          <div className="h-px w-12 bg-[#8B5CF6]" />
        </m.div>

        {/* H1 — word stagger */}
        <m.h1
          className="font-space text-4xl font-bold leading-[1.08] text-[#0D0D0D] md:text-5xl lg:text-6xl"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          {words.map((word, i) => (
            <m.span
              key={i}
              variants={heroWord}
              className="mr-[0.25em] inline-block last:mr-0"
            >
              {word}
            </m.span>
          ))}
        </m.h1>

        {/* Subheading */}
        <m.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-base leading-relaxed text-[#555550] md:text-lg"
        >
          {PRICING_PAGE.hero.subheading}
        </m.p>

        {/* Trust badges */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-wrap items-center justify-center gap-6"
        >
          {PRICING_PAGE.hero.trustBadges.map((badge) => {
            const Icon = iconMap[badge.icon]
            return (
              <m.div
                key={badge.text}
                variants={fadeUp}
                className="flex items-center gap-2"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8B5CF6]/10">
                  <Icon size={16} className="text-[#8B5CF6]" />
                </div>
                <span className="text-sm font-medium text-[#0D0D0D]">
                  {badge.text}
                </span>
              </m.div>
            )
          })}
        </m.div>

      </div>
    </section>
  )
}
