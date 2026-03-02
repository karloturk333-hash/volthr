---
name: sanity-nextjs
description: |
  Sanity CMS integration with Next.js 16 App Router. Use when: creating or modifying Sanity schemas, writing GROQ queries, setting up next-sanity client, configuring image pipelines, implementing revalidation/webhooks, using TypeGen for type-safe queries, or troubleshooting Sanity + Next.js issues. Also trigger when user mentions "CMS", "content management", "headless CMS", "Sanity", "GROQ", "structured content", "sanity studio", or wants to make any content editable/dynamic. Covers free tier limits (100K API CDN requests/mo, 1M API requests, 500K assets, 20GB bandwidth). Prevents 15+ documented integration errors.
---

# Sanity CMS + Next.js 16 Integration Skill

Production-tested patterns for Sanity with Next.js 16 App Router, React 19.2, and TypeScript.

## Package Versions

| Package | Version | Notes |
|---------|---------|-------|
| next-sanity | 9.x | Primary integration package |
| @sanity/image-url | 1.x | Image URL builder |
| @sanity/vision | 3.x | GROQ playground in Studio |
| sanity | 3.x | Studio + schema definitions |
| groq | 3.x | Query builder with defineQuery |

## Quick Setup

```bash
# Initialize Sanity in existing Next.js project
npm create sanity@latest -- --template clean --create-project "my-project" --dataset production --typescript

# Install Next.js integration
npm install next-sanity @sanity/image-url
```

### Required Files

```
lib/
├── sanity/
│   ├── client.ts       # Sanity client configuration
│   ├── queries.ts      # All GROQ queries (SCREAMING_SNAKE_CASE)
│   ├── image.ts        # Image URL builder
│   └── types.ts        # Generated types (via TypeGen)
sanity/
├── schemas/            # Document type schemas
│   ├── index.ts        # Schema registry
│   ├── blog.ts
│   ├── project.ts
│   └── testimonial.ts
├── sanity.config.ts    # Studio configuration
└── sanity.cli.ts       # CLI configuration
```

### Client Setup (lib/sanity/client.ts)

```typescript
import { createClient } from "next-sanity"

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",  // Use a fixed date, not "vX"
  useCdn: true,               // true for production reads, false for preview/draft
})
```

### Environment Variables

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_REVALIDATE_SECRET=random-secret-for-webhooks
```

## Schema Patterns

### Define Schemas (TypeScript)

```typescript
// sanity/schemas/blog.ts
import { defineType, defineField } from "sanity"

export const blog = defineType({
  name: "blog",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required().max(96),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "coverImage",
      type: "image",
      options: { hotspot: true },  // ALWAYS enable hotspot for images
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt Text",
          validation: (Rule) => Rule.required(), // Accessibility
        }),
      ],
    }),
    defineField({
      name: "body",
      type: "array",
      of: [
        { type: "block" },  // Portable Text
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "caption", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      // BEST PRACTICE: Always use arrays for references, even if currently single
    }),
  ],
  orderings: [
    { title: "Published Date, New", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", media: "coverImage" },
  },
})
```

### Schema Best Practices

1. **Always use `defineType` and `defineField`** — enables TypeGen and autocompletion
2. **Use arrays for references** even when currently single (future-proofing)
3. **Enable `hotspot: true`** on every image field
4. **Require alt text** on every image (accessibility)
5. **Use `slug` type** with `source` option, never manual string for URLs
6. **Use `datetime` not `date`** for published dates (timezone-aware)
7. **Portable Text (`array` of `block`)** for rich text, not `text`
8. **String fields with options** over booleans for states (extensible)

## GROQ Queries

### Query Naming Convention

SCREAMING_SNAKE_CASE for all query variables. Wrap in `defineQuery()` for TypeGen.

```typescript
// lib/sanity/queries.ts
import { defineQuery } from "groq"

// ✅ Correct: SCREAMING_SNAKE_CASE + defineQuery
export const POSTS_QUERY = defineQuery(`
  *[_type == "blog" && defined(slug.current)] | order(publishedAt desc) [0...12] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "coverImageUrl": coverImage.asset->url,
    "categories": categories[]->title
  }
`)

export const POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    publishedAt,
    coverImage {
      asset->,
      alt
    },
    "categories": categories[]->{title, slug}
  }
