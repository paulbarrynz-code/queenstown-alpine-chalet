import { groq } from "next-sanity";

export const allRoomsQuery = groq`
  *[_type == "room"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "coverImage": coalesce(images[0].image, sections[0].images[0].image),
    "imageCount": count(images[]) + count(sections[].images[]),
    "images": images[] { caption, "image": image },
    "documents": documents[] { title, category, "url": file.asset->url },
    "sections": sections[] {
      title,
      description,
      "images": images[] { caption, "image": image },
      "documents": documents[] { title, category, "url": file.asset->url }
    }
  }
`;

export const roomBySlugQuery = groq`
  *[_type == "room" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    "images": images[] { caption, "image": image },
    "documents": documents[] { title, category, "url": file.asset->url },
    "sections": sections[] {
      title,
      description,
      "images": images[] { caption, "image": image },
      "documents": documents[] { title, category, "url": file.asset->url }
    },
    "todos": todos[] { text, completed },
    "materials": materials[] { name, supplier, finish, notes, url },
    "links": links[] { title, url, supplier, price, notes }
  }
`;

export const allRoomSlugsQuery = groq`
  *[_type == "room"] { "slug": slug.current }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    "heroImage": heroImage,
    heroOverlayOpacity
  }
`;
