"use client"

import { m } from "motion/react"
import { ABOUT_SECTION } from "@/lib/content"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
}

export function AboutSplit() {
  return (
    <section className="px-6 py-20 md:py-28 lg:py-32">
      <div className="mx-auto grid max-w-[1100px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left: Image placeholder */}
        <m.div
          className="relative aspect-[4/5] w-full overflow-hidden"
          style={{
            borderRadius: "var(--r-xl)",
            background: "linear-gradient(135deg, #0E0E0E, #141414)",
            border: "1px solid var(--border)",
          }}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          {/* Radial glow */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: "radial-gradient(circle at 35% 65%, rgba(90,236,200,0.15), transparent 55%)",
            }}
          />
          {/* Grid texture */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle, var(--text) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          {/* Centered icon composition */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
            {/* Bolt icon */}
            <div
              className="flex h-20 w-20 items-center justify-center rounded-2xl"
              style={{ background: "var(--accent-soft)", border: "1px solid var(--accent-border)" }}
            >
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 3L6 21H18L15 33L30 15H18L21 3Z" fill="var(--accent)" opacity="0.9" />
              </svg>
            </div>
            {/* Stats pills */}
            <div className="flex flex-col items-center gap-3">
              <div
                className="rounded-full px-5 py-2 text-sm font-semibold"
                style={{ background: "var(--accent-soft)", color: "var(--accent)", border: "1px solid var(--accent-border)" }}
              >
                7 dana isporuke
              </div>
              <div
                className="rounded-full px-5 py-2 text-sm font-medium"
                style={{ background: "rgba(255,255,255,0.04)", color: "var(--text-2)", border: "1px solid var(--border)" }}
              >
                Fiksna cijena · Bez skrivenih troškova
              </div>
            </div>
          </div>
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
