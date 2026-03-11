import { defineField, defineType } from "sanity"

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Naslov",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Kratki opis",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Sadržaj",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "coverImage",
      title: "Naslovna slika",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "string",
      initialValue: "Volt",
    }),
    defineField({
      name: "publishedAt",
      title: "Datum objave",
      type: "datetime",
    }),
    defineField({
      name: "categories",
      title: "Kategorije",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Web dizajn", value: "web-dizajn" },
          { title: "SEO", value: "seo" },
          { title: "EU potpore", value: "eu-potpore" },
          { title: "Savjeti", value: "savjeti" },
          { title: "AI alati", value: "ai-alati" },
        ],
      },
    }),
  ],
  preview: {
    select: { title: "title", media: "coverImage" },
  },
})
