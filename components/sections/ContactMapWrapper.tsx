"use client"

import dynamic from "next/dynamic"

const ContactMap = dynamic(
  () => import("@/components/sections/ContactMap").then((m) => ({ default: m.ContactMap })),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-[400px] animate-pulse rounded-xl border border-line bg-paper" />
      </div>
    ),
  }
)

export function ContactMapWrapper() {
  return <ContactMap />
}