`)

// ❌ Wrong: camelCase, no defineQuery
// const postsQuery = `*[_type == "blog"]`
```

### Common GROQ Patterns

```groq
// Pagination (cursor-based is better than slice for large datasets)
*[_type == "blog" && publishedAt < $lastDate] | order(publishedAt desc) [0...10]

// Reference expansion — dereference ONCE, project multiple fields
*[_type == "blog"] {
  title,
  // ✅ Single dereference, multiple fields
  ...(author-> { "authorName": name, "authorImage": image })
}

// ❌ SLOW: Multiple dereferences on same reference
*[_type == "blog"] {
  title,
  "authorName": author->name,      // Subquery 1
  "authorImage": author->image     // Subquery 2 (redundant!)
}

// Conditional content
*[_type == "page"] {
  title,
  "content": select(
    _type == "blog" => body,
    _type == "page" => pageContent,
    "No content"
  )
}

// Count
"totalPosts": count(*[_type == "blog"])

// Coalesce (default values)
*[_type == "blog"] {
  "displayTitle": coalesce(seoTitle, title)
}
```

### Performance Rules

1. **Always filter by `_type` first** — enables indexed fetch
2. **Use `defined()` for slug checks** — `defined(slug.current)` not `slug.current != null`
3. **Limit results** with slicing `[0...N]` — never fetch all documents
4. **Dereference once** — merge with `...()` spread, don't call `->` multiple times on same ref
5. **Project only needed fields** — don't use `{ ... }` (all fields) in production
6. **Use `order()` before slicing** — `| order(field desc) [0...10]` not `[0...10] | order()`

## Next.js 16 Integration

### Fetching in Server Components (App Router)

```typescript
// app/blog/page.tsx
import { client } from "@/lib/sanity/client"
import { POSTS_QUERY } from "@/lib/sanity/queries"

export default async function BlogPage() {
  const posts = await client.fetch(POSTS_QUERY)

  return (
    <section>
      {posts.map((post) => (
        <article key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </section>
  )
}
```

### Dynamic Routes with Async Params (Next.js 16 BREAKING CHANGE)

```typescript
// app/blog/[slug]/page.tsx
import { client } from "@/lib/sanity/client"
import { POST_BY_SLUG_QUERY } from "@/lib/sanity/queries"

// ⚠️ Next.js 16: params is a Promise — MUST await
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await client.fetch(POST_BY_SLUG_QUERY, { slug })

  if (!post) return notFound()

  return <article>{/* render post */}</article>
}

// Generate static paths
export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "blog" && defined(slug.current)]{ slug }`
  )
  return slugs.map((s) => ({ slug: s.slug.current }))
}
```

### Revalidation with Webhooks

```typescript
// app/api/revalidate/route.ts
import { revalidateTag } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"
import { parseBody } from "next-sanity/webhook"

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string
      slug?: { current: string }
    }>(req, process.env.SANITY_REVALIDATE_SECRET)

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 })
    }

    if (!body?._type) {
      return new NextResponse("Bad Request", { status: 400 })
    }

    // Tag-based revalidation
    revalidateTag(body._type)

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    return new NextResponse("Error", { status: 500 })
  }
}
```

**Webhook setup in Sanity Dashboard:**
- URL: `https://your-domain.com/api/revalidate`
- Secret: Same as `SANITY_REVALIDATE_SECRET`
- Trigger on: Create, Update, Delete
- Filter: `_type in ["blog", "project", "testimonial"]`

### Using Cache Tags with Fetch

```typescript
// Fetch with revalidation tags
const posts = await client.fetch(POSTS_QUERY, {}, {
  next: { tags: ["blog"] }  // Tag for on-demand revalidation
})
```

## Image Handling

### URL Builder (lib/sanity/image.ts)

```typescript
import imageUrlBuilder from "@sanity/image-url"
import { client } from "./client"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Usage:
// urlFor(post.coverImage).width(800).height(450).format("webp").url()
```

### With next/image

```typescript
import Image from "next/image"
import { urlFor } from "@/lib/sanity/image"

export function SanityImage({ image, alt, width, height }: {
  image: any
  alt: string
  width: number
  height: number
}) {
  return (
    <Image
      src={urlFor(image).width(width).height(height).format("webp").url()}
      alt={alt}
      width={width}
      height={height}
      placeholder="blur"
      blurDataURL={urlFor(image).width(20).quality(10).blur(50).url()}
    />
  )
}
```

