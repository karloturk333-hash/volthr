"use client"

import { useId } from "react"
import { m } from "motion/react"

// ViewBox dimensions
const VW = 200
const VH = 300

// Open stroke path — the Z-shape the gradient traces along
const STROKE_PATH = "M150,20 L85,155 L125,155 L65,285"

// Closed fill path — solid mass behind the trace (7 points)
const FILL_PATH = "M150,20 L85,155 L125,155 L65,285 L95,165 L75,165 Z"

interface LightningBoltProps {
  width?: number
  height?: number
  strokeWidth?: number
  animationDuration?: number
  className?: string
  style?: React.CSSProperties
}

export function LightningBolt({
  width = 200,
  height = 300,
  strokeWidth = 4,
  animationDuration = 2.5,
  className,
  style,
}: LightningBoltProps) {
  const gradientId = useId()

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${VW} ${VH}`}
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <defs>
        {/* Gradient band that sweeps diagonally across the bolt */}
        <m.linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          animate={{
            x1: [-120, VW + 60],
            y1: [-VH * 0.6, VH * 1.2],
            x2: [0, VW * 1.6],
            y2: [0, VH * 1.8],
          } as any}
          transition={{
            duration: animationDuration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <stop offset="0%" stopColor="#5AECC8" stopOpacity="0" />
          <stop offset="50%" stopColor="#A6F5DE" stopOpacity="1" />
          <stop offset="100%" stopColor="#2DD4A8" stopOpacity="0" />
        </m.linearGradient>
      </defs>

      {/* Layer 1 — Filled bolt mass (editorial depth like DigiCore's rock) */}
      <path
        d={FILL_PATH}
        fill="#060606"
        opacity={0.09}
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Layer 2 — Base outline (subtle, always visible) */}
      <path
        d={STROKE_PATH}
        stroke="#060606"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity={0.14}
      />

      {/* Layer 3 — Animated mint gradient trace */}
      <path
        d={STROKE_PATH}
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth + 0.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}
