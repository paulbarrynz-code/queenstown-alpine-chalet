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

export type SanityTodo = {
  text: string;
  completed?: boolean;
};

export type SanityMaterial = {
  name: string;
  supplier?: string;
  finish?: string;
  notes?: string;
  url?: string;
};

export type SanityLink = {
  title: string;
  url: string;
  supplier?: string;
  price?: string;
  notes?: string;
};

export type SanityRoom = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  coverImage?: SanityImageSource;
  imageCount?: number;
  images?: SanityRoomImage[];
  documents?: SanityDocument[];
  sections?: SanitySection[];
  todos?: SanityTodo[];
  materials?: SanityMaterial[];
  links?: SanityLink[];
};
