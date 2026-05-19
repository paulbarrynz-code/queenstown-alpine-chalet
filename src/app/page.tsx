import { rooms } from "@/data/rooms";
import RoomCard from "@/components/RoomCard";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        className="py-20 px-6 text-center"
        style={{ backgroundColor: "var(--pine)", color: "var(--snow)" }}
      >
        <p
          className="text-xs tracking-[0.3em] uppercase mb-3"
          style={{ color: "var(--stone)" }}
        >
          Queenstown, New Zealand
        </p>
        <h1
          className="text-4xl md:text-5xl font-semibold leading-tight mb-4"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Alpine Chalet
        </h1>
        <p
          className="max-w-xl mx-auto text-sm leading-relaxed"
          style={{ color: "#c8bfb5" }}
        >
          A curated collection of design concepts for our Queenstown renovation.
          Browse each space below to explore materials, finishes, and styling directions.
        </p>
      </section>

      {/* Divider */}
      <div className="h-1" style={{ backgroundColor: "var(--bark)" }} />

      {/* Room grid */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2
          className="text-xs tracking-[0.25em] uppercase mb-8"
          style={{ color: "var(--stone)" }}
        >
          Spaces
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard key={room.slug} room={room} />
          ))}
        </div>
      </section>
    </>
  );
}
