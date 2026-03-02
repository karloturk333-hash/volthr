"use client"

import { useState } from "react"
import { m, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { NAV, SITE } from "@/lib/content"

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60)
  })

  return (
    <>
      <m.header
        className="fixed top-0 w-full z-50"
        animate={{
          backgroundColor: scrolled ? "rgba(5,5,5,0.92)" : "rgba(5,5,5,0)",
          borderBottomColor: scrolled ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ borderBottomWidth: 1, borderBottomStyle: "solid" }}
      >
        <div className="mx-auto grid max-w-[1100px] grid-cols-[1fr_auto_1fr] items-center px-6 py-4 md:px-12">

          {/* Col 1 — Logo left */}
          <Link href="/" className="flex items-center gap-2" aria-label={SITE.fullName}>
            <Image
              src="/images/volt-logo-dark-bg.svg"
              alt={SITE.fullName}
              width={100}
              height={36}
              priority
              className="h-8 w-auto"
            />
          </Link>

          {/* Col 2 — Nav links, truly centered */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Glavna navigacija">
            {NAV.links.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    "relative font-outfit text-[13px] font-medium tracking-wide",
                    isActive
                      ? "text-white"
                      : "text-[#777] hover:text-white",
                  ].join(" ")}
                  style={{ transition: "color 0.2s ease" }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full"
                      style={{ background: "var(--accent)" }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Col 3 — CTA right on desktop, hamburger right on mobile */}
          <div className="flex items-center justify-end gap-4">
            <Link
              href={NAV.cta.href}
              className="hidden items-center rounded-full px-6 py-2.5 font-outfit text-[13px] font-bold lg:flex"
              style={{
                background: "linear-gradient(135deg, var(--accent), var(--accent-end))",
                color: "var(--text-on-accent)",
                boxShadow: "0 0 24px rgba(90,236,200,0.2)",
              }}
            >
              {NAV.cta.label}
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex items-center justify-center lg:hidden"
              aria-label={mobileOpen ? "Zatvori izbornik" : "Otvori izbornik"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <m.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={24} color="var(--text)" />
                  </m.span>
                ) : (
                  <m.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={24} color="var(--text)" />
                  </m.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </m.header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center lg:hidden"
            style={{ background: "var(--surface)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <m.nav
              className="flex flex-col items-center gap-7"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
              aria-label="Mobilna navigacija"
            >
              {NAV.links.map((link) => {
                const isActive = pathname === link.href
                return (
                  <m.div key={link.href} variants={fadeUp}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={[
                        "font-playfair text-3xl font-bold tracking-tight",
                        isActive ? "text-white" : "text-[#555] hover:text-white",
                      ].join(" ")}
                      style={{ transition: "color 0.15s ease" }}
                    >
                      {link.label}
                    </Link>
                  </m.div>
                )
              })}
              <m.div variants={fadeUp} className="mt-3">
                <Link
                  href={NAV.cta.href}
                  onClick={() => setMobileOpen(false)}
                  className="inline-block rounded-full px-10 py-3.5 font-outfit text-base font-semibold"
                  style={{
                    background: "linear-gradient(135deg, var(--accent), var(--accent-end))",
                    color: "var(--text-on-accent)",
                  }}
                >
                  {NAV.cta.label}
                </Link>
              </m.div>
            </m.nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
