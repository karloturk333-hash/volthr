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
    <section className="px-6 py-24 md:px-12 md:py-32">
      <div className="relative mx-auto max-w-[900px]">
        {/* Large ambient glow behind card */}
        <div
          className="pointer-events-none absolute -inset-8"
          style={{
            background: "radial-gradient(ellipse at center, rgba(90,236,200,0.08) 0%, transparent 60%)",
          }}
        />

        <m.div
          className="relative overflow-hidden p-12 text-center md:p-16 lg:p-20"
          style={{
            borderRadius: "var(--r-xl)",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {/* Top glow inside card */}
          <div
            className="pointer-events-none absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2"
            style={{
              background: "radial-gradient(circle, rgba(90,236,200,0.2), transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          <m.h2
            variants={fadeUp}
            className="relative font-playfair text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
            style={{ color: "var(--text)" }}
          >
            {CTA_SECTION.heading}
          </m.h2>

          <m.p
            variants={fadeUp}
            className="relative mx-auto mt-6 max-w-lg text-base leading-relaxed md:text-lg"
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
              className="rounded-full px-10 py-4 text-base font-bold"
              style={{
                background: "linear-gradient(135deg, var(--accent), var(--accent-end))",
                color: "var(--text-on-accent)",
                boxShadow: "0 0 40px rgba(90,236,200,0.25)",
              }}
            >
              {CTA_SECTION.cta.primary.label}
            </Link>
            <Link
              href={CTA_SECTION.cta.whatsapp.href}
              className="flex items-center gap-2 rounded-full border px-8 py-4 text-base font-medium"
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
      </div>
    </section>
  )
}
