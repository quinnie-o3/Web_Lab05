import { memo, useCallback, useMemo, useState } from "react";

const THEME = {
  light: {
    background: "#f5f5f5",
    color: "#1f1f1f",
  },
  dark: {
    background: "#1f1f1f",
    color: "#f5f5f5",
  },
};

const generateItems = () =>
  Array.from({ length: 10000 }, (_, idx) => ({
    id: idx + 1,
    label: `Item ${idx + 1}`,
    value: Math.floor(Math.random() * 100000),
  }));

const baseItems = generateItems();

const ListItem = memo(function ListItem({ item, onDelete }) {
  console.log(`Render ListItem ${item.id}`);

  return (
    <li
      style={{
        padding: "6px 10px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span>
        {item.label} — {item.value}
      </span>
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </li>
  );
});

function LargeList({ items, theme, onDelete }) {
  const sortedItems = useMemo(
    () => [...items].sort((a, b) => a.value - b.value),
    [items]
  );

  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: "12px 0 0",
        maxHeight: "300px",
        overflowY: "auto",
        background: theme.background,
        borderRadius: "8px",
        color: theme.color,
      }}
    >
      {sortedItems.map((item) => (
        <ListItem key={item.id} item={item} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default function Dashboard() {
  const [themeName, setThemeName] = useState("dark");
  const [items, setItems] = useState(baseItems);
  const theme = THEME[themeName];
  const handleDelete = useCallback(
    (id) => setItems((prev) => prev.filter((item) => item.id !== id)),
    []
  );

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <h3 style={{ margin: 0 }}>Laggy List (optimized)</h3>
        <button
          onClick={() =>
            setThemeName((prev) => (prev === "dark" ? "light" : "dark"))
          }
        >
          Toggle Theme: {themeName === "dark" ? "🌙" : "☀️"}
        </button>
      </div>
      <p style={{ color: "#aaa", margin: "6px 0 12px" }}>
        Sorting is memoized and list items are memoized to avoid re-renders on
        theme changes.
      </p>
      <LargeList items={items} theme={theme} onDelete={handleDelete} />
    </div>
  );
}
