// Fonts: Space Grotesk (font-space) and DM Sans (font-dm)
// In Next.js: loaded via next/font/google in layout.tsx
// Standalone: <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=DM+Sans:wght@400;600&display=swap" rel="stylesheet">

"use client"

import { useRef } from "react"
import { m, useInView, useReducedMotion } from "motion/react"

export default function BrowserMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.25 })
  const prefersReducedMotion = useReducedMotion()

  return (
    <div ref={ref} className="overflow-hidden rounded-2xl shadow-2xl">
      {/* CSS keyframes for ambient animations — compositor-friendly */}
      <style>{`
        @keyframes orb-pulse-tl {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.15); opacity: 0.55; }
        }
        @keyframes orb-pulse-br {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.45; }
        }
        @keyframes v-glow-pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        @keyframes circuit-dot-blink {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.4; }
        }
      `}</style>

      {/* Browser chrome bar */}
      <div className="flex items-center gap-2 bg-[#1e1e2e] px-4 py-3">
        <div className="flex gap-2">
          <m.div
            className="h-3 w-3 cursor-pointer rounded-full bg-[#FF5F57]"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.3, boxShadow: "0 0 12px 3px rgba(255, 95, 87, 0.65)" }}
            whileTap={{ scale: 0.85 }}
          />
          <m.div
            className="h-3 w-3 cursor-pointer rounded-full bg-[#FFBD2E]"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.3, boxShadow: "0 0 12px 3px rgba(255, 189, 46, 0.65)" }}
            whileTap={{ scale: 0.85 }}
          />
          <m.div
            className="h-3 w-3 cursor-pointer rounded-full bg-[#28C840]"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.3, boxShadow: "0 0 12px 3px rgba(40, 200, 64, 0.65)" }}
            whileTap={{ scale: 0.85 }}
          />
        </div>
        <m.div
          className="ml-4 flex-1 rounded-md bg-white/8 px-4 py-1.5 text-center text-xs text-white/40 font-dm"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          volt.hr
        </m.div>
      </div>

      {/* Content area */}
      <div
        className="relative flex aspect-[4/3] w-full flex-col items-center justify-center overflow-hidden"
        style={{
          background: [
            "radial-gradient(ellipse at 55% 30%, rgba(167,139,250,0.35) 0%, transparent 40%)",
            "radial-gradient(ellipse at 20% 70%, rgba(109,40,217,0.30) 0%, transparent 45%)",
            "radial-gradient(ellipse at 85% 20%, rgba(76,29,149,0.20) 0%, transparent 35%)",
            "linear-gradient(170deg, #1e1040 0%, #160d35 30%, #0f0820 65%, #060410 100%)",
          ].join(", "),
        }}
      >
        {/* Ambient orb glow — top left (CSS animation) */}
        <div
          className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full"
          style={{
            background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
            animation: prefersReducedMotion ? "none" : "orb-pulse-tl 4s ease-in-out infinite",
            opacity: 0.4,
          }}
        />

        {/* Ambient orb glow — bottom right (CSS animation) */}
        <div
          className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full"
          style={{
            background: "radial-gradient(circle, #6D28D9 0%, transparent 70%)",
            animation: prefersReducedMotion ? "none" : "orb-pulse-br 5s ease-in-out 1.5s infinite",
            opacity: 0.3,
          }}
        />

        {/* Grid lines — finer tech texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* ── Lightning: shared defs (hidden SVG) ── */}
        <svg className="pointer-events-none absolute hidden" aria-hidden="true">
          <defs>
            <linearGradient id="boltGrad" x1="215" y1="5" x2="158" y2="208" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C4B5FD" />
              <stop offset="55%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#6D28D9" stopOpacity="0.4" />
            </linearGradient>
            <filter id="boltGlow" x="-60%" y="-20%" width="220%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>

        {/* Ghost bolt — always-visible ambient layer for texture */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.13]"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <path
            d="M215,5 L182,108 L206,108 L158,208"
            stroke="#A78BFA"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path d="M196,65 L242,118" stroke="#8B5CF6" strokeWidth="1" strokeLinecap="round" opacity="0.65" fill="none" />
          <path d="M176,150 L144,192" stroke="#8B5CF6" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" fill="none" />
        </svg>

        {/* ── Lightning strike — periodic bright flash (kept as Motion for complex keyframes) ── */}
        <m.svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={isInView && !prefersReducedMotion ? { opacity: [0, 0, 0, 0, 1, 0.4, 1, 0] } : { opacity: 0 }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatDelay: 4.0,
            times: [0, 0.45, 0.68, 0.74, 0.80, 0.87, 0.93, 1],
            ease: "easeOut",
          }}
        >
          {/* Wide glow halo */}
          <path
            d="M215,5 L182,108 L206,108 L158,208"
            stroke="#8B5CF6"
            strokeWidth="22"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.2"
            fill="none"
            filter="url(#boltGlow)"
          />
          {/* Core bolt */}
          <path
            d="M215,5 L182,108 L206,108 L158,208"
            stroke="url(#boltGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#boltGlow)"
          />
          {/* Branch 1 */}
          <path d="M196,65 L242,118" stroke="#A78BFA" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" fill="none" />
          {/* Branch 2 */}
          <path d="M176,150 L144,192" stroke="#8B5CF6" strokeWidth="1.1" strokeLinecap="round" opacity="0.65" fill="none" />
          {/* Sub-branch */}
          <path d="M222,96 L252,114" stroke="#C4B5FD" strokeWidth="0.9" strokeLinecap="round" opacity="0.5" fill="none" />
          {/* Impact glow */}
          <circle cx="158" cy="208" r="6" fill="#A78BFA" opacity="0.7" />
          <circle cx="158" cy="208" r="20" fill="#8B5CF6" opacity="0.12" filter="url(#boltGlow)" />
        </m.svg>

        {/* Screen flash on strike (kept as Motion — tied to lightning timing) */}
        <m.div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 55% 35%, rgba(167,139,250,0.3) 0%, transparent 55%)",
          }}
          initial={{ opacity: 0 }}
          animate={isInView && !prefersReducedMotion ? { opacity: [0, 0, 0, 0, 1, 0] } : { opacity: 0 }}
          transition={{
            duration: 0.4,
            repeat: Infinity,
            repeatDelay: 4.7,
            times: [0, 0.5, 0.72, 0.76, 0.82, 1],
            ease: "easeOut",
          }}
        />

        {/* V monogram — large glow layer (CSS animation) */}
        <div
          className="absolute"
          style={{
            animation: prefersReducedMotion ? "none" : "v-glow-pulse 3s ease-in-out infinite",
            opacity: 0.2,
          }}
        >
          <svg
            viewBox="0 0 200 200"
            fill="none"
            className="h-48 w-48 blur-2xl md:h-56 md:w-56"
            aria-hidden="true"
          >
            <path
              d="M55 40L100 160L145 40"
              stroke="#8B5CF6"
              strokeWidth="20"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* V monogram — main SVG */}
        <m.svg
          viewBox="0 0 200 200"
          fill="none"
          className="relative h-32 w-32 md:h-40 md:w-40"
          aria-label="Volt V monogram"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Outer geometric frame — pentagon */}
          <m.path
            d="M100 15L25 65L50 170H150L175 65L100 15Z"
            stroke="url(#frameGrad)"
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
          />

          {/* Inner V letterform — bold */}
          <m.path
            d="M55 40L100 155L145 40"
            stroke="url(#vGrad)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          />

          {/* Accent nodes — connection points */}
          <m.circle
            cx="55" cy="40" r="5"
            fill="#8B5CF6"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 0.8, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ delay: 1.4, duration: 0.3 }}
          />
          <m.circle
            cx="145" cy="40" r="5"
            fill="#8B5CF6"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 0.8, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ delay: 1.5, duration: 0.3 }}
          />
          <m.circle
            cx="100" cy="155" r="6"
            fill="#A78BFA"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ delay: 1.6, duration: 0.3 }}
          />

          {/* Circuit-style detail lines */}
          <m.line
            x1="55" y1="40" x2="25" y2="65"
            stroke="#8B5CF6"
            strokeWidth="1"
            opacity="0.3"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ delay: 1.8, duration: 0.5 }}
          />
          <m.line
            x1="145" y1="40" x2="175" y2="65"
            stroke="#8B5CF6"
            strokeWidth="1"
            opacity="0.3"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ delay: 1.9, duration: 0.5 }}
          />
          <m.line
            x1="77" y1="97" x2="50" y2="120"
            stroke="#8B5CF6"
            strokeWidth="1"
            opacity="0.2"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ delay: 2.0, duration: 0.5 }}
          />
          <m.line
            x1="123" y1="97" x2="150" y2="120"
            stroke="#8B5CF6"
            strokeWidth="1"
            opacity="0.2"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ delay: 2.1, duration: 0.5 }}
          />

          {/* Small accent dots on circuit lines (CSS animation) */}
          <circle
            cx="37" cy="53" r="2.5"
            fill="#8B5CF6"
            style={{
              animation: prefersReducedMotion ? "none" : "circuit-dot-blink 2s ease-in-out 2.5s infinite",
              opacity: 0,
            }}
          />
          <circle
            cx="163" cy="53" r="2.5"
            fill="#8B5CF6"
            style={{
              animation: prefersReducedMotion ? "none" : "circuit-dot-blink 2s ease-in-out 3s infinite",
              opacity: 0,
            }}
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="vGrad" x1="55" y1="40" x2="145" y2="155">
              <stop offset="0%" stopColor="#A78BFA" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="frameGrad" x1="25" y1="15" x2="175" y2="170">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.15" />
            </linearGradient>
          </defs>
        </m.svg>

        {/* Tagline text */}
        <m.p
          className="mt-6 font-space text-sm font-bold tracking-[0.3em] text-white/70 uppercase md:text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 1.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Brzo. Transparento. Bez komplikacija.
        </m.p>

        {/* Domain text */}
        <m.p
          className="mt-2 font-dm text-xs tracking-widest text-white/30"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 2.0, duration: 0.5 }}
        >
          volt.hr
        </m.p>

        {/* CTA button */}
        <m.button
          className="relative mt-5 overflow-hidden rounded-full bg-[#8B5CF6] px-8 py-3 font-dm text-sm font-semibold tracking-wide text-white uppercase"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ delay: 2.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{
            scale: 1.06,
            boxShadow:
              "0 0 0 1px rgba(167,139,250,0.5), 0 0 28px rgba(139,92,246,0.55), 0 0 56px rgba(139,92,246,0.2)",
          }}
          whileTap={{ scale: 0.97 }}
        >
          {/* Shimmer sweep on hover */}
          <m.span
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
            }}
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          />
          Započni projekt
        </m.button>
      </div>
    </div>
  )
}
