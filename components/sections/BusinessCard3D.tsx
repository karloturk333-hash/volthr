"use client"

import { useState } from "react"
import Image from "next/image"

interface BusinessCard3DProps {
  frontSrc: string
  backSrc: string
  name: string
  role: string
}

export function BusinessCard3D({
  frontSrc,
  backSrc,
  name,
  role,
}: BusinessCard3DProps) {
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
        aria-label={`Vizitka za ${name} — klikni za okretanje`}
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
              src={frontSrc}
              alt={`Vizitka prednja strana — ${name}, ${role}`}
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
              src={backSrc}
              alt={`Vizitka stražnja strana — ${name}, kontakt podaci`}
              width={1050}
              height={600}
              className="block w-full h-auto"
              quality={95}
            />
          </div>
        </div>

        <p className="mt-3 text-center font-dm text-[11px] text-faint">
          Klikni za okretanje
        </p>
      </div>
    </div>
  )
}
