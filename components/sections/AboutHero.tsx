"use client"

import { m } from "motion/react"
import { ABOUT_PAGE } from "@/lib/content"
import { heroStagger, heroWord } from "@/lib/animations"

export function AboutHero() {
  const words = ABOUT_PAGE.hero.heading.split(" ")

  return (
    <section className="bg-[#F5F4F0] px-6 py-32 md:py-40">
      <div className="mx-auto max-w-3xl text-center">

        {/* Label + rule */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex flex-col items-center gap-3"
        >
          <span className="section-label">{ABOUT_PAGE.hero.label}</span>
          <div className="h-px w-12 bg-[#8B5CF6]" />
        </m.div>

        {/* Heading — word stagger */}
        <m.h1
          className="font-space text-4xl font-bold leading-[1.1] text-[#0D0D0D] md:text-5xl lg:text-6xl"
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

      </div>
    </section>
  )
}
