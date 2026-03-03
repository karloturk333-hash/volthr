export const testimonial = {
  name: "testimonial",
  title: "Recenzija",
  type: "document",
  fields: [
    {
      name: "quote",
      title: "Citat",
      type: "text",
      rows: 3,
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "author",
      title: "Autor",
      type: "string",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "company",
      title: "Tvrtka",
      type: "string",
    },
    {
      name: "rating",
      title: "Ocjena",
      type: "number",
      validation: (Rule: { min: (n: number) => { max: (n: number) => unknown } }) =>
        Rule.min(1).max(5),
    },
  ],
}
