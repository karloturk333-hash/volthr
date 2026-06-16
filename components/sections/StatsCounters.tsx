"use client"

import { m } from "motion/react"
import { STATS } from "@/lib/content"
import { fadeUp, staggerContainer } from "@/lib/animations"
import { Counter } from "@/components/ui/Counter"

const counterClasses = "font-space text-4xl font-bold sm:text-5xl md:text-6xl text-ink"

export function StatsCounters() {
  return (
    <section className="bg-paper border-t border-b border-line py-16 md:py-20">
      <m.div
        className="max-w-7xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <m.div variants={fadeUp} className="mb-16 flex items-center justify-center">
          <span className="section-label">{STATS.label}</span>
        </m.div>

        <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:grid-cols-4">
          {STATS.items.map((item, i) => {
            const hasDisplayValue = "displayValue" in item
            return (
              <m.div key={i} variants={fadeUp} className="relative text-center">
                {hasDisplayValue ? (
                  <span className={counterClasses}>{item.displayValue}</span>
                ) : (
                  <Counter target={item.value} suffix={item.suffix} duration={2000} className={counterClasses} />
                )}
                <p className="mt-4 text-sm font-medium text-muted">
                  {item.label}
                </p>
                {/* Vertical divider — not on last item */}
                {i < STATS.items.length - 1 && (
                  <div className="absolute right-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-line lg:block" />
                )}
              </m.div>
            )
          })}
        </div>
      </m.div>
    </section>
  )
}
