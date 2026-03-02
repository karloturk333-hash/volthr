"use client"

import { useRef, useEffect, useState } from "react"
import { m, useInView, useMotionValue, useTransform, animate } from "motion/react"
import { STATS } from "@/lib/content"

function Counter({
  value,
  suffix,
  displayValue,
}: {
  value: number
  suffix: string
  displayValue?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" })
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (v) => Math.round(v))
  const [display, setDisplay] = useState(displayValue ?? "0")

  useEffect(() => {
    if (isInView && !displayValue) {
      const controls = animate(motionValue, value, {
        duration: 2,
        ease: "easeOut" as const,
      })
      const unsubscribe = rounded.on("change", (v) => setDisplay(`${v}${suffix}`))
      return () => {
        controls.stop()
        unsubscribe()
      }
    }
  }, [isInView, motionValue, rounded, value, suffix, displayValue])

  return (
    <span ref={ref} className="font-playfair text-4xl font-bold md:text-5xl" style={{ color: "var(--accent)" }}>
      {display}
    </span>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
}

export function StatsCounters() {
  return (
    <section className="px-6 py-20 md:py-28 lg:py-32" style={{ background: "var(--surface-card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <m.div
        className="mx-auto max-w-[1100px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <m.div variants={fadeUp} className="mb-14 flex items-center justify-center gap-3">
          <span style={{ width: 20, height: 1, background: "var(--accent)", display: "block", borderRadius: 2, opacity: 0.6 }} />
          <span className="text-xs font-bold uppercase" style={{ color: "var(--accent)", letterSpacing: "0.15em" }}>{STATS.label}</span>
          <span style={{ width: 20, height: 1, background: "var(--accent)", display: "block", borderRadius: 2, opacity: 0.6 }} />
        </m.div>

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.items.map((item, i) => (
            <m.div key={i} variants={fadeUp} className="text-center">
              <Counter value={item.value} suffix={item.suffix} displayValue={"displayValue" in item ? item.displayValue : undefined} />
              <p className="mt-3 text-sm font-medium" style={{ color: "var(--text-2)" }}>
                {item.label}
              </p>
            </m.div>
          ))}
        </div>
      </m.div>
    </section>
  )
}
