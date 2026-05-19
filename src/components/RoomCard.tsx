import Link from "next/link";
import Image from "next/image";
import type { Room } from "@/data/rooms";

const ROOM_ICONS: Record<string, string> = {
  lounge: "🪵",
  kitchen: "🍳",
  "master-bedroom": "🛏",
  rumpus: "🎱",
  "bedroom-3": "🛌",
  bathroom: "🛁",
  outdoor: "⛰",
};

export default function RoomCard({ room }: { room: Room }) {
  const firstImage = room.images[0];
  const icon = ROOM_ICONS[room.slug] ?? "📐";

  return (
    <Link
      href={`/rooms/${room.slug}`}
      className="group block overflow-hidden rounded-sm shadow-sm hover:shadow-lg transition-shadow duration-300"
      style={{ backgroundColor: "#fff" }}
    >
      {/* Image or placeholder */}
      <div
        className="relative w-full aspect-[4/3] overflow-hidden"
        style={{ backgroundColor: "var(--stone)" }}
      >
        {firstImage ? (
          <Image
            src={`/images/${room.slug}/${firstImage.src}`}
            alt={firstImage.caption ?? room.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-white opacity-60">
            <span className="text-4xl">{icon}</span>
            <span className="text-xs tracking-widest uppercase">Coming soon</span>
          </div>
        )}
      </div>

      {/* Label */}
      <div
        className="px-5 py-4 border-t"
        style={{ borderColor: "#e8e2da" }}
      >
        <h2
          className="text-base font-semibold tracking-wide"
          style={{ fontFamily: "Georgia, serif", color: "var(--bark)" }}
        >
          {room.title}
        </h2>
        <p className="mt-1 text-xs" style={{ color: "var(--stone)" }}>
          {room.images.length === 0
            ? "Images coming soon"
            : `${room.images.length} image${room.images.length !== 1 ? "s" : ""}`}
        </p>
      </div>
    </Link>
  );
}
