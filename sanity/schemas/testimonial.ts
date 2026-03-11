import { defineField, defineType } from "sanity"

export const testimonial = defineType({
  name: "testimonial",
  title: "Recenzija",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Citat",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "company",
      title: "Tvrtka",
      type: "string",
    }),
    defineField({
      name: "rating",
      title: "Ocjena",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5),
    }),
  ],
})
