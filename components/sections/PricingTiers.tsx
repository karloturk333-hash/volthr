"use client"

import { m } from "motion/react"
import Link from "next/link"
import { Check, MessageCircle, Shield } from "lucide-react"
import { PRICING_PAGE, SITE } from "@/lib/content"
import { fadeUp, staggerContainer } from "@/lib/animations"

function buildWhatsAppUrl(message: string): string {
  return `${SITE.whatsapp}?text=${encodeURIComponent(message)}`
}

export function PricingTiers() {
  return (
    <section className="bg-transparent px-6 pb-24 md:pb-32">
      <m.div
        className="mx-auto max-w-7xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        {/* Card grid */}
        <div className="grid items-start gap-5 md:grid-cols-3">
          {PRICING_PAGE.tiers.map((tier) => (
            <m.div
              key={tier.name}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className={[
                "relative flex flex-col rounded-xl border bg-white p-6 sm:p-8",
                tier.popular
                  ? "border-[#8B5CF6]"
                  : "border-[#E8E6E0] md:mt-4",
              ].join(" ")}
            >
              {/* Solid top stripe for popular */}
              {tier.popular && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#8B5CF6]" />
              )}

              {/* Popular badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#8B5CF6] px-5 py-1.5 text-xs font-bold text-white">
                  {PRICING_PAGE.popularBadge}
                </div>
              )}

              <h3 className="font-space text-xl font-bold text-[#0D0D0D]">
                {tier.name}
              </h3>

              <div className="mt-4">
                <span className="font-space text-4xl font-bold text-[#0D0D0D]">
                  {PRICING_PAGE.currency}{tier.price}
                </span>
                <span className="ml-2 text-sm text-[#888880]">
                  {tier.period}
                </span>
              </div>

              <p className="mt-1 text-sm text-[#888880]">
                +{PRICING_PAGE.currency}{tier.maintenance}{PRICING_PAGE.maintenanceLabel} {PRICING_PAGE.maintenanceNote}
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

              {/* Dual CTAs */}
              <div className="mt-8 flex flex-col gap-3">
                <a
                  href={buildWhatsAppUrl(tier.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={[
                    "flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold",
                    tier.popular
                      ? "bg-[#8B5CF6] text-white"
                      : "bg-[#0D0D0D] text-white",
                  ].join(" ")}
                >
                  <MessageCircle size={16} />
                  {PRICING_PAGE.ctaPrimary}
                </a>
                <Link
                  href="/kontakt"
                  className="flex items-center justify-center rounded-full border border-[#0D0D0D] bg-transparent py-3 text-sm font-semibold text-[#0D0D0D]"
                >
                  {PRICING_PAGE.ctaSecondary}
                </Link>
              </div>
            </m.div>
          ))}
        </div>

        {/* All plans include */}
        <m.div
          variants={fadeUp}
          className="mt-12 rounded-xl border border-[#E8E6E0] bg-white p-6 sm:p-8"
        >
          <h3 className="text-center font-space text-lg font-bold text-[#0D0D0D]">
            {PRICING_PAGE.allInclude.heading}
          </h3>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {PRICING_PAGE.allInclude.items.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-[#555550]">
                <Check size={14} className="shrink-0 text-[#8B5CF6]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </m.div>

        {/* Guarantee badge */}
        <m.div
          variants={fadeUp}
          className="mt-8 flex items-start justify-center gap-3"
        >
          <Shield size={18} className="mt-0.5 shrink-0 text-[#8B5CF6]" />
          <p className="text-sm text-[#555550]">
            <span className="font-bold text-[#0D0D0D]">{PRICING_PAGE.guarantee.heading}</span>{" "}
            {PRICING_PAGE.guarantee.text}
          </p>
        </m.div>

        {/* Price note */}
        <m.p
          variants={fadeUp}
          className="mt-6 text-center text-xs text-[#888880]"
        >
          {PRICING_PAGE.note}
        </m.p>

        {/* Add-ons */}
        <m.div variants={fadeUp} className="mt-20">
          <div className="mb-10 text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#8B5CF6]">
              ✦ {PRICING_PAGE.addons.heading}
            </p>
            <p className="text-sm text-[#555550]">{PRICING_PAGE.addons.subheading}</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {PRICING_PAGE.addons.items.map((addon) => (
              <m.div
                key={addon.name}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="relative flex flex-col rounded-xl border border-[#E8E6E0] bg-white p-6 sm:p-8"
              >
                {addon.badge && (
                  <span className="absolute top-5 right-5 rounded-full bg-[#8B5CF6] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    {addon.badge}
                  </span>
                )}

                <h3 className="font-space text-lg font-bold text-[#0D0D0D]">{addon.name}</h3>

                <div className="mt-3">
                  <span className="font-space text-3xl font-bold text-[#0D0D0D]">
                    {PRICING_PAGE.currency}{addon.price}
                  </span>
                  <span className="ml-1 text-sm text-[#888880]">{addon.period}</span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[#555550]">{addon.description}</p>

                {addon.note && (
                  <p className="mt-2 text-xs text-[#888880]">{addon.note}</p>
                )}

                <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                  {addon.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check size={15} className="mt-0.5 shrink-0 text-[#8B5CF6]" />
                      <span className="text-[#555550]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={buildWhatsAppUrl(addon.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 flex items-center justify-center gap-2 rounded-full bg-[#0D0D0D] py-3 text-sm font-semibold text-white"
                >
                  <MessageCircle size={16} />
                  {PRICING_PAGE.ctaPrimary}
                </a>
              </m.div>
            ))}
          </div>
        </m.div>
      </m.div>
    </section>
  )
}
