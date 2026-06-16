"use client"

import { m } from "motion/react"
import Link from "next/link"
import { Check } from "lucide-react"
import { PRICING_PREVIEW } from "@/lib/content"
import { fadeUp, staggerContainer } from "@/lib/animations"

export function PricingPreview() {
  return (
    <section className="border-b border-t border-line bg-paper px-6 py-16 md:py-20 lg:py-24">
      <m.div
        className="mx-auto max-w-7xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <m.div variants={fadeUp} className="mb-4 flex items-center justify-center">
          <span className="section-label">{PRICING_PREVIEW.label}</span>
        </m.div>

        <m.h2
          variants={fadeUp}
          className="text-center font-space text-4xl font-bold leading-tight text-ink md:text-5xl"
        >
          {PRICING_PREVIEW.heading}
        </m.h2>

        <m.p
          variants={fadeUp}
          className="mt-4 text-center font-dm text-base text-muted"
        >
          {PRICING_PREVIEW.subheading}
        </m.p>

        {/* ============ PRIMARY: Grant Package ============ */}
        <m.div
          variants={fadeUp}
          className="relative mx-auto mt-14 max-w-3xl rounded-xl border-2 border-accent bg-white p-8 md:p-10"
        >
          {/* Badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-5 py-1.5 text-xs font-bold text-white">
            {PRICING_PREVIEW.grantPackage.badge}
          </div>

          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <h3 className="font-space text-xl font-bold text-ink md:text-2xl">
                {PRICING_PREVIEW.grantPackage.name}
              </h3>

              {/* Price */}
              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-dm text-xl text-faint line-through">
                  {PRICING_PREVIEW.currency}{PRICING_PREVIEW.grantPackage.originalPrice}
                </span>
                <span className="font-space text-5xl font-bold text-ink md:text-6xl">
                  {PRICING_PREVIEW.currency}{PRICING_PREVIEW.grantPackage.netPrice}
                </span>
              </div>
              <p className="mt-1 font-dm text-sm font-medium text-[#15803D]">
                {PRICING_PREVIEW.grantPackage.grantLabel}
              </p>

              {/* Features */}
              <ul className="mt-6 space-y-3">
                {PRICING_PREVIEW.grantPackage.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 font-dm text-sm">
                    <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                    <span className="text-muted">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="flex flex-col items-start gap-3 md:items-end md:pt-8">
              <a
                href={PRICING_PREVIEW.grantPackage.cta.href}
                className="whitespace-nowrap rounded-full bg-accent px-7 py-3.5 font-dm text-base font-semibold text-white"
              >
                {PRICING_PREVIEW.grantPackage.cta.label}
              </a>
            </div>
          </div>
        </m.div>

        {/* ============ SECONDARY: Monthly Tiers ============ */}
        <m.div variants={fadeUp} className="mt-20">
          <div className="mb-4 flex items-center justify-center">
            <span className="font-dm text-[11px] font-semibold uppercase tracking-widest text-accent">
              {PRICING_PREVIEW.monthly.label}
            </span>
          </div>
          <p className="mb-10 text-center font-dm text-base text-muted">
            {PRICING_PREVIEW.monthly.heading}
          </p>

          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
            {PRICING_PREVIEW.monthly.tiers.map((tier) => (
              <div
                key={tier.name}
                className={
                  "popular" in tier && tier.popular
                    ? "rounded-xl border border-accent bg-white p-5"
                    : "rounded-xl border border-line bg-white p-5"
                }
              >
                <div className="flex items-baseline justify-between">
                  <h4 className="font-space text-base font-bold text-ink">
                    {tier.name}
                  </h4>
                  <div>
                    <span className="font-space text-2xl font-bold text-ink">
                      {PRICING_PREVIEW.currency}{tier.price}
                    </span>
                    <span className="font-dm text-xs text-faint">{tier.period}</span>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 font-dm text-xs">
                      <Check size={12} className="mt-0.5 shrink-0 text-accent" />
                      <span className="text-muted">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href={PRICING_PREVIEW.cta.href}
              className="font-dm text-sm font-medium text-accent hover:underline"
            >
              {PRICING_PREVIEW.cta.label}
            </Link>
          </div>
        </m.div>

        <m.p
          variants={fadeUp}
          className="mt-8 text-center font-dm text-xs text-faint"
        >
          {PRICING_PREVIEW.note}
        </m.p>
      </m.div>
    </section>
  )
}
