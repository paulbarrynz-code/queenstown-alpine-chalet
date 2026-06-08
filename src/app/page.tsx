import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { allRoomsQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import RoomCard from "@/components/RoomCard";
import type { SanityRoom } from "@/types/sanity";

export const revalidate = 60;

type SiteSettings = {
  heroImage?: unknown;
  heroOverlayOpacity?: number;
};

export default async function HomePage() {
  const [rooms, settings]: [SanityRoom[], SiteSettings] = await Promise.all([
    client.fetch(allRoomsQuery),
    client.fetch(siteSettingsQuery).catch(() => ({})),
  ]);

  const heroImageUrl = settings?.heroImage
    ? urlFor(settings.heroImage).width(1920).height(800).fit("crop").url()
    : null;

  const overlayOpacity = ((settings?.heroOverlayOpacity ?? 50) / 100).toFixed(2);

  return (
    <>
      {/* Hero */}
      <section className="relative py-28 px-6 text-center overflow-hidden" style={{ minHeight: "320px", backgroundColor: "var(--pine)" }}>
        {/* Background image */}
        {heroImageUrl && (
          <Image
            src={heroImageUrl}
            alt="Queenstown Alpine Chalet"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: `rgba(30, 45, 35, ${overlayOpacity})` }}
        />
        {/* Text */}
        <div className="relative z-10">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: heroImageUrl ? "#d4c9bb" : "var(--stone)" }}>
            Queenstown, New Zealand
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-4 text-white" style={{ fontFamily: "Georgia, serif" }}>
            Alpine Chalet
          </h1>
          <p className="max-w-xl mx-auto text-sm leading-relaxed" style={{ color: "#c8bfb5" }}>
            A curated collection of design concepts for our Queenstown renovation.
            Browse each space below to explore materials, finishes, and styling directions.
          </p>
        </div>
      </section>

      <div className="h-1" style={{ backgroundColor: "var(--bark)" }} />

      {/* Room grid */}
      <section className="px-6 py-14" style={{ backgroundColor: "#E8E3D8" }}>
        <div className="max-w-6xl mx-auto">
        <h2 className="text-xs tracking-[0.25em] uppercase mb-8" style={{ color: "var(--stone)" }}>
          Spaces
        </h2>
        {rooms.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--stone)" }}>
            No rooms added yet. Visit <a href="/studio" className="underline">/studio</a> to add content.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        )}
        </div>
      </section>
    </>
  );
}
