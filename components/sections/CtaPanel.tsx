"use client"

import { m } from "motion/react"
import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { CTA_SECTION } from "@/lib/content"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
}

export function CtaPanel() {
  return (
    <section className="px-6 py-24">
      <m.div
        className="relative mx-auto max-w-[700px] overflow-hidden border p-12 text-center md:p-16"
        style={{
          borderRadius: "var(--r-xl)",
          borderColor: "var(--accent-border)",
          background: "rgba(14, 14, 14, 0.6)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {/* Glow effect */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2"
          style={{
            background: "radial-gradient(circle, var(--accent-glow), transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <m.h2
          variants={fadeUp}
          className="relative font-playfair text-3xl font-bold leading-tight md:text-4xl"
          style={{ color: "var(--text)" }}
        >
          {CTA_SECTION.heading}
        </m.h2>

        <m.p
          variants={fadeUp}
          className="relative mt-5 text-base leading-relaxed"
          style={{ color: "var(--text-2)" }}
        >
          {CTA_SECTION.subheading}
        </m.p>

        <m.div
          variants={fadeUp}
          className="relative mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href={CTA_SECTION.cta.primary.href}
            className="rounded-full px-8 py-3.5 text-base font-semibold"
            style={{
              background: "linear-gradient(135deg, var(--accent), var(--accent-end))",
              color: "var(--text-on-accent)",
            }}
          >
            {CTA_SECTION.cta.primary.label}
          </Link>
          <Link
            href={CTA_SECTION.cta.whatsapp.href}
            className="flex items-center gap-2 rounded-full border px-8 py-3.5 text-base font-medium"
            style={{
              borderColor: "var(--accent-border)",
              color: "var(--accent)",
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={18} />
            {CTA_SECTION.cta.whatsapp.label}
          </Link>
        </m.div>

        <m.p
          variants={fadeUp}
          className="relative mt-6 text-sm"
          style={{ color: "var(--text-3)" }}
        >
          {CTA_SECTION.trust}
        </m.p>
      </m.div>
    </section>
  )
}
