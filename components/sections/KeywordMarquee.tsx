"use client"

import { m } from "motion/react"
import { MARQUEE_WORDS } from "@/lib/content"

export function KeywordMarquee() {
  const words = MARQUEE_WORDS.join(" · ")
  const doubledWords = `${words} · ${words} · `

  return (
    <m.section
      className="overflow-hidden py-10 md:py-14"
      style={{ background: "var(--surface-card)" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="animate-marquee flex w-max items-center">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="shrink-0 font-playfair font-bold uppercase"
            style={{
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              color: "var(--accent)",
              opacity: 0.18,
              letterSpacing: "-0.02em",
              paddingRight: "2rem",
            }}
          >
            {doubledWords}
          </span>
        ))}
      </div>
    </m.section>
  )
}
