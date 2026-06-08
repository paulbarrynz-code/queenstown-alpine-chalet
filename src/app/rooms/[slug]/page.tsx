import { notFound } from "next/navigation";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { roomBySlugQuery, allRoomsQuery, allRoomSlugsQuery } from "@/sanity/lib/queries";
import Gallery from "@/components/Gallery";
import DocumentList from "@/components/DocumentList";
import type { SanityRoom } from "@/types/sanity";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(allRoomSlugsQuery);
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room: SanityRoom = await client.fetch(roomBySlugQuery, { slug });
  if (!room) return {};
  return {
    title: `${room.title} — Queenstown Alpine Chalet`,
    description: room.description,
  };
}

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [room, allRooms]: [SanityRoom, SanityRoom[]] = await Promise.all([
    client.fetch(roomBySlugQuery, { slug }),
    client.fetch(allRoomsQuery),
  ]);

  if (!room) notFound();

  const currentIndex = allRooms.findIndex((r) => r.slug === slug);
  const prev = allRooms[currentIndex - 1];
  const next = allRooms[currentIndex + 1];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="text-xs tracking-widest uppercase mb-8" style={{ color: "var(--stone)" }}>
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-2">›</span>
        <span>{room.title}</span>
      </nav>

      {/* Room header */}
      <div className="mb-10 border-b pb-8" style={{ borderColor: "#ddd5c8" }}>
        <h1
          className="text-3xl md:text-4xl font-semibold mb-4"
          style={{ fontFamily: "Georgia, serif", color: "var(--bark)" }}
        >
          {room.title}
        </h1>
        {room.description && (
          <p className="max-w-2xl text-sm leading-relaxed" style={{ color: "var(--ash)" }}>
            {room.description}
          </p>
        )}
      </div>

      {/* Image gallery */}
      <Gallery images={room.images ?? []} />

      {/* Documents */}
      {room.documents && room.documents.length > 0 && (
        <div className="mt-12">
          <h2
            className="text-xs tracking-[0.25em] uppercase mb-5"
            style={{ color: "var(--stone)" }}
          >
            Documents & Plans
          </h2>
          <DocumentList documents={room.documents} />
        </div>
      )}

      {/* Prev / Next */}
      <div className="mt-14 pt-8 border-t flex justify-between" style={{ borderColor: "#ddd5c8" }}>
        {prev ? (
          <Link href={`/rooms/${prev.slug}`} className="text-sm hover:underline" style={{ color: "var(--pine)" }}>
            ← {prev.title}
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/rooms/${next.slug}`} className="text-sm hover:underline" style={{ color: "var(--pine)" }}>
            {next.title} →
          </Link>
        ) : <span />}
      </div>
    </div>
  );
}
