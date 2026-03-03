// Manual TypeScript interfaces for Sanity document types.
// TODO: Generate with `sanity typegen generate` when Sanity Studio is set up.

export interface SanityProject {
  _id: string
  _type: "project"
  title: string
  slug: { current: string }
  description: string
  category: string
  url: string
  coverImage?: {
    _type: "image"
    asset: { _ref: string; _type: "reference" }
    hotspot?: { x: number; y: number; height: number; width: number }
  }
  staticImage?: string // local path in /public for fallback projects
  technologies: string[]
  features: string[]
  featured: boolean
  order: number
  client: string
  location: string
  language: string
}

export interface SanityTestimonial {
  _id: string
  _type: "testimonial"
  quote: string
  author: string
  company?: string
  rating?: number
}

export interface SanityEuGrant {
  _id: string
  _type: "euGrant"
  title: string
  body: string
  link?: string
  active: boolean
}
