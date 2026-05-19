"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import type { RoomImage } from "@/data/rooms";

type Props = {
  images: RoomImage[];
  roomSlug: string;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Lightbox({ images, roomSlug, index, onClose, onPrev, onNext }: Props) {
  const image = images[index];

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
      onClick={onClose}
    >
      {/* Prev */}
      {index > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl px-4 py-2 hover:opacity-60 transition-opacity"
          aria-label="Previous image"
        >
          ‹
        </button>
      )}

      {/* Image */}
      <div
        className="relative max-w-5xl max-h-[85vh] w-full mx-16"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-[80vh]">
          <Image
            src={`/images/${roomSlug}/${image.src}`}
            alt={image.caption ?? ""}
            fill
            className="object-contain"
            sizes="100vw"
          />
        </div>
        {image.caption && (
          <p className="text-center text-sm mt-3 tracking-wide" style={{ color: "var(--stone)" }}>
            {image.caption}
          </p>
        )}
        <p className="text-center text-xs mt-1 opacity-40 text-white">
          {index + 1} / {images.length}
        </p>
      </div>

      {/* Next */}
      {index < images.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl px-4 py-2 hover:opacity-60 transition-opacity"
          aria-label="Next image"
        >
          ›
        </button>
      )}

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-5 text-white text-3xl hover:opacity-60 transition-opacity"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
}
