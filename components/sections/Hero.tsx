"use client"

import { useState, useEffect } from "react"
import { m, AnimatePresence } from "motion/react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
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
    <section className="relative flex min-h-screen items-center justify-center px-6 pt-20 overflow-hidden">
      {/* Radial gradient mesh */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 40%, rgba(90,236,200,0.08) 0%, transparent 65%)",
        }}
      />

      {/* Dot grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--text) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Side accent glows */}
      <div
        className="pointer-events-none absolute -left-32 top-1/3 h-64 w-64 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(90,236,200,0.06), transparent 70%)", filter: "blur(60px)" }}
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-1/3 h-64 w-64 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(90,236,200,0.06), transparent 70%)", filter: "blur(60px)" }}
      />

      <m.div
        className="relative mx-auto flex max-w-[900px] flex-col items-center text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <m.div
          variants={fadeUp}
          className="mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold"
          style={{
            borderColor: "var(--accent-border)",
            color: "var(--accent)",
            background: "var(--accent-soft)",
            letterSpacing: "0.02em",
          }}
        >
          <span>★</span>
          {HERO.badge}
        </m.div>

        {/* Heading */}
        <m.h1
          variants={fadeUp}
          className="font-playfair font-bold leading-[1.08] tracking-[-0.035em]"
          style={{
            fontSize: "clamp(3rem, 8.5vw, 6.2rem)",
            color: "var(--text)",
          }}
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
            className="rounded-full px-8 py-3.5 text-base font-bold"
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
              borderColor: "rgba(255,255,255,0.12)",
              color: "var(--text)",
              background: "rgba(255,255,255,0.04)",
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

        {/* Scroll indicator */}
        <m.div
          variants={fadeUp}
          className="mt-16 flex flex-col items-center gap-2"
          style={{ color: "var(--text-3)" }}
        >
          <span className="text-xs uppercase tracking-widest" style={{ letterSpacing: "0.15em" }}>scroll</span>
          <m.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={18} />
          </m.div>
        </m.div>
      </m.div>
    </section>
  )
}
