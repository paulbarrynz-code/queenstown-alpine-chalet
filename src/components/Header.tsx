"use client";

import Link from "next/link";
import { useState } from "react";
import type { SanityRoom } from "@/types/sanity";

export default function Header({ rooms }: { rooms: SanityRoom[] }) {
  const [open, setOpen] = useState(false);

  return (
    <header style={{ backgroundColor: "var(--header)", color: "var(--snow)" }} className="sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-tight hover:opacity-80 transition-opacity">
          <span className="text-xs tracking-[0.25em] uppercase" style={{ color: "var(--stone)" }}>Queenstown</span>
          <span className="text-lg font-semibold tracking-wide" style={{ fontFamily: "Georgia, serif" }}>Alpine Chalet</span>
        </Link>

        <nav className="hidden md:flex gap-6 text-sm tracking-wide">
          {rooms.map((room) => (
            <Link key={room.slug} href={`/rooms/${room.slug}`} className="hover:opacity-70 transition-opacity" style={{ color: "var(--snow)" }}>
              {room.title}
            </Link>
          ))}
        </nav>

        <button className="md:hidden flex flex-col gap-1.5 p-1" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          <span className="block w-6 h-0.5 bg-current" />
          <span className="block w-6 h-0.5 bg-current" />
          <span className="block w-6 h-0.5 bg-current" />
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t px-6 py-4 flex flex-col gap-3 text-sm" style={{ borderColor: "#1e2e2e", backgroundColor: "#1e2e2e" }}>
          {rooms.map((room) => (
            <Link key={room.slug} href={`/rooms/${room.slug}`} onClick={() => setOpen(false)} className="hover:opacity-70 transition-opacity" style={{ color: "var(--snow)" }}>
              {room.title}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
