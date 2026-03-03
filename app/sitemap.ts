import { MetadataRoute } from "next"
import { client } from "@/lib/sanity/client"

interface SanitySlug {
  slug: { current: string }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://volt.hr"

  const staticPages: MetadataRoute.Sitemap = [
    { url: base,                  lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/usluge`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/cijene`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/o-nama`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/projekti`,   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/kontakt`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`,       lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/privatnost`, lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/uvjeti`,     lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ]

  // Add dynamic blog post URLs when Sanity is provisioned
  let blogPages: MetadataRoute.Sitemap = []
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const posts = await client.fetch<SanitySlug[]>(
        `*[_type == "blogPost" && defined(slug.current)] { slug }`
      )
      blogPages = posts.map((post) => ({
        url: `${base}/blog/${post.slug.current}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }))
    } catch {
      // Sanity not available — skip blog URLs
    }
  }

  return [...staticPages, ...blogPages]
}
