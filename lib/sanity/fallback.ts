import type { SanityProject } from "./types"

/**
 * Hardcoded fallback project data used when Sanity is not configured
 * or when the fetch fails. This ensures the build always succeeds
 * and the site renders real project cards.
 */
export const FALLBACK_PROJECTS: SanityProject[] = [
  {
    _id: "fallback-pub-cubismo",
    _type: "project",
    title: "Pub Cubismo",
    slug: { current: "pub-cubismo" },
    description:
      "Kompletna digitalna transformacija za irski pub s 20+ godina tradicije. Moderna stranica s jelovnikom (190+ artikala), WhatsApp rezervacijama i premium vizitkama.",
    category: "Web stranice",
    url: "https://pub-cubismo.vercel.app",
    staticImage: "/images/portfolio/pub-cubismo.svg",
    technologies: ["Next.js", "React", "Tailwind CSS", "Motion"],
    features: [
      "Lighthouse 100/100",
      "190+ artikala s cijenama",
      "WhatsApp rezervacije",
      "Google Business optimizacija",
      "Premium vizitke za 2 suvlasnika",
      "Responzivni dizajn",
      "Lokalni SEO",
    ],
    featured: true,
    order: 0,
    client: "Pub Cubismo",
    location: "Lonjica / Vrbovec",
    language: "hr",
    caseStudySlug: "pub-cubismo",
  },
  {
    _id: "fallback-villa-aurea",
    _type: "project",
    title: "Villa Aurea",
    slug: { current: "villa-aurea" },
    description:
      "Luksuzna web stranica za smještaj na otoku Hvaru. Panoramski parallax, apartmani s cijenama, Google Maps, direktno booking.",
    category: "Web stranice",
    url: "https://villa-aurea.vercel.app",
    staticImage: "/images/portfolio/villa-aurea.png",
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
    _id: "fallback-nema-fleka",
    _type: "project",
    title: "Nema Fleka",
    slug: { current: "nema-fleka" },
    description:
      "Web stranica za servis dubinskog čišćenja iz Vrbovca i Zagreba. Interaktivni kalkulator cijena, before/after slider, WhatsApp booking.",
    category: "Web stranice",
    url: "https://nemafleka.vercel.app",
    staticImage: "/images/portfolio/nema-fleka.png",
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
