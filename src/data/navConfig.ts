// Two-level nav config. Edit this file to change the navigation structure.
// Use the slug of each Sanity room. Groups become dropdowns.
// Rooms not listed here will appear after these items in their Sanity display order.

export type NavConfigRoom = { type: "room"; slug: string };
export type NavConfigGroup = { type: "group"; label: string; items: NavConfigRoom[] };
export type NavConfigItem = NavConfigRoom | NavConfigGroup;

export const navConfig: NavConfigItem[] = [
  {
    type: "group",
    label: "Indoor",
    items: [
      { type: "room", slug: "lounge" },
      { type: "room", slug: "bathroom" },
      { type: "room", slug: "rumpus" },
      { type: "room", slug: "bedroom-3" },
      { type: "room", slug: "kitchen" },
      { type: "room", slug: "master-bedroom" },
    ],
  },
  {
    type: "group",
    label: "Design Artefacts",
    items: [
      { type: "room", slug: "architect" },
      { type: "room", slug: "surveyor" },
      { type: "room", slug: "planner" },
      { type: "room", slug: "council" },
      { type: "room", slug: "joinery" },
    ],
  },
  {
    type: "group",
    label: "Outdoor",
    items: [
      { type: "room", slug: "outdoor" },
      { type: "room", slug: "stairs" },
    ],
  },
];
