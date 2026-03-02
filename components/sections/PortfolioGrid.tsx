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
    <section className="px-6 py-24 md:px-12 md:py-32 lg:py-36">
      <m.div
        className="mx-auto max-w-[1100px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <m.div variants={fadeUp} className="mb-5 flex items-center gap-3">
          <span style={{ width: 28, height: 2, background: "var(--accent)", flexShrink: 0, display: "block", borderRadius: 2 }} />
          <span className="text-xs font-bold uppercase" style={{ color: "var(--accent)", letterSpacing: "0.15em" }}>{PORTFOLIO.label}</span>
        </m.div>
        <m.h2
          variants={fadeUp}
          className="font-playfair text-4xl font-bold leading-tight md:text-5xl"
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
              whileHover={{
                borderColor: "rgba(90,236,200,0.18)",
                y: -4,
              }}
              className="group relative aspect-[16/10] overflow-hidden sm:aspect-[4/3]"
              style={{
                background: "linear-gradient(145deg, #0E0E0E, #161616)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r-lg)",
              }}
            >
              {/* Subtle internal gradient */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(circle at 50% 50%, rgba(90,236,200,0.05), transparent 70%)",
                  transition: "opacity 0.4s ease",
                }}
              />
              {/* Always-visible label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ background: "var(--accent-soft)", border: "1px solid var(--accent-border)" }}
                >
                  <ArrowUpRight size={16} style={{ color: "var(--accent)" }} />
                </div>
                <span className="text-sm font-medium" style={{ color: "var(--text-3)" }}>
                  {PORTFOLIO.comingSoon}
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
              transition: "border-color 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(90,236,200,0.3)"
              e.currentTarget.style.boxShadow = "0 0 20px rgba(90,236,200,0.08)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            {PORTFOLIO.cta.label}
          </Link>
        </m.div>
      </m.div>
    </section>
  )
}
