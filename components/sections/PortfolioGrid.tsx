"use client"

import { m } from "motion/react"
import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"
import { PORTFOLIO, SITE } from "@/lib/content"
import { projectCard } from "@/lib/animations"
import { TextRevealByWord } from "@/components/ui/text-reveal"

export function PortfolioGrid() {
  return (
    <section id="projects" className="bg-[#F5F4F0]">

      {/* Section label */}
      <div className="px-6 pt-24 md:px-12 md:pt-32 lg:pt-36">
        <div className="mx-auto max-w-7xl">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={projectCard}
          >
            <span className="section-label">{PORTFOLIO.label}</span>
          </m.div>
        </div>
      </div>

      {/* Scroll-reveal heading */}
      <TextRevealByWord text={PORTFOLIO.heading} />

      {/* Empty state */}
      <m.div
        className="mx-auto max-w-7xl px-6 pb-24 md:px-12 md:pb-32 lg:pb-36"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={projectCard}
      >
        <div className="mx-auto max-w-2xl rounded-xl border border-[#E8E6E0] bg-white px-8 py-12 text-center">
          <p className="text-base leading-relaxed text-[#555550] md:text-lg">
            {PORTFOLIO.emptyState}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/cijene"
              className="inline-flex items-center gap-2 rounded-full bg-[#0D0D0D] px-6 py-3 font-dm text-sm font-semibold text-white hover:opacity-90"
            >
              Pogledaj cijene
              <ArrowRight size={16} />
            </Link>
            <Link
              href={SITE.whatsapp}
              className="inline-flex items-center gap-2 rounded-full border border-[#0D0D0D] px-6 py-3 font-dm text-sm font-semibold text-[#0D0D0D] hover:bg-[#0D0D0D] hover:text-white"
            >
              <MessageCircle size={16} />
              Besplatna konzultacija
            </Link>
          </div>
        </div>
      </m.div>

    </section>
  )
}
