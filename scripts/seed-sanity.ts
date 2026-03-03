/**
 * Seed script for Sanity CMS.
 * Run after creating your Sanity project at sanity.io/manage:
 *
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=your-id npx tsx scripts/seed-sanity.ts
 *
 * This creates the two initial project documents (Nema Fleka + Villa Aurea).
 * Cover images must be uploaded manually via the Sanity Studio.
 */

import { createClient } from "@sanity/client"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable.")
  console.error("Usage: NEXT_PUBLIC_SANITY_PROJECT_ID=your-id npx tsx scripts/seed-sanity.ts")
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // needs write access
})

const projects = [
  {
    _type: "project" as const,
    _id: "project-villa-aurea",
    title: "Villa Aurea",
    slug: { _type: "slug" as const, current: "villa-aurea" },
    description:
      "Višestranična luksuzna web stranica za smještaj na otoku Hvaru. Panoramski parallax, apartmani s cijenama, Google Maps, direktno booking.",
    category: "Web stranice",
    url: "https://villa-aurea.vercel.app",
    technologies: ["Next.js", "React", "Tailwind CSS"],
    features: [
      "Višestranična arhitektura",
      "Panoramski parallax",
      "Apartmani s cijenama",
      "Google Maps integracija",
      "Direktni booking CTA",
      "Interaktivni cursor preview",
      "Responzivna tipografija",
    ],
    featured: true,
    order: 1,
    client: "Villa Aurea",
    location: "Hvar, Hrvatska",
    language: "en",
  },
  {
    _type: "project" as const,
    _id: "project-nema-fleka",
    title: "Nema Fleka",
    slug: { _type: "slug" as const, current: "nema-fleka" },
    description:
      "Web stranica za servis dubinskog čišćenja iz Vrbovca i Zagreba. Interaktivni kalkulator cijena, before/after slider, WhatsApp booking.",
    category: "Web stranice",
    url: "https://nemafleka.vercel.app",
    technologies: ["Next.js", "React", "Tailwind CSS", "Motion"],
    features: [
      "Interaktivni kalkulator cijena",
      "Before/after slider",
      "WhatsApp integracija",
      "Testimonial karusel",
      "Zona pokrivenosti",
      "FAQ accordion",
      "Mobilni-first dizajn",
    ],
    featured: true,
    order: 2,
    client: "Nema Fleka",
    location: "Vrbovec / Zagreb",
    language: "hr",
  },
]

async function seed() {
  console.log(`Seeding ${projects.length} projects to ${projectId}/${dataset}...`)

  for (const project of projects) {
    const result = await client.createOrReplace(project)
    console.log(`  Created: ${result.title} (${result._id})`)
  }

  console.log("Done! Upload cover images via the Sanity Studio.")
}

seed().catch((err) => {
  console.error("Seed failed:", err)
  process.exit(1)
})
