"use client"

import { m } from "motion/react"
import Link from "next/link"
import { Check } from "lucide-react"
import { PRICING_PREVIEW } from "@/lib/content"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
}

export function PricingPreview() {
  return (
    <section className="px-6 py-24 md:px-12 md:py-32 lg:py-36" style={{ background: "var(--surface-card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <m.div
        className="mx-auto max-w-[1100px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <m.div variants={fadeUp} className="mb-4 flex items-center justify-center gap-3">
          <span style={{ width: 20, height: 1, background: "var(--accent)", display: "block", borderRadius: 2, opacity: 0.6 }} />
          <span className="text-xs font-bold uppercase" style={{ color: "var(--accent)", letterSpacing: "0.15em" }}>{PRICING_PREVIEW.label}</span>
          <span style={{ width: 20, height: 1, background: "var(--accent)", display: "block", borderRadius: 2, opacity: 0.6 }} />
        </m.div>
        <m.h2
          variants={fadeUp}
          className="text-center font-playfair text-4xl font-bold leading-tight md:text-5xl"
          style={{ color: "var(--text)" }}
        >
          {PRICING_PREVIEW.heading}
        </m.h2>
        <m.p
          variants={fadeUp}
          className="mt-4 text-center text-base"
          style={{ color: "var(--text-2)" }}
        >
          {PRICING_PREVIEW.subheading}
        </m.p>

        <div className="mt-14 grid items-start gap-6 md:grid-cols-3">
          {PRICING_PREVIEW.tiers.map((tier) => (
            <m.div
              key={tier.name}
              variants={fadeUp}
              whileHover={{
                y: -4,
                boxShadow: tier.popular
                  ? "0 8px 40px rgba(90,236,200,0.12)"
                  : "0 8px 32px rgba(0,0,0,0.3)",
              }}
              className="relative flex flex-col border p-8"
              style={{
                background: "var(--surface)",
                borderColor: tier.popular ? "var(--accent-border)" : "var(--border)",
                borderRadius: "var(--r-lg)",
                overflow: "visible",
                marginTop: tier.popular ? 0 : "16px",
              }}
            >
              {tier.popular && (
                <div
                  className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full px-5 py-1.5 text-xs font-bold"
                  style={{
                    background: "linear-gradient(135deg, var(--accent), var(--accent-end))",
                    color: "var(--text-on-accent)",
                    boxShadow: "0 4px 16px rgba(90,236,200,0.2)",
                  }}
                >
                  {PRICING_PREVIEW.popularBadge}
                </div>
              )}

              <h3
                className="font-playfair text-xl font-bold"
                style={{ color: "var(--text)" }}
              >
                {tier.name}
              </h3>

              <div className="mt-4">
                <span
                  className="font-playfair text-4xl font-bold"
                  style={{ color: "var(--text)" }}
                >
                  {PRICING_PREVIEW.currency}{tier.price}
                </span>
                <span className="ml-2 text-sm" style={{ color: "var(--text-3)" }}>
                  {tier.period}
                </span>
              </div>

              <p className="mt-1 text-sm" style={{ color: "var(--text-3)" }}>
                +{PRICING_PREVIEW.currency}{tier.maintenance}{PRICING_PREVIEW.maintenanceLabel}
              </p>

              <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
                {tier.description}
              </p>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0"
                      style={{ color: "var(--accent)" }}
                    />
                    <span style={{ color: "var(--text-2)" }}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/cijene"
                className="mt-8 block rounded-full py-3 text-center text-sm font-semibold"
                style={{
                  background: tier.popular
                    ? "linear-gradient(135deg, var(--accent), var(--accent-end))"
                    : "transparent",
                  color: tier.popular ? "var(--text-on-accent)" : "var(--text)",
                  border: tier.popular ? "none" : "1px solid var(--border)",
                }}
              >
                {PRICING_PREVIEW.cta.label}
              </Link>
            </m.div>
          ))}
        </div>

        <m.p
          variants={fadeUp}
          className="mt-8 text-center text-xs"
          style={{ color: "var(--text-3)" }}
        >
          {PRICING_PREVIEW.note}
        </m.p>
      </m.div>
    </section>
  )
}
