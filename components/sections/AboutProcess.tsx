"use client"

import { m } from "motion/react"
import { ABOUT_PAGE } from "@/lib/content"
import { fadeUp, staggerContainerSlow } from "@/lib/animations"

export function AboutProcess() {
  const steps = ABOUT_PAGE.process.steps

  return (
    <section className="bg-[#F5F4F0] px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mb-16"
        >
          <span className="section-label mb-3 block">Kako radimo</span>
          <h2 className="font-space text-3xl font-bold text-[#0D0D0D] md:text-4xl">
            {ABOUT_PAGE.process.heading}
          </h2>
        </m.div>

        {/* Desktop: horizontal timeline */}
        <m.div
          className="hidden lg:flex lg:items-start"
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {steps.map((step, i) => (
            <m.div
              key={step.day}
              variants={fadeUp}
              className="relative flex flex-1 flex-col items-center px-3 text-center"
            >
              {/* Left connecting line */}
              {i > 0 && (
                <div className="absolute left-0 top-[21px] h-px w-1/2 bg-[#E8E6E0]" />
              )}
              {/* Right connecting line */}
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-[21px] h-px w-1/2 bg-[#E8E6E0]" />
              )}

              {/* Node */}
              <div className="relative z-10 mb-4 flex h-[42px] w-[42px] items-center justify-center rounded-full border-2 border-[#8B5CF6] bg-[#F5F4F0]">
                <div className="h-3 w-3 rounded-full bg-[#8B5CF6]" />
              </div>

              {/* Day */}
              <span className="mb-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-[#8B5CF6]">
                {step.day}
              </span>

              {/* Title */}
              <h3 className="font-space text-sm font-bold text-[#0D0D0D]">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-xs leading-relaxed text-[#555550]">
                {step.description}
              </p>
            </m.div>
          ))}
        </m.div>

        {/* Mobile: vertical stack */}
        <m.div
          className="flex flex-col lg:hidden"
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {steps.map((step, i) => (
            <m.div
              key={step.day}
              variants={fadeUp}
              className="relative flex gap-5 pb-10 last:pb-0"
            >
              {/* Node + vertical line */}
              <div className="flex shrink-0 flex-col items-center">
                <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full border-2 border-[#8B5CF6] bg-[#F5F4F0]">
                  <div className="h-3 w-3 rounded-full bg-[#8B5CF6]" />
                </div>
                {i < steps.length - 1 && (
                  <div className="mt-2 w-px flex-1 bg-[#E8E6E0]" />
                )}
              </div>

              {/* Content */}
              <div className="pt-2 pb-2">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#8B5CF6]">
                  {step.day}
                </span>
                <h3 className="mt-1 font-space text-base font-bold text-[#0D0D0D]">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[#555550]">
                  {step.description}
                </p>
              </div>
            </m.div>
          ))}
        </m.div>

      </div>
    </section>
  )
}
