import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SanityRoom } from "@/types/sanity";

export default function RoomCard({ room }: { room: SanityRoom }) {
  const imageCount = room.imageCount ?? 0;

  return (
    <Link
      href={`/rooms/${room.slug}`}
      className="group block overflow-hidden rounded-sm shadow-sm hover:shadow-lg transition-shadow duration-300"
      style={{ backgroundColor: "#fff" }}
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden" style={{ backgroundColor: "var(--stone)" }}>
        {room.coverImage ? (
          <Image
            src={urlFor(room.coverImage).width(800).height(600).fit("crop").url()}
            alt={room.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white opacity-60">
            <span className="text-xs tracking-widest uppercase">Coming soon</span>
          </div>
        )}
      </div>
      <div className="px-5 py-4 border-t" style={{ borderColor: "#e8e2da" }}>
        <h2 className="text-base font-semibold tracking-wide" style={{ fontFamily: "Georgia, serif", color: "var(--bark)" }}>
          {room.title}
        </h2>
        <p className="mt-1 text-xs" style={{ color: "var(--stone)" }}>
          {imageCount === 0 ? "Images coming soon" : `${imageCount} image${imageCount !== 1 ? "s" : ""}`}
        </p>
      </div>
    </Link>
  );
}
