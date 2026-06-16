"use client"

import { m } from "motion/react"
import { ABOUT_PAGE } from "@/lib/content"
import { fadeUp, staggerContainerSlow } from "@/lib/animations"

export function AboutProcess() {
  const steps = ABOUT_PAGE.process.steps

  return (
    <section className="bg-paper px-6 py-16 md:px-12 md:py-20">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mb-16"
        >
          <span className="section-label mb-3 block">{ABOUT_PAGE.process.label}</span>
          <h2 className="font-space text-3xl font-bold text-ink md:text-4xl">
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
                <div className="absolute left-0 top-[21px] h-px w-1/2 bg-line" />
              )}
              {/* Right connecting line */}
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-[21px] h-px w-1/2 bg-line" />
              )}

              {/* Node */}
              <div className="relative z-10 mb-4 flex h-[42px] w-[42px] items-center justify-center rounded-full border-2 border-accent bg-paper">
                <div className="h-3 w-3 rounded-full bg-accent" />
              </div>

              {/* Day */}
              <span className="mb-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-accent">
                {step.day}
              </span>

              {/* Title */}
              <h3 className="font-space text-sm font-bold text-ink">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-xs leading-relaxed text-muted">
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
                <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full border-2 border-accent bg-paper">
                  <div className="h-3 w-3 rounded-full bg-accent" />
                </div>
                {i < steps.length - 1 && (
                  <div className="mt-2 w-px flex-1 bg-line" />
                )}
              </div>

              {/* Content */}
              <div className="pt-2 pb-2">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-accent">
                  {step.day}
                </span>
                <h3 className="mt-1 font-space text-base font-bold text-ink">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
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
