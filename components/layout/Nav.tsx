"use client"

import { useState, useMemo } from "react"
import { m, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { NAV, SITE } from "@/lib/content"
import { RainbowButton } from "@/components/ui/rainbow-button"
import { fadeUpSmall } from "@/lib/animations"

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60)
  })

  // Stable object reference — only recreates when scrolled boolean flips
  const navStyle = useMemo(() => ({
    boxShadow: scrolled
      ? "0 4px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)"
      : "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)",
  }), [scrolled])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b border-[#E8E6E0] bg-[#F5F4F0] lg:border-0 lg:bg-transparent lg:px-6 lg:pt-3"
      >
        <div
          className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 [transition:box-shadow_0.3s_ease] lg:rounded-2xl lg:border lg:border-[#E8E6E0] lg:bg-white"
          style={navStyle}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" aria-label={SITE.fullName}>
            <Image src="/images/volt-v-monogram.svg" alt={SITE.fullName} width={40} height={40} priority className="h-9 w-9 lg:h-10 lg:w-10" />
          </Link>

          {/* Desktop links */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Glavna navigacija">
            {NAV.links.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-dm text-[14px] font-medium [transition:color_0.2s_ease] hover:text-[#0D0D0D] ${isActive ? "text-[#0D0D0D]" : "text-[#333333]"}`}
                >
                  {link.label}
                  {isActive && (
                    <m.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full bg-[#8B5CF6]"
                      transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <RainbowButton
              href={NAV.cta.href}
              className="hidden lg:inline-flex h-auto rounded-full px-7 py-2.5 font-dm text-[13px] font-bold"
            >
              {NAV.cta.label}
            </RainbowButton>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex items-center justify-center lg:hidden"
              aria-label={mobileOpen ? "Zatvori izbornik" : "Otvori izbornik"}
              aria-expanded={mobileOpen}
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
                    <X size={24} color="#0D0D0D" />
                  </m.span>
                ) : (
                  <m.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={24} color="#0D0D0D" />
                  </m.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#F5F4F0] lg:hidden"
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
                  <m.div key={link.href} variants={fadeUpSmall}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`font-space text-3xl font-bold tracking-tight [transition:color_0.15s_ease] ${isActive ? "text-[#0D0D0D]" : "text-[#888880]"}`}
                    >
                      {link.label}
                    </Link>
                  </m.div>
                )
              })}
              <m.div variants={fadeUpSmall} className="mt-3">
                <Link
                  href={NAV.cta.href}
                  onClick={() => setMobileOpen(false)}
                  className="inline-block rounded-full bg-[#0D0D0D] px-10 py-3.5 font-dm text-base font-semibold text-white"
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
