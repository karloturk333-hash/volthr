"use client"

import { useState, useEffect, useCallback } from "react"
import { m, AnimatePresence } from "motion/react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { TESTIMONIALS } from "@/lib/content"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
}

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const items = TESTIMONIALS.items

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % items.length)
  }, [items.length])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + items.length) % items.length)
  }, [items.length])

  useEffect(() => {
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [next])

  return (
    <section className="px-6 py-20 md:py-28 lg:py-32">
      <m.div
        className="mx-auto max-w-[800px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <m.div variants={fadeUp} className="mb-4 flex items-center justify-center gap-3">
          <span style={{ width: 20, height: 1, background: "var(--accent)", display: "block", borderRadius: 2, opacity: 0.6 }} />
          <span className="text-xs font-bold uppercase" style={{ color: "var(--accent)", letterSpacing: "0.15em" }}>{TESTIMONIALS.label}</span>
          <span style={{ width: 20, height: 1, background: "var(--accent)", display: "block", borderRadius: 2, opacity: 0.6 }} />
        </m.div>
        <m.h2
          variants={fadeUp}
          className="text-center font-playfair text-4xl font-bold leading-tight md:text-5xl"
          style={{ color: "var(--text)" }}
        >
          {TESTIMONIALS.heading}
        </m.h2>

        <m.div variants={fadeUp} className="mt-14">
          <div className="relative overflow-hidden" style={{ minHeight: 200 }}>
            <AnimatePresence mode="wait">
              <m.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: "easeInOut" as const }}
                className="text-center"
              >
                <Quote size={32} style={{ color: "var(--accent)", opacity: 0.3 }} className="mx-auto mb-6" />
                <p
                  className="font-playfair text-xl leading-relaxed italic md:text-2xl"
                  style={{ color: "var(--text)" }}
                >
                  &ldquo;{items[current].quote}&rdquo;
                </p>
                <div className="mt-8">
                  <p className="text-base font-semibold" style={{ color: "var(--text)" }}>
                    {items[current].client}
                  </p>
                  <p className="mt-1 text-sm" style={{ color: "var(--text-3)" }}>
                    {items[current].role} · {items[current].location}
                  </p>
                </div>
              </m.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border"
              style={{ borderColor: "var(--border)", color: "var(--text-2)" }}
              aria-label="Prethodni"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="h-2 rounded-full"
                  style={{
                    width: i === current ? 24 : 8,
                    background: i === current ? "var(--accent)" : "var(--text-3)",
                    transition: "width 0.3s ease, background 0.3s ease",
                  }}
                  aria-label={`Izjava ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border"
              style={{ borderColor: "var(--border)", color: "var(--text-2)" }}
              aria-label="Sljedeći"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </m.div>
      </m.div>
    </section>
  )
}
