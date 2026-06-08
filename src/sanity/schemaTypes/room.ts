import { defineField, defineType } from "sanity";

export const roomType = defineType({
  name: "room",
  title: "Room",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Controls the order rooms appear on the home page (1 = first)",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (r) => r.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "caption", media: "image" },
            prepare({ title, media }) {
              return { title: title ?? "No caption", media };
            },
          },
        },
      ],
    }),
    defineField({
      name: "documents",
      title: "Documents",
      description: "Floor plans, site plans, specifications, PDFs etc.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "file",
              title: "File",
              type: "file",
            }),
            defineField({
              name: "category",
              title: "Category",
              type: "string",
              options: {
                list: [
                  { title: "Floor Plan", value: "floor-plan" },
                  { title: "Site Plan", value: "site-plan" },
                  { title: "Concept", value: "concept" },
                  { title: "Specification", value: "specification" },
                  { title: "Mood Board", value: "mood-board" },
                  { title: "Other", value: "other" },
                ],
              },
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "category" },
          },
        },
      ],
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", media: "images.0.image" },
  },
});
