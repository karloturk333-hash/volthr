"use client"

import { m } from "motion/react"
import { Bell } from "lucide-react"
import { POST_GRANT_BANNER } from "@/lib/content"
import { fadeUp, staggerContainer } from "@/lib/animations"

export function PostGrantBanner() {
  return (
    <section className="bg-paper px-6 pt-32 pb-8 md:px-12 md:pt-40 md:pb-12">
      <m.div
        className="mx-auto max-w-4xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <m.div
          variants={fadeUp}
          className="flex flex-col items-start gap-4 rounded-xl border border-line bg-card p-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-3">
            <Bell size={20} className="mt-0.5 shrink-0 text-accent" />
            <div>
              <div className="font-space text-base font-bold text-ink">
                {POST_GRANT_BANNER.heading}
              </div>
              <div className="mt-1 font-dm text-sm text-muted">
                {POST_GRANT_BANNER.body}
              </div>
            </div>
          </div>
          <a
            href={POST_GRANT_BANNER.cta.href}
            className="shrink-0 rounded-full bg-accent px-5 py-2.5 font-dm text-sm font-semibold text-white"
          >
            {POST_GRANT_BANNER.cta.label}
          </a>
        </m.div>
      </m.div>
    </section>
  )
}
