"use client"

import { m } from "motion/react"

const logoNames = [
  "AutoServis Vrbovec",
  "Salon Ljepote Ana",
  "Građevina Ivan",
  "Pekara Sunce",
  "Cvjećarnica Flora",
  "Elektro Marko",
  "Stolarija Hrast",
  "Foto Studio Lux",
]

export function ClientLogos() {
  // Duplicate for seamless loop
  const doubled = [...logoNames, ...logoNames]

  return (
    <section id="trust-bar" className="overflow-hidden bg-white py-8">
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
              className="whitespace-nowrap font-dm text-sm font-medium tracking-wide text-[#999]"
            >
              {name}
            </span>
          ))}
        </div>
      </m.div>
    </section>
  )
}
