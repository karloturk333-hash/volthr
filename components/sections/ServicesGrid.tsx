"use client"

import { m } from "motion/react"
import { Phone, Palette, Code, Rocket } from "lucide-react"
import { SERVICES } from "@/lib/content"

const icons = { phone: Phone, palette: Palette, code: Code, rocket: Rocket } as const

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
}

export function ServicesGrid() {
  return (
    <section className="px-6 py-24 md:px-12 md:py-32 lg:py-36" style={{ background: "var(--surface-card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <m.div
        className="mx-auto max-w-[1100px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <m.div variants={fadeUp} className="mb-5 flex items-center gap-3">
          <span style={{ width: 28, height: 2, background: "var(--accent)", flexShrink: 0, display: "block", borderRadius: 2 }} />
          <span className="text-xs font-bold uppercase" style={{ color: "var(--accent)", letterSpacing: "0.15em" }}>{SERVICES.label}</span>
        </m.div>
        <m.h2
          variants={fadeUp}
          className="font-playfair text-4xl font-bold leading-tight md:text-5xl"
          style={{ color: "var(--text)" }}
        >
          {SERVICES.heading}
        </m.h2>
        <m.p
          variants={fadeUp}
          className="mt-4 text-base"
          style={{ color: "var(--text-2)" }}
        >
          {SERVICES.subheading}
        </m.p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {SERVICES.items.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons]
            return (
              <m.div
                key={item.number}
                variants={fadeUp}
                whileHover={{
                  y: -4,
                  borderColor: "rgba(90,236,200,0.18)",
                  boxShadow: "0 8px 32px rgba(90,236,200,0.08)",
                }}
                className="relative overflow-hidden border p-6 sm:p-8"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--border)",
                  borderRadius: "var(--r-lg)",
                }}
              >
                {/* Large faint number in background */}
                <span
                  className="pointer-events-none absolute -right-2 -top-4 font-playfair font-black select-none"
                  style={{ fontSize: 100, color: "var(--accent)", opacity: 0.05, lineHeight: 1 }}
                  aria-hidden="true"
                >
                  {item.number}
                </span>
                <div className="relative mb-6 flex items-center justify-between">
                  <span
                    className="font-playfair text-sm font-bold"
                    style={{ color: "var(--accent)", letterSpacing: "0.05em" }}
                  >
                    {item.number}
                  </span>
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: "var(--accent-soft)", border: "1px solid var(--accent-border)" }}
                  >
                    <Icon size={18} style={{ color: "var(--accent)" }} />
                  </div>
                </div>
                <h3
                  className="relative font-playfair text-xl font-bold"
                  style={{ color: "var(--text)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="relative mt-3 text-sm leading-relaxed"
                  style={{ color: "var(--text-2)" }}
                >
                  {item.description}
                </p>
              </m.div>
            )
          })}
        </div>
      </m.div>
    </section>
  )
}