**Image best practices:**
- Always specify `width()` and `height()` — don't fetch full-size
- Use `.format("webp")` for modern browsers
- Generate blur placeholder at 20px width for `placeholder="blur"`
- Enable `hotspot: true` in schema and use `.fit("crop")` in builder

## TypeGen (Type-Safe Queries)

```bash
# Generate types from schemas + GROQ queries
npx sanity@latest typegen generate
```

Add to `package.json`:
```json
{
  "scripts": {
    "typegen": "sanity typegen generate"
  }
}
```

Queries wrapped in `defineQuery()` get automatic return type inference:
```typescript
import { POSTS_QUERY } from "@/lib/sanity/queries"

// TypeScript automatically knows the shape of `posts`
const posts = await client.fetch(POSTS_QUERY)
// ^? posts: { _id: string; title: string; slug: { current: string }; ... }[]
```

## Free Tier Limits

| Resource | Free Limit | What Happens at Limit |
|----------|-----------|----------------------|
| API CDN Requests | 100K/month | Overage billed |
| API Requests | 1M/month | Overage billed |
| Assets | 500K total | Cannot upload more |
| Bandwidth | 20GB/month | Overage billed |
| Datasets | 2 | Must upgrade for more |
| Members | 20 | Must upgrade for more |
| History | 7 days | Must upgrade for more |

**Optimization for free tier:**
- Use `useCdn: true` — CDN requests are cheaper (100K vs 1M limit)
- Implement ISR/SSG — minimize runtime API calls
- Cache aggressively with `next.tags` — don't re-fetch on every request
- Use `[0...N]` slicing — never fetch all documents
- Image transforms via URL builder reduce bandwidth vs full-size images

## Common Errors

### 1. "Cannot read properties of undefined (reading 'current')"
**Cause:** Accessing `slug.current` on a document without a slug.
**Fix:** Filter with `defined(slug.current)` in GROQ.

### 2. "Image URL builder: No image source provided"
**Cause:** Passing null/undefined to `urlFor()`.
**Fix:** Always check `if (image)` before calling `urlFor(image)`.

### 3. "Dataset not found" / Empty results
**Cause:** Using wrong dataset name or querying drafts without auth.
**Fix:** Check `NEXT_PUBLIC_SANITY_DATASET` matches your Sanity project. Public datasets only return published docs unless authenticated.

### 4. "params is not iterable" (Next.js 16)
**Cause:** Not awaiting `params` in dynamic routes.
**Fix:** `const { slug } = await params` — params is a Promise in Next.js 16.

### 5. Stale content after publishing
**Cause:** CDN caching / no revalidation webhook.
**Fix:** Set up webhook (see Revalidation section) or use `useCdn: false` during development.

### 6. TypeGen types out of date
**Cause:** Forgot to regenerate after schema/query changes.
**Fix:** Run `npm run typegen` after any schema or query change.

### 7. Portable Text rendering errors
**Cause:** Using wrong serializer or missing component for custom blocks.
**Fix:** Use `@portabletext/react` with explicit component map:
```typescript
import { PortableText } from "@portabletext/react"

const components = {
  types: {
    image: ({ value }) => <SanityImage image={value} alt={value.alt} width={800} height={450} />,
  },
}

<PortableText value={post.body} components={components} />
```

## Volt-Specific Schemas

For the Volt web agency project, these are the recommended schemas:

### Blog Post
Fields: title, slug, excerpt, coverImage, body (Portable Text), categories (ref[]), publishedAt, author

### Project (Portfolio)
Fields: title, slug, client, category (ref), description, coverImage, gallery (image[]), url, technologies (string[]), featured (boolean), completedAt

### Testimonial
Fields: client, role, company, quote (text), avatar (image), featured (boolean), order (number)

### Category
Fields: title, slug, description

### Site Settings (singleton)
Fields: siteTitle, seoDescription, ogImage, phone, email, address, whatsappNumber, socialLinks, euGrantBannerText, euGrantActive (boolean)

Use the Site Settings singleton for all editable global content — EU grant banner text, contact info, etc. Query with:
```groq
*[_type == "siteSettings"][0]
```
