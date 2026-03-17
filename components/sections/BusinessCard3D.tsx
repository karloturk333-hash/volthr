"use client"

import { useState } from "react"

interface BusinessCardProps {
  name: string
  role: string
  frontColor: string
  backColor: string
}

function BusinessCard({ name, role, frontColor, backColor }: BusinessCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="group cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setFlipped((f) => !f)
      }}
      tabIndex={0}
      role="button"
      aria-label={`Vizitka za ${name} — klikni za okretanje`}
    >
      <div
        className="relative h-56 w-full max-w-sm transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl px-6 shadow-lg"
          style={{
            backfaceVisibility: "hidden",
            backgroundColor: frontColor,
          }}
        >
          {/* Badge placeholder */}
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/30">
            <span className="font-space text-2xl font-bold text-white">
              {name.split(" ").map((n) => n[0]).join("")}
            </span>
          </div>
          <div className="text-center">
            <div className="font-space text-lg font-bold text-white">{name}</div>
            <div className="mt-1 text-sm text-white/70">{role}</div>
          </div>
          <div className="mt-4 text-[10px] uppercase tracking-widest text-white/40">
            Klikni za okretanje
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl px-6 shadow-lg"
          style={{
            backfaceVisibility: "hidden",
            backgroundColor: backColor,
            transform: "rotateY(180deg)",
          }}
        >
          <div className="text-center">
            <div className="font-space text-lg font-bold text-white">{name}</div>
            <div className="mt-1 text-sm text-amber-200/80">{role}</div>
            <div className="mx-auto mt-4 h-px w-12 bg-white/20" />
            <div className="mt-4 space-y-1.5 text-xs text-white/60">
              <div>Pub Cubismo</div>
              <div>Lonjica, Vrbovec</div>
              <div>pub-cubismo.vercel.app</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface BusinessCard3DProps {
  cards: readonly {
    readonly name: string
    readonly role: string
    readonly frontColor: string
    readonly backColor: string
  }[]
}

export function BusinessCard3D({ cards }: BusinessCard3DProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {cards.map((card) => (
        <BusinessCard
          key={card.name}
          name={card.name}
          role={card.role}
          frontColor={card.frontColor}
          backColor={card.backColor}
        />
      ))}
    </div>
  )
}
