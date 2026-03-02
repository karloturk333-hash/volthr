"use client"

import { useRef, useEffect, useState } from "react"
import { m, useInView } from "motion/react"
import { STATS } from "@/lib/content"
import { fadeUp, staggerContainer } from "@/lib/animations"

function Counter({
  target,
  suffix,
  prefix,
}: {
  target: number
  suffix: string
  prefix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <span ref={ref} className={counterClasses}>
      {prefix}{count}{suffix}
    </span>
  )
}

const counterClasses = "font-space text-4xl font-bold sm:text-5xl md:text-6xl text-[#0D0D0D]"

export function StatsCounters() {
  return (
    <section className="bg-[#F5F4F0] border-t border-b border-[#E8E6E0] py-24 md:py-32">
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
                  <Counter target={item.value} suffix={item.suffix} />
                )}
                <p className="mt-4 text-sm font-medium text-[#555550]">
                  {item.label}
                </p>
                {/* Vertical divider — not on last item */}
                {i < STATS.items.length - 1 && (
                  <div className="absolute right-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-[#E8E6E0] lg:block" />
                )}
              </m.div>
            )
          })}
        </div>
      </m.div>
    </section>
  )
}
