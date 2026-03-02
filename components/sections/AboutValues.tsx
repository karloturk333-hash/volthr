"use client"

import { m } from "motion/react"
import { ABOUT_PAGE } from "@/lib/content"
import { fadeUp, staggerContainer } from "@/lib/animations"

export function AboutValues() {
  return (
    <section className="bg-[#F5F4F0] px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mb-12"
        >
          <span className="section-label mb-3 block">Vrijednosti</span>
          <h2 className="font-space text-3xl font-bold text-[#0D0D0D] md:text-4xl">
            {ABOUT_PAGE.values.heading}
          </h2>
        </m.div>

        {/* Cards */}
        <m.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {ABOUT_PAGE.values.items.map((item, i) => (
            <m.div
              key={item.title}
              variants={fadeUp}
              whileHover={{ scale: 1.02 }}
              className="flex flex-col rounded-xl border border-[#E8E6E0] bg-white p-8"
            >
              <span className="font-mono text-xs text-[#999994]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-space text-lg font-bold text-[#0D0D0D]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#555550]">
                {item.description}
              </p>
            </m.div>
          ))}
        </m.div>

      </div>
    </section>
  )
}
