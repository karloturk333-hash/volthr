"use client"

import { m } from "motion/react"
import { SERVICES_PAGE } from "@/lib/content"
import { heroStagger, heroWord } from "@/lib/animations"

export function ServicesHero() {
  const words = SERVICES_PAGE.hero.heading.split(" ")

  return (
    <section className="bg-transparent px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl text-center">

        {/* Label + rule */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex flex-col items-center gap-3"
        >
          <span className="section-label">{SERVICES_PAGE.hero.label}</span>
          <div className="h-px w-12 bg-accent" />
        </m.div>

        {/* H1 — word stagger */}
        <m.h1
          className="font-space text-4xl font-bold leading-[1.08] text-ink md:text-5xl lg:text-6xl"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          {words.map((word, i) => (
            <m.span
              key={i}
              variants={heroWord}
              className="mr-[0.25em] inline-block last:mr-0"
            >
              {word}
            </m.span>
          ))}
        </m.h1>

        {/* Subheading */}
        <m.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-base leading-relaxed text-muted md:text-lg"
        >
          {SERVICES_PAGE.hero.subheading}
        </m.p>

        {/* Anchor nav strip — table of contents */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3"
        >
          {SERVICES_PAGE.services.map((service, i) => (
            <a
              key={service.slug}
              href={`#${service.slug}`}
              className="font-mono text-[11px] uppercase tracking-widest text-faint hover:text-accent"
              style={{ transition: "color 0.2s ease" }}
            >
              <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
              {" "}
              {service.title}
            </a>
          ))}
        </m.div>

      </div>
    </section>
  )
}
