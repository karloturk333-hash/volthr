"use client"

import { useRef, useEffect, useState } from "react"
import { m, useInView } from "motion/react"
import { STATS } from "@/lib/content"

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
    <span
      ref={ref}
      className="font-playfair text-4xl font-bold sm:text-5xl md:text-6xl"
      style={{ color: "var(--accent)" }}
    >
      {prefix}{count}{suffix}
    </span>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
}

export function StatsCounters() {
  return (
    <section
      className="px-6 py-24 md:px-12 md:py-32"
      style={{
        background: "var(--surface-card)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <m.div
        className="mx-auto max-w-[1100px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <m.div variants={fadeUp} className="mb-16 flex items-center justify-center gap-3">
          <span style={{ width: 20, height: 1, background: "var(--accent)", display: "block", borderRadius: 2, opacity: 0.6 }} />
          <span className="text-xs font-bold uppercase" style={{ color: "var(--accent)", letterSpacing: "0.15em" }}>{STATS.label}</span>
          <span style={{ width: 20, height: 1, background: "var(--accent)", display: "block", borderRadius: 2, opacity: 0.6 }} />
        </m.div>

        <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:grid-cols-4">
          {STATS.items.map((item, i) => {
            const hasDisplayValue = "displayValue" in item
            return (
              <m.div key={i} variants={fadeUp} className="text-center">
                {hasDisplayValue ? (
                  <span
                    className="font-playfair text-4xl font-bold sm:text-5xl md:text-6xl"
                    style={{ color: "var(--accent)" }}
                  >
                    {item.displayValue}
                  </span>
                ) : (
                  <Counter target={item.value} suffix={item.suffix} />
                )}
                <p className="mt-4 text-sm font-medium" style={{ color: "var(--text-2)" }}>
                  {item.label}
                </p>
              </m.div>
            )
          })}
        </div>
      </m.div>
    </section>
  )
}
