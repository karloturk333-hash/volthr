"use client"

import { useRef, useEffect, useState } from "react"
import { m, useInView } from "motion/react"
import { ABOUT_SECTION } from "@/lib/content"
import { fadeUp, staggerContainer } from "@/lib/animations"

function Counter({ target, suffix, prefix }: { target: number; suffix: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 1500
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.round(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <span ref={ref} className="font-space text-4xl font-bold text-[#0D0D0D] sm:text-5xl">
      {prefix}{count}{suffix}
    </span>
  )
}

const stats: readonly { value: number; suffix: string; label: string; prefix?: string }[] = [
  { value: 7, suffix: "", label: "dana isporuke" },
  { value: 399, suffix: "", label: "fiksna cijena od", prefix: "€" },
  { value: 100, suffix: "%", label: "transparentnosti" },
]

export function AboutSplit() {
  return (
    <section id="about" className="bg-[#F5F4F0] px-6 py-24 md:px-12 md:py-32 lg:py-36">
      <m.div
        className="mx-auto max-w-7xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <div className="grid items-start gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
          {/* Left: Label + body text */}
          <div>
            <m.div variants={fadeUp} className="mb-6">
              <span className="section-label">{ABOUT_SECTION.label}</span>
            </m.div>

            <m.h2
              variants={fadeUp}
              className="font-space text-3xl font-bold leading-tight text-[#0D0D0D] md:text-4xl lg:text-5xl"
            >
              {ABOUT_SECTION.heading}
            </m.h2>

            <m.p
              variants={fadeUp}
              className="mt-6 text-base leading-[1.7] text-[#555550] md:text-lg"
            >
              {ABOUT_SECTION.body}
            </m.p>
          </div>

          {/* Right: Stats */}
          <m.div
            variants={fadeUp}
            className="grid grid-cols-3 gap-8 lg:pt-16"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <Counter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                <p className="mt-2 text-[13px] font-medium text-[#888880]">
                  {stat.label}
                </p>
              </div>
            ))}
          </m.div>
        </div>
      </m.div>
    </section>
  )
}
