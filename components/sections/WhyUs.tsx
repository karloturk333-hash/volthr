"use client"

import { m } from "motion/react"
import { WHY_US } from "@/lib/content"
import { fadeUp, staggerContainer } from "@/lib/animations"

export function WhyUs() {
  return (
    <section id="why-us" className="bg-white px-6 py-24 md:px-12 md:py-32">
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
              className="rounded-xl border border-[#E8E6E0] bg-white p-8"
            >
              <span className="section-label mb-6 block text-[#8B5CF6]" aria-hidden="true" />
              <h3 className="font-space text-xl font-bold text-[#0D0D0D]">
                {item.title}
              </h3>
              <p className="mt-3 font-dm text-sm leading-relaxed text-[#555550]">
                {item.body}
              </p>
            </m.div>
          ))}
        </div>
      </m.div>
    </section>
  )
}
