import React from "react";

const filters = ["none", "noir", "fisheye", "rainbow", "glitch", "crosshatch"];

export default function FilterSelector({ currentFilter, setFilter }) {
  return (
    <div className="filter-selector">
      {filters.map((f) => (
        <button
          key={f}
          className={`filter-btn ${currentFilter === f ? "active" : ""}`}
          onClick={() => setFilter(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}
