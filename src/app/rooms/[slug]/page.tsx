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

      {/* Sections */}
      {room.sections && room.sections.length > 0 ? (
        <div className="space-y-16">
          {room.sections.map((section, i) => (
            <section key={i}>
              <div className="mb-6">
                <h2
                  className="text-xl font-semibold"
                  style={{ fontFamily: "Georgia, serif", color: "var(--bark)" }}
                >
                  {section.title}
                </h2>
                {section.description && (
                  <p className="mt-2 text-sm leading-relaxed max-w-2xl" style={{ color: "var(--ash)" }}>
                    {section.description}
                  </p>
                )}
              </div>

              {section.images && section.images.length > 0 && (
                <Gallery images={section.images} />
              )}

              {section.documents && section.documents.length > 0 && (
                <div className="mt-6">
                  <DocumentList documents={section.documents} />
                </div>
              )}
            </section>
          ))}
        </div>
      ) : (
        <p className="text-sm py-10 text-center" style={{ color: "var(--stone)" }}>
          No content added yet.
        </p>
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
