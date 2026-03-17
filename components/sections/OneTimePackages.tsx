"use client"

import { m } from "motion/react"
import { Check, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { ONE_TIME_PACKAGES, SITE } from "@/lib/content"
import { fadeUp, staggerContainer } from "@/lib/animations"

function buildWhatsAppUrl(message: string): string {
  return `${SITE.whatsapp}?text=${encodeURIComponent(message)}`
}

interface OneTimePackagesProps {
  showGrantNote?: boolean
}

export function OneTimePackages({ showGrantNote = false }: OneTimePackagesProps) {
  return (
    <section className="bg-[#F5F4F0] px-6 py-24 md:px-12 md:py-32">
      <m.div
        className="mx-auto max-w-7xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <m.div variants={fadeUp} className="mb-4 text-center">
          <span className="font-dm text-[11px] font-semibold uppercase tracking-widest text-[#8B5CF6]">
            {ONE_TIME_PACKAGES.label}
          </span>
        </m.div>

        <m.h2
          variants={fadeUp}
          className="text-center font-space text-3xl font-bold text-[#0D0D0D] md:text-4xl"
        >
          {ONE_TIME_PACKAGES.heading}
        </m.h2>

        {showGrantNote && (
          <m.p variants={fadeUp} className="mt-3 text-center font-dm text-sm text-[#555550]">
            {ONE_TIME_PACKAGES.grantNote}
          </m.p>
        )}

        <div className="mt-14 grid items-start gap-5 md:grid-cols-3">
          {ONE_TIME_PACKAGES.packages.map((pkg) => (
            <m.div
              key={pkg.name}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className={cn(
                "relative flex flex-col rounded-xl border bg-white p-6 sm:p-8",
                pkg.popular ? "border-[#8B5CF6]" : "border-[#E8E6E0]",
              )}
            >
              {/* Badge */}
              <div
                className={cn(
                  "absolute -top-4 right-6 rounded-full px-4 py-1.5 text-xs font-bold text-white",
                  pkg.popular ? "bg-[#8B5CF6]" : "bg-[#0D0D0D]",
                )}
              >
                {pkg.badge}
              </div>

              <h3 className="font-space text-xl font-bold text-[#0D0D0D]">{pkg.name}</h3>

              <div className="mt-4">
                <span className="font-space text-4xl font-bold text-[#0D0D0D]">€{pkg.price}</span>
              </div>

              <div className="mt-2 flex items-center gap-1.5 font-dm text-xs text-[#888880]">
                <Clock size={12} />
                {pkg.delivery}
              </div>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 font-dm text-sm">
                    <Check size={16} className="mt-0.5 shrink-0 text-[#8B5CF6]" />
                    <span className="text-[#555550]">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={buildWhatsAppUrl(pkg.whatsappMessage)}
                className={cn(
                  "mt-8 block rounded-full py-3 text-center font-dm text-sm font-semibold",
                  pkg.popular
                    ? "bg-[#8B5CF6] text-white"
                    : "border border-[#0D0D0D] bg-transparent text-[#0D0D0D]",
                )}
              >
                Naruči →
              </a>
            </m.div>
          ))}
        </div>
      </m.div>
    </section>
  )
}
