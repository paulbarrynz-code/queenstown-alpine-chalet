import { groq } from "next-sanity";

export const allRoomsQuery = groq`
  *[_type == "room"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "images": images[] {
      caption,
      "image": image
    },
    "documents": documents[] {
      title,
      category,
      "url": file.asset->url
    }
  }
`;

export const roomBySlugQuery = groq`
  *[_type == "room" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    "images": images[] {
      caption,
      "image": image
    },
    "documents": documents[] {
      title,
      category,
      "url": file.asset->url
    }
  }
`;

export const allRoomSlugsQuery = groq`
  *[_type == "room"] { "slug": slug.current }
`;
