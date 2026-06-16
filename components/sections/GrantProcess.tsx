"use client"

import { m } from "motion/react"
import { GRANT_PROCESS } from "@/lib/content"
import { fadeUp, staggerContainer } from "@/lib/animations"

export function GrantProcess() {
  return (
    <section className="bg-[#F5F4F0] px-6 py-16 md:px-12 md:py-20">
      <m.div
        className="mx-auto max-w-4xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <m.div variants={fadeUp} className="mb-4">
          <span className="font-dm text-[11px] font-semibold uppercase tracking-widest text-[#8B5CF6]">
            {GRANT_PROCESS.label}
          </span>
        </m.div>

        <m.h2
          variants={fadeUp}
          className="mb-12 font-space text-3xl font-bold leading-tight text-[#0D0D0D] md:text-4xl"
        >
          {GRANT_PROCESS.heading}
        </m.h2>

        <div className="space-y-0">
          {GRANT_PROCESS.steps.map((step, i) => (
            <m.div
              key={step.num}
              variants={fadeUp}
              className="flex gap-5"
            >
              {/* Timeline column */}
              <div className="flex flex-col items-center">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#8B5CF6] font-space text-sm font-bold text-white">
                  {step.num}
                </div>
                {i < GRANT_PROCESS.steps.length - 1 && (
                  <div className="my-1 h-full w-px bg-[#E8E6E0]" />
                )}
              </div>

              {/* Content */}
              <div className="pb-10">
                <div className="font-space text-base font-bold text-[#0D0D0D]">
                  {step.title}
                </div>
                <div className="mt-1 font-dm text-sm leading-relaxed text-[#555550]">
                  {step.desc}
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </m.div>
    </section>
  )
}
