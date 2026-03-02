"use client"

import { m } from "motion/react"
import { MARQUEE_WORDS } from "@/lib/content"

export function KeywordMarquee() {
  return (
    <m.section
      className="relative overflow-hidden bg-[#F5F4F0] py-12 md:py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24"
        style={{ background: "linear-gradient(to right, #F5F4F0, transparent)" }}
      />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24"
        style={{ background: "linear-gradient(to left, #F5F4F0, transparent)" }}
      />

      <div className="animate-marquee flex w-max items-center">
        {[0, 1].map((i) => (
          <div key={i} className="flex shrink-0 items-center">
            {MARQUEE_WORDS.map((word, j) => (
              <span key={`${i}-${j}`} className="flex items-center">
                <span
                  className="shrink-0 font-space font-bold uppercase text-[#0D0D0D] opacity-20"
                  style={{
                    fontSize: "clamp(3rem, 7vw, 6rem)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {word}
                </span>
                <span className="mx-6 inline-block h-3 w-3 shrink-0 rounded-full bg-[#8B5CF6] opacity-25 md:mx-8" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </m.section>
  )
}
