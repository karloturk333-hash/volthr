export const euGrant = {
  name: "euGrant",
  title: "EU Potpora",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Naslov",
      type: "string",
    },
    {
      name: "body",
      title: "Sadržaj",
      type: "text",
      rows: 5,
    },
    {
      name: "link",
      title: "Link",
      type: "url",
    },
    {
      name: "active",
      title: "Aktivno",
      type: "boolean",
      initialValue: true,
    },
  ],
}
