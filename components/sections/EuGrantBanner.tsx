"use client"

import { m } from "motion/react"
import Link from "next/link"
import { EU_GRANT } from "@/lib/content"
import { fadeUp, staggerContainer } from "@/lib/animations"

export function EuGrantBanner() {
  return (
    <section className="bg-[#F5F4F0] px-6 py-24 md:px-12 md:py-32">
      <m.div
        className="mx-auto max-w-7xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <m.div variants={fadeUp} className="mb-5">
          <span className="section-label">{EU_GRANT.label}</span>
        </m.div>
        <m.h2
          variants={fadeUp}
          className="font-space text-4xl font-bold leading-tight text-[#0D0D0D] md:text-5xl"
        >
          {EU_GRANT.heading}
        </m.h2>
        <m.p
          variants={fadeUp}
          className="mt-4 max-w-2xl text-base leading-relaxed text-[#555550]"
        >
          {EU_GRANT.body}
        </m.p>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {EU_GRANT.highlights.map((item) => (
            <m.div
              key={item.title}
              variants={fadeUp}
              className="rounded-xl border border-[#E8E6E0] bg-white p-6"
            >
              <div className="mb-4 inline-block rounded-full bg-[#8B5CF6] px-3 py-1 text-xs font-bold text-white">
                {item.intensity}
              </div>
              <h3 className="font-space text-lg font-bold text-[#0D0D0D]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#555550]">
                {item.description}
              </p>
            </m.div>
          ))}
        </div>

        <m.div variants={fadeUp} className="mt-10">
          <Link
            href={EU_GRANT.cta.href}
            className="inline-block rounded-full bg-[#8B5CF6] px-8 py-3.5 text-base font-semibold text-white"
          >
            {EU_GRANT.cta.label}
          </Link>
        </m.div>

        <m.p
          variants={fadeUp}
          className="mt-8 text-xs leading-relaxed text-[#888880]"
        >
          {EU_GRANT.disclaimer}
        </m.p>
      </m.div>
    </section>
  )
}
