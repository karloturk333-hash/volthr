"use client"

import { m } from "motion/react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PORTFOLIO } from "@/lib/content"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
}

export function PortfolioGrid() {
  return (
    <section className="px-6 py-24">
      <m.div
        className="mx-auto max-w-[1100px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <m.p
          variants={fadeUp}
          className="mb-3 text-sm font-semibold uppercase tracking-wider"
          style={{ color: "var(--accent)" }}
        >
          {PORTFOLIO.label}
        </m.p>
        <m.h2
          variants={fadeUp}
          className="font-playfair text-3xl font-bold leading-tight md:text-4xl"
          style={{ color: "var(--text)" }}
        >
          {PORTFOLIO.heading}
        </m.h2>
        <m.p
          variants={fadeUp}
          className="mt-4 text-base"
          style={{ color: "var(--text-2)" }}
        >
          {PORTFOLIO.subheading}
        </m.p>

        {/* Placeholder grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <m.div
              key={i}
              variants={fadeUp}
              className="group relative aspect-[16/10] overflow-hidden border"
              style={{
                background: "var(--surface-card)",
                borderColor: "var(--border)",
                borderRadius: "var(--r-lg)",
              }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                style={{
                  background: "rgba(5, 5, 5, 0.8)",
                  transition: "opacity 0.3s ease",
                }}
              >
                <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--accent)" }}>
                  Uskoro <ArrowUpRight size={16} />
                </span>
              </div>
            </m.div>
          ))}
        </div>

        {/* Empty state message */}
        <m.p
          variants={fadeUp}
          className="mt-8 text-center text-sm"
          style={{ color: "var(--text-3)" }}
        >
          {PORTFOLIO.emptyState}
        </m.p>

        <m.div variants={fadeUp} className="mt-8 text-center">
          <Link
            href={PORTFOLIO.cta.href}
            className="inline-block rounded-full border px-6 py-3 text-sm font-medium"
            style={{
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            {PORTFOLIO.cta.label}
          </Link>
        </m.div>
      </m.div>
    </section>
  )
}
