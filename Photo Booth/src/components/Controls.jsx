import React from "react";

export default function Controls({ onCapture }) {
  return (
    <button className="capture-btn" onClick={onCapture}>
      📸 Capture
    </button>
  );
}
