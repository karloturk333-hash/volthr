"use client"

import { useState, useEffect } from "react"
import { m, AnimatePresence } from "motion/react"
import Link from "next/link"
import { HERO } from "@/lib/content"

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
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
    <section className="relative flex min-h-[calc(100vh-80px)] items-center justify-center px-6 pt-20">
      <m.div
        className="mx-auto flex max-w-[900px] flex-col items-center text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <m.div
          variants={fadeUp}
          className="mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
          style={{
            borderColor: "var(--accent-border)",
            color: "var(--accent)",
            background: "var(--accent-soft)",
          }}
        >
          <span className="text-xs">★</span>
          {HERO.badge}
        </m.div>

        {/* Heading */}
        <m.h1
          variants={fadeUp}
          className="font-playfair text-5xl font-black leading-tight tracking-tight md:text-6xl lg:text-7xl"
          style={{ color: "var(--text)" }}
        >
          {HERO.heading}
          <br />
          <span className="relative inline-block h-[1.15em] overflow-hidden align-bottom">
            <AnimatePresence mode="wait">
              <m.span
                key={HERO.rotatingWords[wordIndex]}
                className="inline-block"
                style={{ color: "var(--accent)" }}
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                exit={{ clipPath: "inset(0 0 0 100%)" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {HERO.rotatingWords[wordIndex]}
              </m.span>
            </AnimatePresence>
          </span>
        </m.h1>

        {/* Subheading */}
        <m.p
          variants={fadeUp}
          className="mt-6 max-w-2xl text-lg font-normal leading-relaxed md:text-xl"
          style={{ color: "var(--text-2)" }}
        >
          {HERO.subheading}
        </m.p>

        {/* CTAs */}
        <m.div variants={fadeUp} className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href={HERO.cta.primary.href}
            className="rounded-full px-8 py-3.5 text-base font-semibold"
            style={{
              background: "linear-gradient(135deg, var(--accent), var(--accent-end))",
              color: "var(--text-on-accent)",
            }}
          >
            {HERO.cta.primary.label}
          </Link>
          <Link
            href={HERO.cta.secondary.href}
            className="rounded-full border px-8 py-3.5 text-base font-medium"
            style={{
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            {HERO.cta.secondary.label}
          </Link>
        </m.div>

        {/* Trust line */}
        <m.p
          variants={fadeUp}
          className="mt-8 text-sm"
          style={{ color: "var(--text-3)" }}
        >
          {HERO.trust}
        </m.p>
      </m.div>
    </section>
  )
}
