"use client"

import { useState } from "react"
import Image from "next/image"

export function BusinessCard3D() {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="flex justify-center">
      <div
        className="cursor-pointer"
        style={{ perspective: "1200px" }}
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setFlipped((f) => !f)
        }}
        tabIndex={0}
        role="button"
        aria-label="Vizitka za Miroslav Čolig — klikni za okretanje"
      >
        <div
          className="relative w-[min(100%,525px)] transition-transform duration-700"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front */}
          <div
            className="overflow-hidden rounded-xl shadow-xl"
            style={{ backfaceVisibility: "hidden" }}
          >
            <Image
              src="/images/portfolio/vizitka-front.png"
              alt="Vizitka prednja strana — Miroslav Čolig, CEO/Event Manager"
              width={1050}
              height={600}
              className="block w-full h-auto"
              quality={95}
              priority
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
              alt="Vizitka stražnja strana — kontakt podaci"
              width={1050}
              height={600}
              className="block w-full h-auto"
              quality={95}
            />
          </div>
        </div>

        <p className="mt-3 text-center font-dm text-[11px] text-[#888880]">
          Klikni za okretanje
        </p>
      </div>
    </div>
  )
}
