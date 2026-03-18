"use client"

import { m } from "motion/react"
import { CLIENT_LOGOS } from "@/lib/content"

// TODO: Replace with real client logos when available
export function ClientLogos() {
  // Duplicate for seamless loop
  const doubled = [...CLIENT_LOGOS.placeholders, ...CLIENT_LOGOS.placeholders]

  return (
    <section id="trust-bar" className="overflow-hidden bg-transparent py-8">
      <m.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="animate-marquee flex w-max items-center gap-12">
          {doubled.map((name, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-dm text-sm font-medium tracking-wide text-[#888880]"
            >
              {name}
            </span>
          ))}
        </div>
      </m.div>
    </section>
  )
}
