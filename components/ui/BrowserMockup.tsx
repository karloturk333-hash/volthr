// Fonts: Space Grotesk (font-space) and DM Sans (font-dm)
// In Next.js: loaded via next/font/google in layout.tsx

"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { m, AnimatePresence, useInView, useReducedMotion } from "motion/react"

// Real client sites the agency built — shown rotating inside the browser frame.
// This is the hero's proof-of-work: an agency that sells websites should show websites.
const SHOWCASE = [
  {
    src: "/images/portfolio/villa-aurea.png",
    alt: "Villa Aurea — web stranica za luksuzni smještaj na Hvaru",
    domain: "villa-aurea.hr",
    label: "Smještaj",
  },
  {
    src: "/images/portfolio/pub-cubismo.png",
    alt: "Pub Cubismo — web stranica za pub i restoran",
    domain: "pub-cubismo.hr",
    label: "Ugostiteljstvo",
  },
  {
    src: "/images/portfolio/nema-fleka.png",
    alt: "Nema Fleka — web stranica za servis dubinskog čišćenja",
    domain: "nemafleka.hr",
    label: "Usluge",
  },
] as const

const ROTATE_MS = 3800

// Chrome button config — hoisted so the array is not recreated on every render
const CHROME_BUTTONS = [
  { color: "#FF5F57", shadow: "rgba(255, 95, 87, 0.65)" },
  { color: "#FFBD2E", shadow: "rgba(255, 189, 46, 0.65)" },
  { color: "#28C840", shadow: "rgba(40, 200, 64, 0.65)" },
] as const

const chromeButtonVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

export function BrowserMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const prefersReducedMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  // Auto-rotate the showcase only while visible and motion is allowed.
  useEffect(() => {
    if (prefersReducedMotion || !isInView) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SHOWCASE.length)
    }, ROTATE_MS)
    return () => clearInterval(id)
  }, [prefersReducedMotion, isInView])

  const active = SHOWCASE[index]

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
      style={{ boxShadow: "0 30px 80px -20px rgba(139,92,246,0.35), 0 12px 40px -12px rgba(13,13,13,0.45)" }}
    >
      {/* Browser chrome bar */}
      <div className="flex items-center gap-2 bg-[#1e1e2e] px-4 py-3">
        <m.div
          className="flex gap-2"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
        >
          {CHROME_BUTTONS.map(({ color, shadow }) => (
            <m.div
              key={color}
              className="h-3 w-3 cursor-pointer rounded-full"
              style={{ backgroundColor: color }}
              variants={chromeButtonVariants}
              whileHover={{ scale: 1.15, boxShadow: `0 0 12px 3px ${shadow}` }}
              whileTap={{ scale: 0.85 }}
            />
          ))}
        </m.div>

        {/* Address bar — reflects the site currently on screen */}
        <div className="ml-4 flex flex-1 items-center gap-2 rounded-md bg-white/8 px-3 py-1.5">
          <svg className="h-3 w-3 shrink-0 text-[#28C840]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm3 8H9V7a3 3 0 0 1 6 0v3Z" fill="currentColor" />
          </svg>
          <AnimatePresence mode="wait">
            <m.span
              key={active.domain}
              className="truncate text-xs text-white/60 font-dm"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
            >
              {active.domain}
            </m.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Content area — the live website screenshot */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0f0820]">
        {/* Violet ambient frame glow — kept subtle so the screenshot stays the hero */}
        <div
          className="pointer-events-none absolute -left-24 -top-24 z-10 h-64 w-64 rounded-full opacity-40 blur-2xl"
          style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)" }}
        />

        <AnimatePresence mode="popLayout">
          <m.div
            key={active.src}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              priority={index === 0}
              sizes="(max-width: 1024px) 100vw, 1100px"
              className="object-cover object-top"
            />
          </m.div>
        </AnimatePresence>

        {/* Category chip — top right */}
        <div className="absolute right-4 top-4 z-20">
          <AnimatePresence mode="wait">
            <m.span
              key={active.label}
              className="inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 font-dm text-[11px] font-semibold tracking-wide text-white backdrop-blur-sm"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#8B5CF6]" />
              {active.label}
            </m.span>
          </AnimatePresence>
        </div>

        {/* Pager dots — which site is showing */}
        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2" aria-hidden="true">
          {SHOWCASE.map((s, i) => (
            <button
              key={s.domain}
              onClick={() => setIndex(i)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === index ? 20 : 6,
                backgroundColor: i === index ? "#8B5CF6" : "rgba(255,255,255,0.45)",
              }}
              tabIndex={-1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
