"use client"

import { useState, useEffect } from "react"
import { m, AnimatePresence } from "motion/react"
import { fadeUp } from "@/lib/animations"

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

function setCookie(name: string, value: string, days: number) {
  const maxAge = days * 24 * 60 * 60
  document.cookie = `${name}=${encodeURIComponent(value)};max-age=${maxAge};path=/;SameSite=Lax`
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = getCookie("volt_consent")
    if (!consent) setVisible(true)
  }, [])

  function accept(value: "all" | "essential") {
    setCookie("volt_consent", value, 365)
    setVisible(false)
    if (value === "all") {
      // Reload to let layout pick up the cookie and load GA
      window.location.reload()
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          className="fixed inset-x-0 bottom-0 z-50 p-4 md:p-6"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={fadeUp}
        >
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-xl border border-[#E8E6E0] bg-white p-6 shadow-lg sm:flex-row sm:justify-between">
            <p className="text-sm text-[#555550]">
              Koristimo kolačiće za poboljšanje iskustva.
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                onClick={() => accept("essential")}
                className="rounded-full border border-[#0D0D0D] px-5 py-2 text-sm font-medium text-[#0D0D0D]"
              >
                Samo nužni
              </button>
              <button
                onClick={() => accept("all")}
                className="rounded-full bg-[#0D0D0D] px-5 py-2 text-sm font-medium text-white"
              >
                Prihvati sve
              </button>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
