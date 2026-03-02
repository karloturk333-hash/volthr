"use client"

import { useState, useEffect } from "react"
import { m, AnimatePresence } from "motion/react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { HERO } from "@/lib/content"

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % HERO.rotatingWords.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">

      {/* === BACKGROUND LAYER === */}

      {/* Faint VOLT watermark */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-playfair font-black"
          style={{
            fontSize: "clamp(180px, 28vw, 400px)",
            color: "var(--text)",
            opacity: 0.022,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          VOLT
        </span>
      </div>

      {/* Aurora blob — top right */}
      <div
        className="pointer-events-none absolute -right-20 -top-20"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(90,236,200,0.18) 0%, rgba(90,236,200,0.06) 45%, transparent 70%)",
          filter: "blur(90px)",
          borderRadius: "50%",
        }}
      />

      {/* Aurora blob — bottom left */}
      <div
        className="pointer-events-none absolute -bottom-20 -left-20"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(45,212,168,0.12) 0%, rgba(45,212,168,0.04) 50%, transparent 70%)",
          filter: "blur(100px)",
          borderRadius: "50%",
        }}
      />

      {/* Subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(242,242,242,0.08) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
        }}
      />

      {/* === CONTENT === */}
      <m.div
        className="relative z-10 mx-auto flex max-w-[920px] flex-col items-center text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <m.div
          variants={fadeUp}
          className="mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2"
          style={{
            borderColor: "var(--accent-border)",
            color: "var(--accent)",
            background: "var(--accent-soft)",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.02em",
          }}
        >
          <span style={{ color: "#FFD700" }}>★</span>
          {HERO.badge}
        </m.div>

        {/* H1 */}
        <m.h1
          variants={fadeUp}
          className="font-playfair font-black leading-[1.05]"
          style={{
            fontSize: "clamp(3.2rem, 9vw, 6.8rem)",
            letterSpacing: "-0.035em",
            color: "var(--text)",
          }}
        >
          {HERO.heading}
          <br />
          <span
            className="relative inline-block overflow-hidden align-bottom"
            style={{ height: "1.12em" }}
          >
            <AnimatePresence mode="wait">
              <m.span
                key={HERO.rotatingWords[wordIndex]}
                className="inline-block"
                style={{
                  background: "linear-gradient(135deg, #5AECC8, #A6F5DE, #2DD4A8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
                exit={{ clipPath: "inset(0 0 0 100%)", opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {HERO.rotatingWords[wordIndex]}
              </m.span>
            </AnimatePresence>
          </span>
        </m.h1>

        {/* Divider line */}
        <m.div
          variants={fadeUp}
          className="mt-8 mb-6"
          style={{ width: 48, height: 2, background: "var(--accent)", borderRadius: 2, opacity: 0.5 }}
        />

        {/* Subheading */}
        <m.p
          variants={fadeUp}
          className="max-w-xl text-lg leading-relaxed md:text-xl"
          style={{ color: "var(--text-2)", fontWeight: 400 }}
        >
          {HERO.subheading}
        </m.p>

        {/* CTAs */}
        <m.div variants={fadeUp} className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href={HERO.cta.primary.href}
            className="rounded-full px-8 py-4 text-base font-bold"
            style={{
              background: "linear-gradient(135deg, var(--accent), var(--accent-end))",
              color: "var(--text-on-accent)",
              boxShadow: "0 0 32px rgba(90,236,200,0.25)",
            }}
          >
            {HERO.cta.primary.label}
          </Link>
          <Link
            href={HERO.cta.secondary.href}
            className="rounded-full px-8 py-4 text-base font-medium"
            style={{
              border: "1px solid rgba(255,255,255,0.14)",
              color: "var(--text-2)",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            {HERO.cta.secondary.label}
          </Link>
        </m.div>

        {/* Trust */}
        <m.p
          variants={fadeUp}
          className="mt-6 text-sm"
          style={{ color: "var(--text-3)" }}
        >
          {HERO.trust}
        </m.p>

        {/* Scroll indicator */}
        <m.div
          variants={fadeUp}
          className="mt-16 flex flex-col items-center gap-2"
          style={{ color: "var(--text-3)" }}
        >
          <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.18em" }}>scroll</span>
          <m.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={16} />
          </m.div>
        </m.div>
      </m.div>
    </section>
  )
}
