"use client"

import { useState } from "react"
import { m, AnimatePresence } from "motion/react"
import { ChevronDown } from "lucide-react"
import { FAQ } from "@/lib/content"
import { fadeUp, staggerContainer } from "@/lib/animations"

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section className="bg-paper px-6 py-16 md:px-12 md:py-20">
      <m.div
        className="mx-auto max-w-[800px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <m.div variants={fadeUp} className="mb-4 flex items-center justify-center gap-3">
          <span className="section-label">{FAQ.label}</span>
        </m.div>
        <m.h2
          variants={fadeUp}
          className="text-center font-space text-4xl font-bold leading-tight text-ink md:text-5xl"
        >
          {FAQ.heading}
        </m.h2>

        <div className="mt-14 flex flex-col">
          {FAQ.items.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <m.div
                key={i}
                variants={fadeUp}
                className="relative overflow-hidden border-b border-line"
              >
                {/* Purple left accent when open */}
                {isOpen && (
                  <m.div
                    className="absolute bottom-0 left-0 top-0 w-[2px] bg-accent"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  className={`flex w-full items-center justify-between py-5 text-left sm:py-6 ${isOpen ? "pl-4" : "pl-0"}`}
                >
                  <span
                    className={`pr-4 text-base font-semibold ${isOpen ? "text-ink" : "text-muted"}`}
                  >
                    {item.question}
                  </span>
                  <m.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="shrink-0"
                  >
                    <ChevronDown
                      size={18}
                      className={isOpen ? "text-accent" : "text-faint"}
                    />
                  </m.span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <m.div
                      id={`faq-answer-${i}`}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" as const }}
                    >
                      <p className="pb-6 pl-4 text-sm leading-relaxed text-muted">
                        {item.answer}
                      </p>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            )
          })}
        </div>
      </m.div>
    </section>
  )
}
