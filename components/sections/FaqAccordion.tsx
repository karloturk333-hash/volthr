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
        <m.div variants={fadeUp} className="mb-4 flex items-center justify-center gap-3">
          <span style={{ width: 20, height: 1, background: "var(--accent)", display: "block", borderRadius: 2, opacity: 0.6 }} />
          <span className="text-xs font-bold uppercase" style={{ color: "var(--accent)", letterSpacing: "0.15em" }}>{FAQ.label}</span>
          <span style={{ width: 20, height: 1, background: "var(--accent)", display: "block", borderRadius: 2, opacity: 0.6 }} />
        </m.div>
        <m.h2
          variants={fadeUp}
          className="text-center font-playfair text-4xl font-bold leading-tight md:text-5xl"
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
