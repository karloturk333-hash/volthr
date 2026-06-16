"use client"

import { useState, useCallback } from "react"
import { m, AnimatePresence } from "motion/react"
import { fadeUp } from "@/lib/animations"

function setCookie(name: string, value: string, days: number) {
  const maxAge = days * 24 * 60 * 60
  document.cookie = `${name}=${encodeURIComponent(value)};max-age=${maxAge};path=/;SameSite=Lax`
}

function hasCookie(): boolean {
  if (typeof document === "undefined") return true
  return !!document.cookie.match(/(?:^|; )volt_consent=/)
}

export function CookieConsent() {
  const [dismissed, setDismissed] = useState(() => hasCookie())

  const accept = useCallback((value: "all" | "essential") => {
    setCookie("volt_consent", value, 365)
    setDismissed(true)

    // Dynamically inject GA if user accepted all
    if (value === "all" && typeof window !== "undefined") {
      const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
      if (gaId && !document.querySelector(`script[src*="googletagmanager"]`)) {
        const script = document.createElement("script")
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
        script.async = true
        document.head.appendChild(script)

        const inline = document.createElement("script")
        inline.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}');`
        document.head.appendChild(inline)
      }
    }
  }, [])

  return (
    <AnimatePresence>
      {!dismissed && (
        <m.div
          className="fixed inset-x-0 bottom-0 z-50 p-4 md:p-6"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={fadeUp}
        >
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-xl border border-line bg-white p-6 shadow-lg sm:flex-row sm:justify-between">
            <p className="text-sm text-muted">
              Koristimo kolačiće za poboljšanje iskustva.{" "}
              <a href="/privatnost" className="underline hover:text-accent">
                Saznaj više
              </a>
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                onClick={() => accept("essential")}
                className="rounded-full border border-ink px-5 py-2 text-sm font-medium text-ink"
              >
                Samo nužni
              </button>
              <button
                onClick={() => accept("all")}
                className="rounded-full bg-ink px-5 py-2 text-sm font-medium text-white"
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
