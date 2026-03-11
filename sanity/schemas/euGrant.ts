import { defineField, defineType } from "sanity"

export const euGrant = defineType({
  name: "euGrant",
  title: "EU Potpora",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Naslov",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Sadržaj",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "url",
    }),
    defineField({
      name: "active",
      title: "Aktivno",
      type: "boolean",
      initialValue: true,
    }),
  ],
})
