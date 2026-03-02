"use client"

import { useState } from "react"
import { m, AnimatePresence } from "motion/react"
import { ChevronDown } from "lucide-react"
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
    <section className="px-6 py-24 md:px-12 md:py-32" style={{ background: "var(--surface-card)" }}>
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

        <div className="mt-14 flex flex-col">
          {FAQ.items.map((item, i) => (
            <m.div
              key={i}
              variants={fadeUp}
              className="overflow-hidden"
              style={{
                borderBottom: "1px solid var(--border)",
              }}
            >
              <button
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between py-6 text-left"
              >
                <span
                  className="pr-4 text-base font-semibold"
                  style={{ color: openIndex === i ? "var(--text)" : "var(--text-2)" }}
                >
                  {item.question}
                </span>
                <m.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="shrink-0"
                >
                  <ChevronDown
                    size={18}
                    style={{ color: openIndex === i ? "var(--accent)" : "var(--text-3)" }}
                  />
                </m.span>
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
                      className="pb-6 text-sm leading-relaxed"
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
