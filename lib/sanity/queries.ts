import { defineQuery } from "groq"

export const ALL_PROJECTS_QUERY = defineQuery(
  `*[_type == "project"] | order(order asc)[0...20] {
    _id,
    title,
    slug,
    description,
    category,
    url,
    coverImage,
    technologies,
    features,
    featured,
    order,
    client,
    location,
    language
  }`
)

export const FEATURED_PROJECTS_QUERY = defineQuery(
  `*[_type == "project" && featured == true] | order(order asc)[0...6] {
    _id,
    title,
    slug,
    description,
    category,
    url,
    coverImage,
    technologies,
    features,
    featured,
    order,
    client,
    location,
    language
  }`
)

export const ALL_BLOG_POSTS_QUERY = defineQuery(
  `*[_type == "blogPost"] | order(publishedAt desc)[0...50] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    author,
    publishedAt,
    categories
  }`
)

export const BLOG_POST_BY_SLUG_QUERY = defineQuery(
  `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    coverImage,
    author,
    publishedAt,
    categories
  }`
)
