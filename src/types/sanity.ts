// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

export type SanityRoomImage = {
  image: SanityImageSource;
  caption?: string;
};

export type SanityDocument = {
  title: string;
  category?: string;
  url?: string;
};

export type SanitySection = {
  title: string;
  description?: string;
  images?: SanityRoomImage[];
  documents?: SanityDocument[];
};

export type SanityRoom = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  coverImage?: SanityImageSource;
  imageCount?: number;
  sections?: SanitySection[];
};
