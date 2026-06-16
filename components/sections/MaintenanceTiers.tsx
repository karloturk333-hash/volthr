"use client"

import { m } from "motion/react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { MAINTENANCE_TIERS } from "@/lib/content"
import { fadeUp, staggerContainer } from "@/lib/animations"

export function MaintenanceTiers() {
  return (
    <section className="border-t border-[#E8E6E0] bg-[#F5F4F0] px-6 py-16 md:px-12 md:py-20">
      <m.div
        className="mx-auto max-w-5xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <m.div variants={fadeUp} className="mb-4 text-center">
          <span className="font-dm text-[11px] font-semibold uppercase tracking-widest text-[#8B5CF6]">
            {MAINTENANCE_TIERS.label}
          </span>
        </m.div>

        <m.h2
          variants={fadeUp}
          className="text-center font-space text-3xl font-bold text-[#0D0D0D] md:text-4xl"
        >
          {MAINTENANCE_TIERS.heading}
        </m.h2>

        <m.p
          variants={fadeUp}
          className="mt-3 text-center font-dm text-sm font-medium text-[#8B5CF6]"
        >
          {MAINTENANCE_TIERS.note}
        </m.p>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {MAINTENANCE_TIERS.tiers.map((tier) => (
            <m.div
              key={tier.name}
              variants={fadeUp}
              className={cn(
                "rounded-xl border bg-white p-6",
                "popular" in tier && tier.popular
                  ? "border-[#8B5CF6]"
                  : "border-[#E8E6E0]",
              )}
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-space text-lg font-bold text-[#0D0D0D]">{tier.name}</h3>
                <div>
                  <span className="font-space text-2xl font-bold text-[#0D0D0D]">€{tier.price}</span>
                  <span className="font-dm text-xs text-[#888880]">{tier.period}</span>
                </div>
              </div>

              <ul className="mt-5 space-y-2.5">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 font-dm text-sm">
                    <Check size={14} className="mt-0.5 shrink-0 text-[#8B5CF6]" />
                    <span className="text-[#555550]">{feature}</span>
                  </li>
                ))}
              </ul>
            </m.div>
          ))}
        </div>

        <m.p
          variants={fadeUp}
          className="mt-8 text-center font-dm text-xs text-[#888880]"
        >
          {MAINTENANCE_TIERS.guarantee}
        </m.p>
      </m.div>
    </section>
  )
}
