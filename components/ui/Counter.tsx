"use client"

import { useRef, useEffect, useState } from "react"
import { useInView } from "motion/react"

interface CounterProps {
  /** The number to count up to */
  target: number
  /** Suffix appended after the number (e.g. "+" or "%") */
  suffix?: string
  /** Prefix prepended before the number (e.g. "€") */
  prefix?: string
  /** Animation duration in milliseconds (default 2000) */
  duration?: number
  /** Optional className for the wrapping <span> */
  className?: string
}

export function Counter({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
  className = "",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let raf: number
    let start: number | null = null
    const step = (timestamp: number) => {
      if (start === null) start = timestamp
      const elapsed = timestamp - start
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.round(progress * target))
      if (progress < 1) {
        raf = requestAnimationFrame(step)
      }
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [isInView, target, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  )
}
