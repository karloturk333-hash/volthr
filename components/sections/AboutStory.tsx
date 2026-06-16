"use client"

import { m } from "motion/react"
import Image from "next/image"
import { ABOUT_PAGE } from "@/lib/content"
import { slideFromLeft, slideFromRight } from "@/lib/animations"

export function AboutStory() {
  return (
    <section className="bg-transparent px-6 py-16 md:px-12 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Left — text */}
          <m.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <span className="section-label mb-4 block">{ABOUT_PAGE.story.label}</span>
            <h2 className="font-space text-3xl font-bold text-[#0D0D0D] md:text-4xl lg:text-5xl">
              {ABOUT_PAGE.story.heading}
            </h2>
            <div className="mt-6 flex flex-col gap-4">
              {ABOUT_PAGE.story.paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-[#555550] md:text-lg">
                  {p}
                </p>
              ))}
            </div>
          </m.div>

          {/* Right — stock portrait */}
          <m.div
            variants={slideFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="relative"
          >
            {/* Decorative ✦ */}
            <span className="absolute right-4 top-4 z-10 text-2xl text-[#8B5CF6] opacity-70 select-none">
              ✦
            </span>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[#E8E6E0]">
              <Image
                src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=800&auto=format&fit=crop&q=80"
                alt={ABOUT_PAGE.story.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </m.div>

        </div>
      </div>
    </section>
  )
}
