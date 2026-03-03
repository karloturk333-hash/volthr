"use client"

import { m, useMotionValue, useTransform, animate } from "motion/react"
import { useEffect } from "react"
import { HERO } from "@/lib/content"

const RADIUS = 18
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const SCORE = HERO.speedBadge.score

export function SpeedBadge() {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))

  useEffect(() => {
    const controls = animate(count, SCORE, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
    })
    return controls.stop
  }, [count])

  return (
    <m.div
      className="flex items-center gap-3 rounded-full border border-[#E8E6E0] bg-white px-4 py-2"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Score ring */}
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          className="-rotate-90"
          aria-hidden="true"
        >
          {/* Background track */}
          <circle
            cx="20"
            cy="20"
            r={RADIUS}
            fill="none"
            stroke="#E8E6E0"
            strokeWidth="3"
          />
          {/* Score arc */}
          <m.circle
            cx="20"
            cy="20"
            r={RADIUS}
            fill="none"
            stroke="#16A34A"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            initial={{ strokeDashoffset: CIRCUMFERENCE }}
            animate={{
              strokeDashoffset:
                CIRCUMFERENCE - (CIRCUMFERENCE * SCORE) / 100,
            }}
            transition={{
              duration: 1.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </svg>
        <m.span className="absolute font-space text-xs font-bold text-[#16A34A]">
          {rounded}
        </m.span>
      </div>

      {/* Labels */}
      <div className="flex flex-col">
        <span className="font-dm text-[11px] font-semibold uppercase tracking-wider text-[#0D0D0D]">
          {HERO.speedBadge.label}
        </span>
        <span className="font-dm text-[11px] text-[#555550]">
          {HERO.speedBadge.sublabel}
        </span>
      </div>
    </m.div>
  )
}
