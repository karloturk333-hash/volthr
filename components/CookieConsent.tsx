"use client"

import { useSyncExternalStore, useCallback } from "react"
import { m, AnimatePresence } from "motion/react"
import { fadeUp } from "@/lib/animations"

function setCookie(name: string, value: string, days: number) {
  const maxAge = days * 24 * 60 * 60
  document.cookie = `${name}=${encodeURIComponent(value)};max-age=${maxAge};path=/;SameSite=Lax`
}

// useSyncExternalStore — reads cookie without setState-in-effect
const subscribe = () => () => {}

function getSnapshot(): boolean {
  return !document.cookie.match(/(?:^|; )volt_consent=/)
}

function getServerSnapshot(): boolean {
  return false // hidden on server to avoid hydration mismatch
}

export function CookieConsent() {
  const shouldShow = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const accept = useCallback((value: "all" | "essential") => {
    setCookie("volt_consent", value, 365)
    // Reload — layout reads cookie server-side for GA, banner re-checks
    window.location.reload()
  }, [])

  return (
    <AnimatePresence>
      {shouldShow && (
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
