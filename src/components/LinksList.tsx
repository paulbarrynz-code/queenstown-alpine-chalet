import Image from "next/image";
import type { SanityLink } from "@/types/sanity";
import { fetchOgImage } from "@/lib/og";

export default async function LinksList({ links }: { links: SanityLink[] }) {
  const thumbnails = await Promise.all(links.map((l) => fetchOgImage(l.url)));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {links.map((link, i) => {
        const thumb = thumbnails[i];
        return (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block overflow-hidden rounded-sm border hover:shadow-md transition-shadow"
            style={{ borderColor: "#ddd5c8", backgroundColor: "#fff" }}
          >
            {/* Thumbnail */}
            {thumb ? (
              <div className="relative w-full aspect-[16/9] overflow-hidden" style={{ backgroundColor: "#e8e2da" }}>
                <Image
                  src={thumb}
                  alt={link.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  unoptimized
                />
              </div>
            ) : (
              <div
                className="w-full aspect-[16/9] flex items-center justify-center text-3xl"
                style={{ backgroundColor: "#e8e2da" }}
              >
                🔗
              </div>
            )}

            {/* Info */}
            <div className="px-4 py-3">
              <p className="text-sm font-medium leading-snug" style={{ color: "var(--bark)" }}>
                {link.title}
              </p>
              {link.supplier && (
                <p className="text-xs mt-0.5" style={{ color: "var(--stone)" }}>{link.supplier}</p>
              )}
              {link.price && (
                <p className="text-xs mt-1 font-semibold" style={{ color: "var(--pine)" }}>{link.price}</p>
              )}
              {link.notes && (
                <p className="text-xs mt-1" style={{ color: "var(--ash)" }}>{link.notes}</p>
              )}
              <p className="text-xs mt-2" style={{ color: "var(--stone)" }}>Visit →</p>
            </div>
          </a>
        );
      })}
    </div>
  );
}
