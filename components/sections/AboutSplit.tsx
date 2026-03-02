"use client"

import { m } from "motion/react"
import { ABOUT_SECTION } from "@/lib/content"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
}

export function AboutSplit() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto grid max-w-[1100px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left: Image placeholder */}
        <m.div
          className="relative aspect-[4/5] w-full overflow-hidden"
          style={{
            borderRadius: "var(--r-xl)",
            background: "linear-gradient(135deg, var(--surface-card), var(--surface))",
          }}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: "radial-gradient(circle at 30% 70%, var(--accent-glow), transparent 60%)",
            }}
          />
        </m.div>

        {/* Right: Text content */}
        <m.div
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
            {ABOUT_SECTION.label}
          </m.p>

          <m.h2
            variants={fadeUp}
            className="font-playfair text-3xl font-bold leading-tight md:text-4xl"
            style={{ color: "var(--text)" }}
          >
            {ABOUT_SECTION.heading}
          </m.h2>

          <m.p
            variants={fadeUp}
            className="mt-5 text-base leading-relaxed"
            style={{ color: "var(--text-2)" }}
          >
            {ABOUT_SECTION.body}
          </m.p>

          {/* Vision & Mission cards */}
          <div className="mt-10 flex flex-col gap-4">
            {[ABOUT_SECTION.vision, ABOUT_SECTION.mission].map((card) => (
              <m.div
                key={card.label}
                variants={fadeUp}
                className="border p-6"
                style={{
                  borderColor: "var(--border)",
                  borderRadius: "var(--r-md)",
                  background: "var(--surface-card)",
                }}
              >
                <p
                  className="mb-2 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--accent)" }}
                >
                  {card.label}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
                  {card.text}
                </p>
              </m.div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  )
}
