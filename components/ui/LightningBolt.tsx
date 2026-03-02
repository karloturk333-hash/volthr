"use client"

import { useId } from "react"

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
  const dur = `${animationDuration}s`

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
        {/* Gradient band that sweeps diagonally — native SMIL, compositor-friendly */}
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1={-120}
          y1={-VH * 0.6}
          x2={0}
          y2={0}
        >
          <animate attributeName="x1" from={`${-120}`} to={`${VW + 60}`} dur={dur} repeatCount="indefinite" calcMode="linear" />
          <animate attributeName="y1" from={`${-VH * 0.6}`} to={`${VH * 1.2}`} dur={dur} repeatCount="indefinite" calcMode="linear" />
          <animate attributeName="x2" from="0" to={`${VW * 1.6}`} dur={dur} repeatCount="indefinite" calcMode="linear" />
          <animate attributeName="y2" from="0" to={`${VH * 1.8}`} dur={dur} repeatCount="indefinite" calcMode="linear" />
          <stop offset="0%" stopColor="#5AECC8" stopOpacity="0" />
          <stop offset="50%" stopColor="#A6F5DE" stopOpacity="1" />
          <stop offset="100%" stopColor="#2DD4A8" stopOpacity="0" />
        </linearGradient>
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
