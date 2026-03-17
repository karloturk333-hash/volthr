"use client"

import { useState } from "react"
import Image from "next/image"

function BusinessCard({ name }: { name: string }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="cursor-pointer"
      style={{ perspective: "1200px" }}
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setFlipped((f) => !f)
      }}
      tabIndex={0}
      role="button"
      aria-label={`Vizitka za ${name} — klikni za okretanje`}
    >
      <div
        className="relative aspect-[1.75/1] w-full max-w-[420px] transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 overflow-hidden rounded-xl shadow-xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image
            src="/images/portfolio/vizitka-front.png"
            alt={`Vizitka prednja strana — ${name}`}
            fill
            className="object-cover"
            sizes="420px"
          />
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 overflow-hidden rounded-xl shadow-xl"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Image
            src="/images/portfolio/vizitka-back.png"
            alt={`Vizitka stražnja strana — ${name}`}
            fill
            className="object-cover"
            sizes="420px"
          />
        </div>
      </div>

      <p className="mt-3 text-center text-[11px] text-[#888880]">
        Klikni za okretanje
      </p>
    </div>
  )
}

interface BusinessCard3DProps {
  cards: readonly { readonly name: string }[]
}

export function BusinessCard3D({ cards }: BusinessCard3DProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {cards.map((card) => (
        <BusinessCard key={card.name} name={card.name} />
      ))}
    </div>
  )
}
