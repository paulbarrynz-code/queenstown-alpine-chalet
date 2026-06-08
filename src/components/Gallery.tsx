"use client";

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SanityRoomImage } from "@/types/sanity";
import Lightbox from "./Lightbox";

export default function Gallery({ images }: { images: SanityRoomImage[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <div className="text-center py-20 text-sm tracking-widest uppercase" style={{ color: "var(--stone)" }}>
        Images coming soon
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300 focus:outline-none"
            style={{ backgroundColor: "var(--stone)" }}
            aria-label={img.caption ?? `Image ${i + 1}`}
          >
            <Image
              src={urlFor(img.image).width(800).height(600).fit("crop").url()}
              alt={img.caption ?? `Image ${i + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {img.caption && (
              <div
                className="absolute bottom-0 left-0 right-0 px-3 py-2 text-xs text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
              >
                {img.caption}
              </div>
            )}
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => Math.max(0, (i ?? 0) - 1))}
          onNext={() => setLightboxIndex((i) => Math.min(images.length - 1, (i ?? 0) + 1))}
        />
      )}
    </>
  );
}
