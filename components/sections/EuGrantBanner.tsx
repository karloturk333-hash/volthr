"use client"

import { m } from "motion/react"
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
        {/* Label + deadline */}
        <m.div variants={fadeUp} className="mb-5 flex flex-wrap items-center gap-3">
          <span className="section-label">{EU_GRANT.label}</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FEF2F2] px-3 py-1 text-xs font-semibold text-[#DC2626]">
            📅 {EU_GRANT.deadline}
          </span>
        </m.div>

        {/* Heading */}
        <m.h2
          variants={fadeUp}
          className="max-w-3xl font-space text-4xl font-bold leading-tight text-[#0D0D0D] md:text-5xl"
        >
          {EU_GRANT.heading}
        </m.h2>

        {/* Fund pool note */}
        <m.p variants={fadeUp} className="mt-3 text-sm font-medium text-[#555550]">
          {EU_GRANT.pool}
        </m.p>

        {/* Cost breakdown */}
        <m.div
          variants={fadeUp}
          className="mt-12 grid gap-4 sm:grid-cols-3"
        >
          {EU_GRANT.breakdown.map((item) => (
            <div
              key={item.label}
              className={
                item.highlight
                  ? "rounded-xl border-2 border-[#1A6B2A] bg-[#F0FDF4] p-6 text-center"
                  : "rounded-xl border border-[#E8E6E0] bg-white p-6 text-center"
              }
            >
              <div
                className={
                  item.highlight
                    ? "font-space text-4xl font-bold text-[#15803D]"
                    : "font-space text-4xl font-bold text-[#0D0D0D]"
                }
              >
                {item.amount}
              </div>
              <div className="mt-2 text-sm text-[#555550]">{item.label}</div>
              {item.highlight && (
                <div className="mt-2 text-xs font-semibold text-[#15803D]">
                  ✓ Vi plaćate samo ovo
                </div>
              )}
            </div>
          ))}
        </m.div>

        {/* How it works */}
        <m.div variants={fadeUp} className="mt-14">
          <h3 className="mb-8 font-space text-xl font-bold text-[#0D0D0D]">
            Kako funkcionira?
          </h3>
          <div className="grid gap-6 sm:grid-cols-3">
            {EU_GRANT.steps.map((step, i) => (
              <div key={step.num} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#8B5CF6] font-space text-sm font-bold text-white">
                    {step.num}
                  </div>
                  {i < EU_GRANT.steps.length - 1 && (
                    <div className="mt-2 hidden h-full w-px bg-[#E8E6E0] sm:block" />
                  )}
                </div>
                <div className="pb-2">
                  <div className="font-space font-bold text-[#0D0D0D]">{step.title}</div>
                  <div className="mt-1 text-sm leading-relaxed text-[#555550]">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </m.div>

        {/* Eligibility */}
        <m.div
          variants={fadeUp}
          className="mt-10 rounded-xl border border-[#E8E6E0] bg-white px-6 py-5"
        >
          <span className="mr-2 text-sm font-semibold text-[#0D0D0D]">Tko može prijaviti?</span>
          <span className="text-sm text-[#555550]">{EU_GRANT.eligibility}</span>
        </m.div>

        {/* CTA */}
        <m.div variants={fadeUp} className="mt-8">
          <a
            href={EU_GRANT.cta.href}
            className="inline-block rounded-full bg-[#8B5CF6] px-8 py-3.5 text-base font-semibold text-white"
          >
            {EU_GRANT.cta.label}
          </a>
        </m.div>

        {/* Disclaimer */}
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
