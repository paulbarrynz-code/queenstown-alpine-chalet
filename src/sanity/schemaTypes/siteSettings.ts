import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "heroImage",
      title: "Landing Page Hero Image",
      type: "image",
      description: "Full-width background image on the home page",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroOverlayOpacity",
      title: "Hero Overlay Darkness",
      type: "number",
      description: "How dark the overlay is over the hero image (0 = none, 80 = very dark). Default 50.",
      validation: (r) => r.min(0).max(80),
      initialValue: 50,
    }),
  ],
  preview: { select: { title: "heroImage" }, prepare: () => ({ title: "Site Settings" }) },
});
