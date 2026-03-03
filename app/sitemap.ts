import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://volt.hr"
  return [
    { url: base,               lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/usluge`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/cijene`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/o-nama`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    // /projekti and /kontakt not yet built — add when pages ship
  ]
}
