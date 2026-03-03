"use client"

import { useEffect, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { m } from "motion/react"
import { fadeUp } from "@/lib/animations"
import { SITE } from "@/lib/content"
import L from "leaflet"

// Fix default marker icon (Leaflet + bundlers issue)
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const VRBOVEC_CENTER: [number, number] = [45.8833, 16.4167]
const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"

export function ContactMap() {
  const cssLoaded = useRef(false)

  useEffect(() => {
    if (cssLoaded.current) return
    cssLoaded.current = true
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = LEAFLET_CSS
    document.head.appendChild(link)
  }, [])

  return (
    <m.div
      className="mx-auto max-w-7xl px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeUp}
    >
      <div className="overflow-hidden rounded-xl border border-[#E8E6E0]">
        <MapContainer
          center={VRBOVEC_CENTER}
          zoom={14}
          scrollWheelZoom={false}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={VRBOVEC_CENTER} icon={markerIcon}>
            <Popup>
              <strong>{SITE.fullName}</strong>
              <br />
              {SITE.address.street}
              <br />
              {SITE.address.zip} {SITE.address.city}
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Address overlay */}
      <div className="mt-4 text-center text-sm text-[#555550]">
        {SITE.address.street}, {SITE.address.zip} {SITE.address.city}, {SITE.address.county}
      </div>
    </m.div>
  )
}
