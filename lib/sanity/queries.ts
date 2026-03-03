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
