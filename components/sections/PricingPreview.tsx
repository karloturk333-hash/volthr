"use client"

import { m } from "motion/react"
import Link from "next/link"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { PRICING_PREVIEW, WEBSITE_OFFER } from "@/lib/content"
import { fadeUp, staggerContainer } from "@/lib/animations"

export function PricingPreview() {
  return (
    <section className="border-b border-t border-[#E8E6E0] bg-[#F5F4F0] px-6 py-24 md:py-32 lg:py-36">
      <m.div
        className="max-w-7xl mx-auto"
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
          className="text-center font-space text-4xl font-bold leading-tight text-[#0D0D0D] md:text-5xl"
        >
          {PRICING_PREVIEW.heading}
        </m.h2>

        <m.p
          variants={fadeUp}
          className="mt-4 text-center text-base text-[#555550]"
        >
          {PRICING_PREVIEW.subheading}
        </m.p>

        <div className="mt-14 grid items-start gap-5 md:grid-cols-3">
          {PRICING_PREVIEW.tiers.map((tier) => (
            <m.div
              key={tier.name}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className={cn(
                "relative flex flex-col rounded-xl border bg-white p-6 sm:p-8",
                tier.popular ? "border-[#8B5CF6]" : "border-[#E8E6E0] md:mt-4",
              )}
            >
              {/* Solid top stripe for popular */}
              {tier.popular && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#8B5CF6]" />
              )}

              {/* Popular badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#8B5CF6] px-5 py-1.5 text-xs font-bold text-white">
                  {PRICING_PREVIEW.popularBadge}
                </div>
              )}

              <h3 className="font-space text-xl font-bold text-[#0D0D0D]">
                {tier.name}
              </h3>

              <div className="mt-4">
                <span className="font-space text-4xl font-bold text-[#0D0D0D]">
                  {PRICING_PREVIEW.currency}{tier.price}
                </span>
                <span className="ml-2 text-sm text-[#888880]">
                  {tier.period}
                </span>
              </div>

              <p className="mt-1 text-sm text-[#888880]">
                +{PRICING_PREVIEW.currency}{tier.maintenance}{PRICING_PREVIEW.maintenanceLabel}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-[#555550]">
                {tier.description}
              </p>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0 text-[#8B5CF6]"
                    />
                    <span className="text-[#555550]">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/cijene"
                className={cn(
                  "mt-8 block rounded-full py-3 text-center text-sm font-semibold",
                  tier.popular
                    ? "bg-[#8B5CF6] text-white"
                    : "border border-[#0D0D0D] bg-transparent text-[#0D0D0D]",
                )}
              >
                {PRICING_PREVIEW.cta.label}
              </Link>
            </m.div>
          ))}
        </div>

        <m.p
          variants={fadeUp}
          className="mt-8 text-center text-xs text-[#888880]"
        >
          {PRICING_PREVIEW.note}
        </m.p>

        {/* Website + EU grant one-time offer */}
        <m.div
          variants={fadeUp}
          className="relative mx-auto mt-16 max-w-2xl rounded-xl border-2 border-[#8B5CF6] bg-white p-8"
        >
          {/* Purple badge top-right */}
          <div className="absolute -top-4 right-6 rounded-full bg-[#8B5CF6] px-4 py-1.5 text-xs font-bold text-white">
            {WEBSITE_OFFER.badge}
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <h3 className="font-space text-xl font-bold text-[#0D0D0D]">
                {WEBSITE_OFFER.name}
              </h3>

              {/* Price display */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-lg text-[#888880] line-through">
                  €{WEBSITE_OFFER.originalPrice}
                </span>
                <span className="font-space text-5xl font-bold text-[#0D0D0D]">
                  €{WEBSITE_OFFER.netPrice}
                </span>
                <span className="text-sm text-[#888880]">{WEBSITE_OFFER.period}</span>
              </div>
              <p className="mt-1 text-sm font-medium text-[#15803D]">
                {WEBSITE_OFFER.grantLabel}
              </p>

              {/* Features */}
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {WEBSITE_OFFER.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check size={14} className="mt-0.5 shrink-0 text-[#8B5CF6]" />
                    <span className="text-[#555550]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA column */}
            <div className="flex flex-col items-start gap-3 sm:items-end">
              <a
                href={WEBSITE_OFFER.cta.href}
                className="whitespace-nowrap rounded-full bg-[#8B5CF6] px-7 py-3.5 text-base font-semibold text-white"
              >
                {WEBSITE_OFFER.cta.label}
              </a>
            </div>
          </div>

          <p className="mt-6 border-t border-[#E8E6E0] pt-4 text-xs text-[#888880]">
            {WEBSITE_OFFER.note}
          </p>
        </m.div>
      </m.div>
    </section>
  )
}
