"use client"

import { useRef } from "react"
import dynamic from "next/dynamic"
import { m, useScroll, useTransform } from "motion/react"
import Link from "next/link"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { HERO } from "@/lib/content"
import { heroStagger, heroWord } from "@/lib/animations"

const BrowserMockup = dynamic(() =>
  import("@/components/ui/BrowserMockup").then((m) => ({ default: m.BrowserMockup })),
  { loading: () => <div className="aspect-video w-full max-w-2xl rounded-2xl bg-[#1a1a2e]/5 animate-pulse" /> }
)

const MotionLink = m(Link)

// Pre-split at module level — HERO.heading is a constant
const HERO_WORDS = HERO.heading.split(" ")

export function Hero() {
  const mockupRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: mockupRef,
    offset: ["start end", "end start"],
  })
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, -80])

  return (
    <AuroraBackground
      className="px-6 pt-32 pb-12 md:px-12 md:pt-40 md:pb-16 lg:pt-48"
    >
      <section id="hero" className="relative z-10 w-full">
        <div className="mx-auto max-w-7xl">
          {/* Two-column layout */}
          <div className="grid items-start gap-12 lg:grid-cols-[3fr_2fr] lg:gap-20">
            {/* Left column — label + H1 + rule */}
            <m.div
              variants={heroStagger}
              initial="hidden"
              animate="visible"
            >
              <m.div variants={heroWord} className="mb-8">
                <span className="section-label">{HERO.label}</span>
              </m.div>

              <m.h1
                variants={heroWord}
                className="font-space font-bold leading-[1.05] text-[#0D0D0D]"
                style={{
                  fontSize: "clamp(2.8rem, 5.5vw, 5.2rem)",
                  letterSpacing: "-0.035em",
                }}
              >
                {HERO_WORDS.map((word, i) => (
                  <m.span
                    key={i}
                    variants={heroWord}
                    className="mr-[0.3em] inline-block"
                  >
                    {word}
                  </m.span>
                ))}
              </m.h1>

              {/* Purple horizontal rule */}
              <m.div
                variants={heroWord}
                className="mt-8 h-[2px] w-16 bg-[#8B5CF6]"
              />
            </m.div>

            {/* Right column — descriptor + CTAs */}
            <m.div
              className="flex flex-col justify-end lg:pt-24"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-dm text-lg italic leading-relaxed text-[#555550]">
                {HERO.descriptor}
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <ShimmerButton
                  href={HERO.cta.primary.href}
                  borderRadius="9999px"
                  className="px-8 py-3.5 font-dm text-[14px] font-bold"
                >
                  {HERO.cta.primary.label}
                </ShimmerButton>
                <MotionLink
                  href={HERO.cta.secondary.href}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
                  className="inline-flex items-center justify-center rounded-full border-[1.5px] border-[#0D0D0D] bg-transparent px-8 py-3.5 font-dm text-[14px] font-medium text-[#0D0D0D] hover:bg-[#0D0D0D] hover:text-white"
                >
                  {HERO.cta.secondary.label}
                </MotionLink>
              </div>
            </m.div>
          </div>

          {/* Full-width browser mockup */}
          <m.div
            ref={mockupRef}
            className="mt-16 md:mt-20"
            style={{ y: mockupY }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <BrowserMockup />
          </m.div>
        </div>
      </section>
    </AuroraBackground>
  )
}
