"use client"

import { m } from "motion/react"
import Link from "next/link"
import { EU_GRANT } from "@/lib/content"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
}

export function EuGrantBanner() {
  return (
    <section className="px-6 py-24 md:px-12 md:py-32 lg:py-36" style={{ background: "var(--frame)" }}>
      <m.div
        className="mx-auto max-w-[1100px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <m.div variants={fadeUp} className="mb-5 flex items-center gap-3">
          <span style={{ width: 28, height: 2, background: "var(--surface)", flexShrink: 0, display: "block", borderRadius: 2, opacity: 0.5 }} />
          <span className="text-xs font-bold uppercase" style={{ color: "var(--surface)", letterSpacing: "0.15em", opacity: 0.7 }}>{EU_GRANT.label}</span>
        </m.div>
        <m.h2
          variants={fadeUp}
          className="font-playfair text-4xl font-bold leading-tight md:text-5xl"
          style={{ color: "var(--surface)" }}
        >
          {EU_GRANT.heading}
        </m.h2>
        <m.p
          variants={fadeUp}
          className="mt-4 max-w-2xl text-base leading-relaxed"
          style={{ color: "var(--surface-70)" }}
        >
          {EU_GRANT.body}
        </m.p>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {EU_GRANT.highlights.map((item) => (
            <m.div
              key={item.title}
              variants={fadeUp}
              className="border p-6"
              style={{
                background: "var(--glass-light)",
                borderColor: "var(--surface-10)",
                borderRadius: "var(--r-lg)",
              }}
            >
              <div
                className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold"
                style={{
                  background: "var(--surface)",
                  color: "var(--accent)",
                }}
              >
                {item.intensity}
              </div>
              <h3
                className="font-playfair text-lg font-bold"
                style={{ color: "var(--surface)" }}
              >
                {item.title}
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "var(--surface-70)" }}
              >
                {item.description}
              </p>
            </m.div>
          ))}
        </div>

        <m.div variants={fadeUp} className="mt-10">
          <Link
            href={EU_GRANT.cta.href}
            className="inline-block rounded-full px-8 py-3.5 text-base font-semibold"
            style={{
              background: "var(--surface)",
              color: "var(--accent)",
            }}
          >
            {EU_GRANT.cta.label}
          </Link>
        </m.div>

        <m.p
          variants={fadeUp}
          className="mt-8 text-xs leading-relaxed"
          style={{ color: "var(--surface-50)" }}
        >
          {EU_GRANT.disclaimer}
        </m.p>
      </m.div>
    </section>
  )
}
