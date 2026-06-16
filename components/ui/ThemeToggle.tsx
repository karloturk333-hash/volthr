"use client"

import { useEffect, useLayoutEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

type Theme = "light" | "dark"

// Runs before paint on the client; falls back to useEffect during SSR.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

function readTheme(): Theme {
  try {
    const stored = localStorage.getItem("volt-theme")
    if (stored === "dark" || stored === "light") return stored
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  } catch {
    return "light"
  }
}

function applyTheme(t: Theme) {
  const el = document.documentElement
  if (t === "dark") el.setAttribute("data-theme", "dark")
  else el.removeAttribute("data-theme")
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  // React hydration strips the attribute the pre-paint script set, so re-assert
  // it here. A layout effect runs in the same commit before paint → no flash.
  useIsoLayoutEffect(() => {
    const t = readTheme()
    setTheme(t)
    applyTheme(t)
    setMounted(true)
  }, [])

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark"
    setTheme(next)
    applyTheme(next)
    try {
      localStorage.setItem("volt-theme", next)
    } catch {
      /* storage unavailable — toggle still works for the session */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Prebaci na svijetli način" : "Prebaci na tamni način"}
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink [transition:background-color_0.2s_ease,border-color_0.2s_ease,color_0.2s_ease] hover:border-accent hover:text-accent ${className}`}
    >
      {/* Until mounted, render the light-mode icon (matches SSR) to avoid a hydration mismatch */}
      {mounted && theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  )
}
