import type { SanityTodo } from "@/types/sanity";

export default function TodoList({ todos }: { todos: SanityTodo[] }) {
  const done = todos.filter((t) => t.completed).length;

  return (
    <div>
      <p className="text-xs mb-4" style={{ color: "var(--stone)" }}>
        {done} of {todos.length} completed
      </p>
      <ul className="space-y-2">
        {todos.map((todo, i) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <span
              className="mt-0.5 shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs"
              style={{
                borderColor: todo.completed ? "var(--pine)" : "var(--stone)",
                backgroundColor: todo.completed ? "var(--pine)" : "transparent",
                color: "#fff",
              }}
            >
              {todo.completed ? "✓" : ""}
            </span>
            <span style={{ color: todo.completed ? "var(--stone)" : "var(--charcoal)", textDecoration: todo.completed ? "line-through" : "none" }}>
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
