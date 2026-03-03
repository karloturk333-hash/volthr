// Sanity schema definition for Project documents.
// Used when the Sanity Studio is set up (separate project or embedded).
// This file is a reference — not imported by the Next.js app.

export const project = {
  name: "project",
  title: "Projekt",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Naslov",
      type: "string",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    },
    {
      name: "description",
      title: "Opis",
      type: "text",
      rows: 3,
    },
    {
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
    },
    {
      name: "url",
      title: "URL",
      type: "url",
    },
    {
      name: "coverImage",
      title: "Cover slika",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "technologies",
      title: "Tehnologije",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "features",
      title: "Značajke",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "featured",
      title: "Istaknuto",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "order",
      title: "Redoslijed",
      type: "number",
    },
    {
      name: "client",
      title: "Klijent",
      type: "string",
    },
    {
      name: "location",
      title: "Lokacija",
      type: "string",
    },
    {
      name: "language",
      title: "Jezik",
      type: "string",
      initialValue: "hr",
    },
  ],
  orderings: [
    {
      title: "Redoslijed",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
}
