export type RoomImage = {
  src: string;
  caption?: string;
};

export type Room = {
  slug: string;
  title: string;
  description: string;
  images: RoomImage[];
};

// ─────────────────────────────────────────────
// HOW TO ADD IMAGES
// 1. Drop your image file into  public/images/<room-slug>/
// 2. Add an entry to the images array below:
//    { src: "your-filename.jpg", caption: "Optional label" }
// ─────────────────────────────────────────────

export const rooms: Room[] = [
  {
    slug: "lounge",
    title: "Lounge",
    description:
      "The lounge is the heart of the chalet — a warm, inviting space anchored by a feature fireplace, rich timber accents, and generous seating that encourages gathering après-ski.",
    images: [
      // { src: "concept-1.jpg", caption: "Fireplace feature wall" },
    ],
  },
  {
    slug: "kitchen",
    title: "Kitchen",
    description:
      "A functional yet beautiful alpine kitchen combining stone benchtops, timber cabinetry, and high-end appliances. Designed for entertaining with a seamless connection to the dining area.",
    images: [
      // { src: "concept-1.jpg", caption: "Benchtop selection" },
    ],
  },
  {
    slug: "master-bedroom",
    title: "Master Bedroom",
    description:
      "A serene retreat with mountain views, layered textures, and a neutral palette of charcoal, stone, and warm linen. The master suite includes a walk-in wardrobe and ensuite.",
    images: [
      // { src: "concept-1.jpg", caption: "Bed head feature" },
    ],
  },
  {
    slug: "rumpus",
    title: "Rumpus",
    description:
      "A versatile lower-level space designed for relaxation and entertainment. Includes a bar area, comfortable lounge seating, and media setup — perfect for guests and family.",
    images: [
      // { src: "concept-1.jpg", caption: "Bar area concept" },
    ],
  },
  {
    slug: "bedroom-3",
    title: "Bedroom 3",
    description:
      "A cosy twin or queen guest room with alpine charm — tongue-and-groove panelling, wool throws, and considered lighting to create a warm mountain lodge atmosphere.",
    images: [
      // { src: "concept-1.jpg", caption: "Panelling detail" },
    ],
  },
  {
    slug: "bathroom",
    title: "Bathroom",
    description:
      "Clean lines meet natural materials in the main bathroom. Featuring a freestanding bath or deep soaker, stone-look tiles, brushed brass fixtures, and warm timber vanity.",
    images: [
      // { src: "concept-1.jpg", caption: "Tile selection" },
    ],
  },
  {
    slug: "outdoor",
    title: "Outdoor Area",
    description:
      "An all-season outdoor living space with a covered deck, built-in BBQ, fire pit, and direct access to the alpine landscape. Designed to maximise the Queenstown setting year-round.",
    images: [
      // { src: "concept-1.jpg", caption: "Deck concept" },
    ],
  },
];

export function getRoomBySlug(slug: string): Room | undefined {
  return rooms.find((r) => r.slug === slug);
}
