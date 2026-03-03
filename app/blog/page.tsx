import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { SEO, BLOG_PAGE } from "@/lib/content"
import { client } from "@/lib/sanity/client"
import { urlFor } from "@/lib/sanity/image"
import { ALL_BLOG_POSTS_QUERY } from "@/lib/sanity/queries"
import type { SanityBlogPost } from "@/lib/sanity/types"

export const metadata: Metadata = {
  title: SEO.blog.title,
  description: SEO.blog.description,
}

async function getBlogPosts(): Promise<SanityBlogPost[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return []
  }
  try {
    return await client.fetch<SanityBlogPost[]>(
      ALL_BLOG_POSTS_QUERY,
      {},
      { next: { tags: ["blogPost"] } }
    )
  } catch {
    return []
  }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("hr-HR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <main className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Hero */}
        <div className="mb-16 max-w-2xl">
          <span className="mb-4 block text-[11px] font-medium uppercase tracking-widest text-purple-500">
            ✦ {BLOG_PAGE.hero.label}
          </span>
          <h1 className="font-space text-4xl font-bold text-[#0D0D0D] md:text-5xl">
            {BLOG_PAGE.hero.heading}
          </h1>
          <p className="mt-4 text-lg text-[#555550]">
            {BLOG_PAGE.hero.subheading}
          </p>
        </div>

        {/* Posts grid or empty state */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group overflow-hidden rounded-xl border border-[#E8E6E0] bg-white"
              >
                {/* Cover image or gradient fallback */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  {post.coverImage ? (
                    <Image
                      src={urlFor(post.coverImage).width(600).height(375).url()}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#8B5CF6]/10 to-[#8B5CF6]/5">
                      <span className="font-space text-2xl font-bold text-[#8B5CF6]/30">
                        V
                      </span>
                    </div>
                  )}
                </div>
                {/* Content */}
                <div className="p-5">
                  {post.publishedAt && (
                    <p className="mb-2 text-xs text-[#555550]">
                      {formatDate(post.publishedAt)}
                    </p>
                  )}
                  <h2 className="font-space mb-2 text-lg font-bold text-[#0D0D0D] group-hover:text-[#8B5CF6]">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mb-3 line-clamp-2 text-sm text-[#555550]">
                      {post.excerpt}
                    </p>
                  )}
                  <span className="text-sm font-medium text-[#8B5CF6]">
                    {BLOG_PAGE.readMore}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-lg rounded-xl border border-[#E8E6E0] bg-white p-10 text-center">
            <h2 className="font-space mb-3 text-2xl font-bold text-[#0D0D0D]">
              {BLOG_PAGE.emptyState.heading}
            </h2>
            <p className="mb-6 text-[#555550]">
              {BLOG_PAGE.emptyState.body}
            </p>
            <a
              href={BLOG_PAGE.emptyState.cta.href}
              className="inline-flex items-center rounded-full bg-[#0D0D0D] px-6 py-3 text-sm font-medium text-white"
            >
              {BLOG_PAGE.emptyState.cta.label}
            </a>
          </div>
        )}
      </div>
    </main>
  )
}
