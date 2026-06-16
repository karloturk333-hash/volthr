"use client"

import { m } from "motion/react"
import { Check } from "lucide-react"
import { GRANT_HERO } from "@/lib/content"
import { fadeUp, staggerContainer } from "@/lib/animations"

export function GrantPackageHero() {
  return (
    <section className="bg-paper px-6 pt-32 pb-16 md:px-12 md:pt-40 md:pb-20">
      <m.div
        className="mx-auto max-w-4xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <m.div variants={fadeUp} className="mb-8">
          <span className="font-dm text-[11px] font-semibold uppercase tracking-widest text-accent">
            {GRANT_HERO.label}
          </span>
        </m.div>

        {/* Main card */}
        <m.div
          variants={fadeUp}
          className="relative rounded-xl border-2 border-accent bg-white p-8 md:p-10"
        >
          {/* Badge */}
          <div className="absolute -top-4 right-6 rounded-full bg-[#15803D] px-4 py-1.5 text-xs font-bold text-white">
            {GRANT_HERO.badge}
          </div>

          {/* Title + subtitle */}
          <h1 className="font-space text-3xl font-bold text-ink md:text-4xl">
            {GRANT_HERO.name}
          </h1>
          <p className="mt-2 font-dm text-base leading-relaxed text-muted">
            {GRANT_HERO.subtitle}
          </p>

          {/* Features */}
          <ul className="mt-8 space-y-3">
            {GRANT_HERO.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 font-dm text-base">
                <Check size={18} className="mt-0.5 shrink-0 text-accent" />
                <span className="text-[#333]">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Price breakdown box */}
          <div className="mt-10 rounded-lg border border-line bg-paper p-6">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <span className="font-dm text-sm text-muted">
                {GRANT_HERO.priceBreakdown.total.label}
              </span>
              <span className="font-space text-lg font-bold text-ink">
                {GRANT_HERO.priceBreakdown.total.amount}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-line py-3">
              <span className="font-dm text-sm text-[#15803D]">
                {GRANT_HERO.priceBreakdown.grant.label}
              </span>
              <span className="font-space text-lg font-bold text-[#15803D]">
                {GRANT_HERO.priceBreakdown.grant.amount}
              </span>
            </div>
            <div className="flex items-center justify-between pt-3">
              <span className="font-dm text-base font-semibold text-ink">
                {GRANT_HERO.priceBreakdown.net.label}
              </span>
              <span className="font-space text-3xl font-bold text-ink md:text-4xl">
                {GRANT_HERO.priceBreakdown.net.amount}
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <a
              href={GRANT_HERO.cta.href}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-dm text-base font-semibold text-white"
            >
              {GRANT_HERO.cta.label}
            </a>
          </div>
        </m.div>

        {/* Fine print */}
        <m.div variants={fadeUp} className="mt-6 space-y-1">
          {GRANT_HERO.finePrint.map((line) => (
            <p key={line} className="font-dm text-xs text-faint">
              * {line}
            </p>
          ))}
        </m.div>
      </m.div>
    </section>
  )
}
