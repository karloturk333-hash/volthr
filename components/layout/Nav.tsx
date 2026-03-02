"use client"

import { useState } from "react"
import { m, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { NAV, SITE } from "@/lib/content"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50)
  })

  return (
    <>
      <m.header
        className="fixed top-0 left-0 right-0 z-50"
        animate={{
          backgroundColor: scrolled ? "var(--surface)" : "transparent",
          borderBottomColor: scrolled ? "var(--border)" : "transparent",
        }}
        style={{ borderBottomWidth: 1, borderBottomStyle: "solid" }}
      >
        <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <Image
              src="/images/volt-logo-dark-bg.svg"
              alt={SITE.fullName}
              width={90}
              height={32}
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 lg:flex">
            {NAV.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[var(--text-2)] hover:text-[var(--text)]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            href={NAV.cta.href}
            className="hidden rounded-full px-5 py-2.5 text-sm font-semibold lg:block"
            style={{
              background: "linear-gradient(135deg, var(--accent), var(--accent-end))",
              color: "var(--surface)",
            }}
          >
            {NAV.cta.label}
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-10 lg:hidden"
            aria-label={mobileOpen ? "Zatvori izbornik" : "Otvori izbornik"}
          >
            {mobileOpen ? (
              <X size={24} color="var(--text)" />
            ) : (
              <Menu size={24} color="var(--text)" />
            )}
          </button>
        </nav>
      </m.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 lg:hidden"
            style={{ background: "var(--surface)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <m.div
              className="flex flex-col items-center gap-6"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
            >
              {NAV.links.map((link) => (
                <m.div key={link.href} variants={fadeUp}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-playfair text-2xl font-bold text-[var(--text)]"
                  >
                    {link.label}
                  </Link>
                </m.div>
              ))}
              <m.div variants={fadeUp}>
                <Link
                  href={NAV.cta.href}
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 inline-block rounded-full px-8 py-3 text-base font-semibold"
                  style={{
                    background: "linear-gradient(135deg, var(--accent), var(--accent-end))",
                    color: "var(--surface)",
                  }}
                >
                  {NAV.cta.label}
                </Link>
              </m.div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
