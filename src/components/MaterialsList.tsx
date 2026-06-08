import type { SanityMaterial } from "@/types/sanity";

export default function MaterialsList({ materials }: { materials: SanityMaterial[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {materials.map((m, i) => (
        <div key={i} className="px-5 py-4 rounded-sm border text-sm" style={{ borderColor: "#ddd5c8", backgroundColor: "#fff" }}>
          <p className="font-medium" style={{ color: "var(--bark)" }}>{m.name}</p>
          {m.supplier && <p className="mt-1 text-xs" style={{ color: "var(--stone)" }}>{m.supplier}</p>}
          {m.finish && <p className="mt-1 text-xs" style={{ color: "var(--stone)" }}>Finish: {m.finish}</p>}
          {m.notes && <p className="mt-2 text-xs leading-relaxed" style={{ color: "var(--ash)" }}>{m.notes}</p>}
          {m.url && (
            <a href={m.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs underline" style={{ color: "var(--pine)" }}>
              View product →
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
