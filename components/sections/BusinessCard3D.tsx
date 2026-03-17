"use client"

import { useState } from "react"

interface CardData {
  readonly name: string
  readonly role: string
  readonly phone: string
  readonly email: string
  readonly frontColor: string
  readonly backColor: string
  readonly borderColor: string
  readonly accentColor: string
  readonly services: readonly string[]
}

function BusinessCard({ card }: { card: CardData }) {
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
      aria-label={`Vizitka za ${card.name} — klikni za okretanje`}
    >
      <div
        className="relative aspect-[1.75/1] w-full max-w-[420px] transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ===== FRONT — bottle green with gold border ===== */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-xl p-4 shadow-xl"
          style={{
            backfaceVisibility: "hidden",
            backgroundColor: card.frontColor,
          }}
        >
          {/* Gold border inset */}
          <div
            className="absolute inset-3 rounded-lg"
            style={{ border: `1px solid ${card.borderColor}` }}
          />

          {/* Badge circle */}
          <div
            className="relative mb-3 flex h-[72px] w-[72px] items-center justify-center rounded-full"
            style={{ border: `3px solid ${card.accentColor}` }}
          >
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full"
              style={{ backgroundColor: card.frontColor, border: `2px solid ${card.borderColor}` }}
            >
              <span className="text-center font-space text-[9px] font-bold leading-tight tracking-wide text-white">
                The Pub
                <br />
                <span className="text-[11px]">CUBISMO</span>
              </span>
            </div>
          </div>

          {/* Tagline */}
          <div className="mb-2 text-[8px] uppercase tracking-[0.25em] text-white/50">
            Good vibes for good day
          </div>

          {/* Decorative divider */}
          <div className="mb-3 flex items-center gap-2">
            <div className="h-px w-6" style={{ backgroundColor: card.borderColor }} />
            <div className="text-[10px] text-white/40">&#9774;</div>
            <div className="h-px w-6" style={{ backgroundColor: card.borderColor }} />
          </div>

          {/* Name + role */}
          <div className="text-center">
            <div
              className="font-space text-xl font-bold"
              style={{ color: "#ffffff" }}
            >
              {card.name}
            </div>
            <div
              className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: card.accentColor }}
            >
              {card.role}
            </div>
          </div>

          {/* Flip hint */}
          <div className="absolute bottom-3 text-[8px] uppercase tracking-widest text-white/25">
            Klikni za okretanje
          </div>
        </div>

        {/* ===== BACK — dark brown with contact info ===== */}
        <div
          className="absolute inset-0 flex rounded-xl p-6 shadow-xl sm:p-8"
          style={{
            backfaceVisibility: "hidden",
            backgroundColor: card.backColor,
            transform: "rotateY(180deg)",
          }}
        >
          {/* Left column — contact */}
          <div className="flex flex-1 flex-col justify-between">
            <div className="space-y-3">
              <div>
                <div
                  className="text-[9px] font-bold uppercase tracking-widest"
                  style={{ color: card.accentColor }}
                >
                  Telefon
                </div>
                <div className="mt-0.5 font-space text-base font-bold text-white/90">
                  {card.phone}
                </div>
              </div>
              <div>
                <div
                  className="text-[9px] font-bold uppercase tracking-widest"
                  style={{ color: card.accentColor }}
                >
                  Email
                </div>
                <div className="mt-0.5 text-sm text-white/90">
                  {card.email}
                </div>
              </div>
              <div>
                <div
                  className="text-[9px] font-bold uppercase tracking-widest"
                  style={{ color: card.accentColor }}
                >
                  Adresa
                </div>
                <div className="mt-0.5 text-sm leading-snug text-white/90">
                  Lonjica 267,
                  <br />
                  10340 Vrbovec
                </div>
              </div>
            </div>

            {/* Company info */}
            <div className="mt-4 space-y-0.5 font-mono text-[9px] text-white/30">
              <div>Domesticus d.o.o</div>
              <div>OIB: 32402986267</div>
            </div>
          </div>

          {/* Right column — services */}
          <div className="flex flex-col items-end justify-between text-right">
            <div className="space-y-1">
              {card.services.map((service) => (
                <div
                  key={service}
                  className="text-sm font-medium text-white/80"
                >
                  {service}
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-0.5 font-mono text-[9px] text-white/30">
              <div>@pubcubismo</div>
              <div>pubcubismo.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface BusinessCard3DProps {
  cards: readonly CardData[]
}

export function BusinessCard3D({ cards }: BusinessCard3DProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {cards.map((card) => (
        <BusinessCard key={card.name} card={card} />
      ))}
    </div>
  )
}
