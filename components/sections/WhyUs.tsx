"use client"

import { m } from "motion/react"
import { WHY_US } from "@/lib/content"
import { fadeUp, staggerContainer } from "@/lib/animations"

export function WhyUs() {
  return (
    <section id="why-us" className="bg-card px-6 py-16 md:px-12 md:py-20">
      <m.div
        className="mx-auto max-w-7xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <m.div variants={fadeUp} className="mb-5">
          <span className="section-label">{WHY_US.label}</span>
        </m.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {WHY_US.items.map((item) => (
            <m.div
              key={item.title}
              variants={fadeUp}
              whileHover={{ scale: 1.02 }}
              className="rounded-xl border border-line bg-card p-8"
            >
              <div className="mb-6 text-[11px] font-bold uppercase tracking-[0.15em] text-accent" aria-hidden="true">✦</div>
              <h3 className="font-space text-xl font-bold text-ink">
                {item.title}
              </h3>
              <p className="mt-3 font-dm text-sm leading-relaxed text-muted">
                {item.body}
              </p>
            </m.div>
          ))}
        </div>
      </m.div>
    </section>
  )
}
