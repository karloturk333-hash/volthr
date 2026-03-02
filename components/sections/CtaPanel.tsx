"use client"

import { m } from "motion/react"
import Link from "next/link"
import { CTA_SECTION } from "@/lib/content"
import { ctaHeadline, fadeUp, staggerContainer } from "@/lib/animations"

export function CtaPanel() {
  return (
    <section id="cta" className="bg-[#0D0D0D] px-6 py-24 md:px-12 md:py-32">
      <m.div
        className="mx-auto max-w-4xl text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <m.h2
          variants={ctaHeadline}
          className="font-space text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
        >
          {CTA_SECTION.heading}
        </m.h2>

        <m.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-[#888880] md:text-lg"
        >
          {CTA_SECTION.subheading}
        </m.p>

        <m.div variants={fadeUp} className="mt-10">
          <Link
            href={CTA_SECTION.cta.primary.href}
            className="inline-flex items-center justify-center rounded-full bg-[#8B5CF6] px-8 py-4 font-dm text-base font-bold text-white hover:opacity-90"
          >
            {CTA_SECTION.cta.primary.label}
          </Link>
        </m.div>
      </m.div>
    </section>
  )
}
