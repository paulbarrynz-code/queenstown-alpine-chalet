import { defineField, defineType } from "sanity";

export const roomType = defineType({
  name: "room",
  title: "Room",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "order", title: "Display Order", type: "number", description: "Controls order on home page (1 = first)" }),
    defineField({ name: "navGroup", title: "Navigation Group", type: "string", description: 'Optional. Group this room under a dropdown in the nav, e.g. "Documents"' }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        defineField({
          name: "imageItem",
          title: "Image",
          type: "object",
          fields: [
            defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "documents",
      title: "Documents",
      description: "Top-level documents — floor plans, site plans, property information etc.",
      type: "array",
      of: [
        defineField({
          name: "documentItem",
          title: "Document",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "file", title: "File", type: "file" }),
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
        }),
      ],
    }),
    defineField({
      name: "sections",
      title: "Sections",
      description: 'Add named sections like "Current State", "Concepts", "Materials" etc.',
      type: "array",
      of: [
        defineField({
          name: "section",
          title: "Section",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Section Title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", title: "Section Notes", type: "text", rows: 2 }),
            defineField({
              name: "images",
              title: "Images",
              type: "array",
              of: [
                defineField({
                  name: "imageItem",
                  title: "Image",
                  type: "object",
                  fields: [
                    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
                    defineField({ name: "caption", title: "Caption", type: "string" }),
                  ],
                }),
              ],
            }),
            defineField({
              name: "documents",
              title: "Documents",
              type: "array",
              of: [
                defineField({
                  name: "documentItem",
                  title: "Document",
                  type: "object",
                  fields: [
                    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
                    defineField({ name: "file", title: "File", type: "file" }),
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
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "todos",
      title: "To Do List",
      description: "Tasks and action items for this room",
      type: "array",
      of: [
        defineField({
          name: "todoItem",
          title: "To Do Item",
          type: "object",
          fields: [
            defineField({ name: "text", title: "Task", type: "string", validation: (r) => r.required() }),
            defineField({ name: "completed", title: "Completed", type: "boolean", initialValue: false }),
          ],
          preview: {
            select: { title: "text", subtitle: "completed" },
            prepare({ title, subtitle }: { title?: string; subtitle?: boolean }) {
              return { title: `${subtitle ? "✓" : "○"} ${title ?? ""}` };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "materials",
      title: "Materials",
      description: "Materials, finishes and products selected for this room",
      type: "array",
      of: [
        defineField({
          name: "materialItem",
          title: "Material",
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "supplier", title: "Supplier", type: "string" }),
            defineField({ name: "finish", title: "Finish / Colour", type: "string" }),
            defineField({ name: "notes", title: "Notes", type: "text", rows: 2 }),
            defineField({ name: "url", title: "Product URL", type: "url" }),
          ],
          preview: {
            select: { title: "name", subtitle: "supplier" },
          },
        }),
      ],
    }),
    defineField({
      name: "links",
      title: "Product Links",
      description: "Links to products, suppliers or inspiration",
      type: "array",
      of: [
        defineField({
          name: "linkItem",
          title: "Link",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "url", title: "URL", type: "url", validation: (r) => r.required() }),
            defineField({ name: "supplier", title: "Supplier / Store", type: "string" }),
            defineField({ name: "price", title: "Price", type: "string" }),
            defineField({ name: "notes", title: "Notes", type: "string" }),
          ],
          preview: {
            select: { title: "title", subtitle: "supplier" },
          },
        }),
      ],
    }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title" } },
});
