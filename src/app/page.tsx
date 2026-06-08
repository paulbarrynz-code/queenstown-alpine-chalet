import { client } from "@/sanity/lib/client";
import { allRoomsQuery } from "@/sanity/lib/queries";
import RoomCard from "@/components/RoomCard";
import type { SanityRoom } from "@/types/sanity";

export const revalidate = 60;

export default async function HomePage() {
  const rooms: SanityRoom[] = await client.fetch(allRoomsQuery);

  return (
    <>
      {/* Hero */}
      <section
        className="py-20 px-6 text-center"
        style={{ backgroundColor: "var(--pine)", color: "var(--snow)" }}
      >
        <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--stone)" }}>
          Queenstown, New Zealand
        </p>
        <h1
          className="text-4xl md:text-5xl font-semibold leading-tight mb-4"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Alpine Chalet
        </h1>
        <p className="max-w-xl mx-auto text-sm leading-relaxed" style={{ color: "#c8bfb5" }}>
          A curated collection of design concepts for our Queenstown renovation.
          Browse each space below to explore materials, finishes, and styling directions.
        </p>
      </section>

      <div className="h-1" style={{ backgroundColor: "var(--bark)" }} />

      {/* Room grid */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-xs tracking-[0.25em] uppercase mb-8" style={{ color: "var(--stone)" }}>
          Spaces
        </h2>
        {rooms.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--stone)" }}>
            No rooms added yet. Visit{" "}
            <a href="/studio" className="underline">
              /studio
            </a>{" "}
            to add content.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
