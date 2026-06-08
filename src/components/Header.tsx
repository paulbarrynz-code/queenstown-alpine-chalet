"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import type { SanityRoom } from "@/types/sanity";

type NavGroup = { label: string; rooms: SanityRoom[] };
type NavItem = { type: "room"; room: SanityRoom } | { type: "group"; group: NavGroup };

function buildNav(rooms: SanityRoom[]): NavItem[] {
  const items: NavItem[] = [];
  const groups = new Map<string, SanityRoom[]>();

  for (const room of rooms) {
    if (room.navGroup) {
      if (!groups.has(room.navGroup)) groups.set(room.navGroup, []);
      groups.get(room.navGroup)!.push(room);
    } else {
      items.push({ type: "room", room });
    }
  }

  // Insert each group at the position of its first member in the original order
  const result: NavItem[] = [];
  const seenGroups = new Set<string>();
  for (const room of rooms) {
    if (room.navGroup) {
      if (!seenGroups.has(room.navGroup)) {
        seenGroups.add(room.navGroup);
        result.push({ type: "group", group: { label: room.navGroup, rooms: groups.get(room.navGroup)! } });
      }
    } else {
      result.push({ type: "room", room });
    }
  }
  return result;
}

function Dropdown({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 hover:opacity-70 transition-opacity text-sm tracking-wide"
        style={{ color: "var(--snow)" }}
      >
        {group.label}
        <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 12 12" fill="currentColor">
          <path d="M6 8L1 3h10z" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-2 min-w-[160px] rounded-sm shadow-lg py-1 z-50"
          style={{ backgroundColor: "var(--header)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          {group.rooms.map((room) => (
            <Link
              key={room.slug}
              href={`/rooms/${room.slug}`}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm hover:opacity-70 transition-opacity"
              style={{ color: "var(--snow)" }}
            >
              {room.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header({ rooms }: { rooms: SanityRoom[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = buildNav(rooms);

  return (
    <header style={{ backgroundColor: "var(--header)", color: "var(--snow)" }} className="sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-tight hover:opacity-80 transition-opacity">
          <span className="text-xs tracking-[0.25em] uppercase" style={{ color: "var(--stone)" }}>Queenstown</span>
          <span className="text-lg font-semibold tracking-wide" style={{ fontFamily: "Georgia, serif" }}>Alpine Chalet</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item, i) =>
            item.type === "room" ? (
              <Link key={i} href={`/rooms/${item.room.slug}`} className="text-sm tracking-wide hover:opacity-70 transition-opacity" style={{ color: "var(--snow)" }}>
                {item.room.title}
              </Link>
            ) : (
              <Dropdown key={i} group={item.group} />
            )
          )}
        </nav>

        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-1" onClick={() => setMobileOpen((o) => !o)} aria-label="Toggle menu">
          <span className="block w-6 h-0.5 bg-current" />
          <span className="block w-6 h-0.5 bg-current" />
          <span className="block w-6 h-0.5 bg-current" />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t px-6 py-4 flex flex-col gap-3 text-sm" style={{ borderColor: "#1e2e2e", backgroundColor: "#1e2e2e" }}>
          {navItems.map((item, i) =>
            item.type === "room" ? (
              <Link key={i} href={`/rooms/${item.room.slug}`} onClick={() => setMobileOpen(false)} className="hover:opacity-70 transition-opacity" style={{ color: "var(--snow)" }}>
                {item.room.title}
              </Link>
            ) : (
              <div key={i}>
                <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "var(--stone)" }}>{item.group.label}</p>
                {item.group.rooms.map((room) => (
                  <Link key={room.slug} href={`/rooms/${room.slug}`} onClick={() => setMobileOpen(false)} className="block pl-3 py-1 hover:opacity-70 transition-opacity" style={{ color: "var(--snow)" }}>
                    {room.title}
                  </Link>
                ))}
              </div>
            )
          )}
        </nav>
      )}
    </header>
  );
}
