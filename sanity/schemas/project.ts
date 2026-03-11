import { defineField, defineType } from "sanity"

export const project = defineType({
  name: "project",
  title: "Projekt",
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
    }),
    defineField({
      name: "description",
      title: "Opis",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "category",
      title: "Kategorija",
      type: "string",
      options: {
        list: [
          { title: "Web stranice", value: "Web stranice" },
          { title: "Web shopovi", value: "Web shopovi" },
          { title: "Landing stranice", value: "Landing stranice" },
          { title: "Redizajn", value: "Redizajn" },
        ],
      },
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
    }),
    defineField({
      name: "coverImage",
      title: "Cover slika",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "technologies",
      title: "Tehnologije",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "features",
      title: "Značajke",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "featured",
      title: "Istaknuto",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Redoslijed",
      type: "number",
    }),
    defineField({
      name: "client",
      title: "Klijent",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Lokacija",
      type: "string",
    }),
    defineField({
      name: "language",
      title: "Jezik",
      type: "string",
      initialValue: "hr",
    }),
  ],
  orderings: [
    {
      title: "Redoslijed",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
})
