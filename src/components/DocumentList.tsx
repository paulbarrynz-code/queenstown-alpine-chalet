import type { SanityDocument } from "@/types/sanity";

const CATEGORY_LABELS: Record<string, string> = {
  "floor-plan": "Floor Plan",
  "site-plan": "Site Plan",
  concept: "Concept",
  specification: "Specification",
  "mood-board": "Mood Board",
  other: "Other",
};

export default function DocumentList({ documents }: { documents: SanityDocument[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {documents.map((doc, i) => (
        <a
          key={i}
          href={doc.url ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 px-5 py-4 rounded-sm border hover:shadow-sm transition-shadow"
          style={{ borderColor: "#ddd5c8", backgroundColor: "#fff" }}
        >
          <span className="text-2xl">📄</span>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate" style={{ color: "var(--bark)" }}>
              {doc.title}
            </p>
            {doc.category && (
              <p className="text-xs mt-0.5" style={{ color: "var(--stone)" }}>
                {CATEGORY_LABELS[doc.category] ?? doc.category}
              </p>
            )}
          </div>
          <span className="ml-auto text-xs shrink-0" style={{ color: "var(--stone)" }}>
            Download ↓
          </span>
        </a>
      ))}
    </div>
  );
}
