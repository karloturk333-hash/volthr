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
    <section className="px-6 py-20 md:py-28 lg:py-32">
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
          {SERVICES.label}
        </m.p>
        <m.h2
          variants={fadeUp}
          className="font-playfair text-3xl font-bold leading-tight md:text-4xl"
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
                whileHover={{ y: -4, borderColor: "var(--accent)" }}
                className="border p-8"
                style={{
                  background: "var(--surface-card)",
                  borderColor: "var(--border)",
                  borderRadius: "var(--r-lg)",
                }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <span
                    className="font-playfair text-3xl font-bold"
                    style={{ color: "var(--accent)" }}
                  >
                    {item.number}
                  </span>
                  <Icon size={24} style={{ color: "var(--text-3)" }} />
                </div>
                <h3
                  className="font-playfair text-xl font-bold"
                  style={{ color: "var(--text)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed"
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
