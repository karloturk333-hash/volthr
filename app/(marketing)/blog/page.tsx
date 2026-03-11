import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { BookOpen, MessageCircle } from "lucide-react"
import { SEO, BLOG_PAGE } from "@/lib/content"
import { client } from "@/lib/sanity/client"
import { urlFor } from "@/lib/sanity/image"
import { ALL_BLOG_POSTS_QUERY } from "@/lib/sanity/queries"
import type { SanityBlogPost } from "@/lib/sanity/types"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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
  const featuredPost = posts[0]
  const remainingPosts = posts.slice(1)

  return (
    <main className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Hero header */}
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

        {posts.length > 0 ? (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <Link href={`/blog/${featuredPost.slug.current}`} className="group mb-16 block">
                <Card className="overflow-hidden border-[#E8E6E0] bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[360px]">
                      {featuredPost.coverImage ? (
                        <Image
                          src={urlFor(featuredPost.coverImage).width(800).height(500).url()}
                          alt={featuredPost.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#8B5CF6]/10 to-[#8B5CF6]/5">
                          <span className="font-space text-4xl font-bold text-[#8B5CF6]/30">V</span>
                        </div>
                      )}
                      <Badge className="absolute left-4 top-4 bg-[#8B5CF6] text-white hover:bg-[#8B5CF6]">
                        {BLOG_PAGE.featuredLabel}
                      </Badge>
                    </div>
                    {/* Content */}
                    <div className="flex flex-col justify-center p-6 md:p-10">
                      {featuredPost.categories?.[0] && (
                        <Badge
                          variant="secondary"
                          className="mb-4 w-fit bg-[#8B5CF6]/10 text-[#8B5CF6] hover:bg-[#8B5CF6]/10"
                        >
                          {featuredPost.categories[0]}
                        </Badge>
                      )}
                      <h2 className="font-space mb-3 text-2xl font-bold text-[#0D0D0D] group-hover:text-[#8B5CF6] md:text-3xl">
                        {featuredPost.title}
                      </h2>
                      {featuredPost.excerpt && (
                        <p className="mb-4 line-clamp-3 text-[#555550]">
                          {featuredPost.excerpt}
                        </p>
                      )}
                      <div className="mb-6 flex items-center gap-3 text-sm text-[#555550]">
                        {featuredPost.author && <span>{featuredPost.author}</span>}
                        {featuredPost.author && featuredPost.publishedAt && (
                          <span className="text-[#E8E6E0]">|</span>
                        )}
                        {featuredPost.publishedAt && (
                          <span>{formatDate(featuredPost.publishedAt)}</span>
                        )}
                      </div>
                      <Button variant="ghost" className="w-fit text-[#8B5CF6] hover:text-[#8B5CF6]">
                        {BLOG_PAGE.readMore}
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            )}

            {/* Recent Posts */}
            {remainingPosts.length > 0 && (
              <>
                <div className="mb-8 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-[#8B5CF6]" />
                  <h2 className="font-space text-2xl font-bold text-[#0D0D0D]">
                    {BLOG_PAGE.recentLabel}
                  </h2>
                </div>

                <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {remainingPosts.map((post) => (
                    <Link
                      key={post._id}
                      href={`/blog/${post.slug.current}`}
                      className="group"
                    >
                      <Card className="h-full overflow-hidden border-[#E8E6E0] bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                        {/* Image */}
                        <div className="relative aspect-video overflow-hidden">
                          {post.coverImage ? (
                            <Image
                              src={urlFor(post.coverImage).width(600).height(375).url()}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#8B5CF6]/10 to-[#8B5CF6]/5">
                              <span className="font-space text-2xl font-bold text-[#8B5CF6]/30">V</span>
                            </div>
                          )}
                          {post.categories?.[0] && (
                            <Badge
                              variant="secondary"
                              className="absolute left-3 top-3 bg-[#8B5CF6]/10 text-[#8B5CF6] hover:bg-[#8B5CF6]/10"
                            >
                              {post.categories[0]}
                            </Badge>
                          )}
                        </div>
                        {/* Content */}
                        <CardHeader className="pb-2">
                          <CardTitle className="font-space text-lg font-bold text-[#0D0D0D] group-hover:text-[#8B5CF6]">
                            {post.title}
                          </CardTitle>
                          {post.excerpt && (
                            <CardDescription className="line-clamp-2 text-[#555550]">
                              {post.excerpt}
                            </CardDescription>
                          )}
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-[#555550]">
                            {post.publishedAt && (
                              <span>{formatDate(post.publishedAt)}</span>
                            )}
                          </div>
                          <Button variant="ghost" size="sm" className="text-[#8B5CF6] hover:text-[#8B5CF6]">
                            {BLOG_PAGE.readMore}
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {/* CTA Section */}
            <Card className="border-[#E8E6E0] bg-[#F5F4F0]">
              <div className="flex flex-col items-center px-6 py-12 text-center md:py-16">
                <MessageCircle className="mb-4 h-10 w-10 text-[#8B5CF6]" />
                <h2 className="font-space mb-3 text-2xl font-bold text-[#0D0D0D] md:text-3xl">
                  {BLOG_PAGE.ctaHeading}
                </h2>
                <p className="mb-6 max-w-md text-[#555550]">
                  {BLOG_PAGE.ctaBody}
                </p>
                <a
                  href={BLOG_PAGE.ctaCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full bg-[#0D0D0D] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[#0D0D0D]/90"
                >
                  {BLOG_PAGE.ctaCta.label}
                </a>
              </div>
            </Card>
          </>
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
