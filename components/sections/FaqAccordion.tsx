"use client"

import { useState } from "react"
import { m, AnimatePresence } from "motion/react"
import { Plus, Minus } from "lucide-react"
import { FAQ } from "@/lib/content"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
}

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section className="px-6 py-20 md:py-28 lg:py-32">
      <m.div
        className="mx-auto max-w-[800px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <m.p
          variants={fadeUp}
          className="mb-3 text-center text-sm font-semibold uppercase tracking-wider"
          style={{ color: "var(--accent)" }}
        >
          {FAQ.label}
        </m.p>
        <m.h2
          variants={fadeUp}
          className="text-center font-playfair text-3xl font-bold leading-tight md:text-4xl"
          style={{ color: "var(--text)" }}
        >
          {FAQ.heading}
        </m.h2>

        <div className="mt-14 flex flex-col gap-3">
          {FAQ.items.map((item, i) => (
            <m.div
              key={i}
              variants={fadeUp}
              className="overflow-hidden border"
              style={{
                borderColor: openIndex === i ? "var(--accent-border)" : "var(--border)",
                borderRadius: "var(--r-md)",
                background: "var(--surface-card)",
              }}
            >
              <button
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span
                  className="pr-4 text-base font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  {item.question}
                </span>
                {openIndex === i ? (
                  <Minus size={18} className="shrink-0" style={{ color: "var(--accent)" }} />
                ) : (
                  <Plus size={18} className="shrink-0" style={{ color: "var(--text-3)" }} />
                )}
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" as const }}
                  >
                    <p
                      className="px-6 pb-5 text-sm leading-relaxed"
                      style={{ color: "var(--text-2)" }}
                    >
                      {item.answer}
                    </p>
                  </m.div>
                )}
              </AnimatePresence>
            </m.div>
          ))}
        </div>
      </m.div>
    </section>
  )
}
