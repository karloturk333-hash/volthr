import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PortableText } from "@portabletext/react"
import { client } from "@/lib/sanity/client"
import { urlFor } from "@/lib/sanity/image"
import { BLOG_POST_BY_SLUG_QUERY } from "@/lib/sanity/queries"
import { BLOG_PAGE, SITE } from "@/lib/content"
import { safeJsonLd } from "@/lib/utils"
import { portableTextComponents } from "@/components/ui/portableTextComponents"
import type { SanityBlogPost } from "@/lib/sanity/types"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string): Promise<SanityBlogPost | null> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return null
  }
  try {
    return await client.fetch<SanityBlogPost | null>(
      BLOG_POST_BY_SLUG_QUERY,
      { slug },
      { next: { tags: ["blogPost"] } }
    )
  } catch {
    return null
  }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("hr-HR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return { title: "Članak nije pronađen" }
  }

  const ogImage = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).url()
    : "/images/og-default.png"

  return {
    title: post.title,
    description: post.excerpt ?? `${post.title} — ${SITE.fullName} blog`,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      url: `/blog/${slug}`,
      type: "article",
      locale: "hr_HR",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: post.author ?? SITE.fullName,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.fullName,
      url: `https://${SITE.domain}`,
    },
    datePublished: post.publishedAt,
    ...(post.coverImage
      ? { image: urlFor(post.coverImage).width(1200).height(630).url() }
      : {}),
  }

  return (
    <main className="py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(articleJsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-6">
        {/* Back link */}
        <Link
          href="/blog"
          className="mb-8 inline-block text-sm text-[#8B5CF6] hover:underline"
        >
          {BLOG_PAGE.backLabel}
        </Link>

        {/* Header */}
        <header className="mb-10">
          {post.categories && post.categories.length > 0 && (
            <div className="mb-4 flex gap-2">
              {post.categories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full bg-[#8B5CF6]/10 px-3 py-1 text-xs font-medium text-[#8B5CF6]"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-space text-3xl font-bold text-[#0D0D0D] md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <div className="mt-4 flex items-center gap-4 text-sm text-[#555550]">
            {post.author && <span>{post.author}</span>}
            {post.publishedAt && (
              <>
                <span className="text-[#E8E6E0]">|</span>
                <span>{formatDate(post.publishedAt)}</span>
              </>
            )}
          </div>
        </header>

        {/* Cover image */}
        {post.coverImage && (
          <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-xl">
            <Image
              src={urlFor(post.coverImage).width(900).height(506).url()}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        {/* Body */}
        {post.body && (
          <div className="prose-volt">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>
        )}
      </article>
    </main>
  )
}
