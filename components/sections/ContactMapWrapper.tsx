"use client"

import dynamic from "next/dynamic"

const ContactMap = dynamic(
  () => import("@/components/sections/ContactMap").then((m) => ({ default: m.ContactMap })),
  { ssr: false }
)

export function ContactMapWrapper() {
  return <ContactMap />
}
