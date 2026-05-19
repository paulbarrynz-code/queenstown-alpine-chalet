import { notFound } from "next/navigation";
import Link from "next/link";
import { rooms, getRoomBySlug } from "@/data/rooms";
import Gallery from "@/components/Gallery";

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) return {};
  return {
    title: `${room.title} — Queenstown Alpine Chalet`,
    description: room.description,
  };
}

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) notFound();

  const currentIndex = rooms.findIndex((r) => r.slug === slug);
  const prev = rooms[currentIndex - 1];
  const next = rooms[currentIndex + 1];

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
        <p className="max-w-2xl text-sm leading-relaxed" style={{ color: "var(--ash)" }}>
          {room.description}
        </p>
      </div>

      {/* Gallery */}
      <Gallery images={room.images} roomSlug={room.slug} />

      {/* Prev / Next navigation */}
      <div className="mt-14 pt-8 border-t flex justify-between" style={{ borderColor: "#ddd5c8" }}>
        {prev ? (
          <Link
            href={`/rooms/${prev.slug}`}
            className="text-sm hover:underline"
            style={{ color: "var(--pine)" }}
          >
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/rooms/${next.slug}`}
            className="text-sm hover:underline"
            style={{ color: "var(--pine)" }}
          >
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
