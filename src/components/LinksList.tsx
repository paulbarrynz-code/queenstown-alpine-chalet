import type { SanityLink } from "@/types/sanity";

export default function LinksList({ links }: { links: SanityLink[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {links.map((link, i) => (
        <a
          key={i}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-4 px-5 py-4 rounded-sm border hover:shadow-sm transition-shadow"
          style={{ borderColor: "#ddd5c8", backgroundColor: "#fff" }}
        >
          <span className="text-xl mt-0.5">🔗</span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium" style={{ color: "var(--bark)" }}>{link.title}</p>
            {link.supplier && <p className="text-xs mt-0.5" style={{ color: "var(--stone)" }}>{link.supplier}</p>}
            {link.price && <p className="text-xs mt-1 font-medium" style={{ color: "var(--pine)" }}>{link.price}</p>}
            {link.notes && <p className="text-xs mt-1" style={{ color: "var(--ash)" }}>{link.notes}</p>}
          </div>
          <span className="text-xs shrink-0 mt-1" style={{ color: "var(--stone)" }}>Visit →</span>
        </a>
      ))}
    </div>
  );
}
