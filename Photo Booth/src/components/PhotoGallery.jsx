import React from "react";

export default function PhotoGallery({ photos, downloadPhoto }) {
  if (photos.length === 0) return null;

  return (
    <div className="gallery">
      {photos.map((photo, index) => (
        <div className="photo-item" key={index}>
          <img src={photo} alt={`Captured ${index}`} className="photo" />
          <button
            onClick={() => downloadPhoto(photo, index)}
            className="download-btn"
          >
            Download
          </button>
        </div>
      ))}
    </div>
  );
}
