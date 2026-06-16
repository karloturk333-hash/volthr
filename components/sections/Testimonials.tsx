"use client"

import { m } from "motion/react"
import { TESTIMONIALS_TABLE } from "@/lib/content"
import { testimonialRow, staggerContainerTestimonials, fadeUp } from "@/lib/animations"

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-paper px-6 py-16 md:px-12 md:py-20 lg:py-24">
      <m.div
        className="mx-auto max-w-7xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainerTestimonials}
      >
        <m.div variants={fadeUp} className="mb-5">
          <span className="section-label">{TESTIMONIALS_TABLE.label}</span>
        </m.div>
        <m.h2
          variants={fadeUp}
          className="mb-14 font-space text-3xl font-bold leading-tight text-ink md:text-4xl lg:text-5xl"
        >
          {TESTIMONIALS_TABLE.heading}
        </m.h2>

        {/* Table rows */}
        <div className="border-t border-line">
          {TESTIMONIALS_TABLE.items.map((item) => (
            <m.div
              key={item.number}
              variants={testimonialRow}
              className="grid grid-cols-[40px_1fr_1fr_60px] items-center gap-4 border-b border-line px-2 py-5 hover:bg-card md:grid-cols-[60px_1fr_1fr_80px] md:gap-6 md:px-4 md:py-6"
            >
              {/* Number */}
              <span className="font-space text-lg font-medium text-[#D0CEC8] md:text-xl">
                {item.number}
              </span>

              {/* Client name + avatar */}
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-line font-space text-xs font-bold text-muted">
                  {item.client[0]}
                </div>
                <div>
                  <p className="font-dm text-sm font-semibold text-ink">
                    {item.client}
                  </p>
                  <p className="text-xs text-faint">{item.role}</p>
                </div>
              </div>

              {/* Service tags */}
              <div className="flex flex-wrap gap-2">
                {item.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full bg-[rgba(139,92,246,0.08)] px-3 py-1 text-xs font-medium text-accent"
                  >
                    {service}
                  </span>
                ))}
              </div>

              {/* Year */}
              <span className="text-right font-dm text-sm text-faint">
                {item.year}
              </span>
            </m.div>
          ))}
        </div>
      </m.div>
    </section>
  )
}
