import React, { useEffect, useRef } from "react";

export default function PhotoStripBuilder({ photos, resetPhotos }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const imgWidth = 300;
    const imgHeight = 200;

    canvas.width = imgWidth;
    canvas.height = imgHeight * 3;

    photos.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        ctx.drawImage(img, 0, i * imgHeight, imgWidth, imgHeight);
      };
    });
  }, [photos]);

  const downloadStrip = () => {
    const link = document.createElement("a");
    link.download = `dvBooth-strip-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  return (
    <div className="strip-container">
      <canvas ref={canvasRef} className="photo-strip" />
      <p className="date-label">Taken on • {new Date().toLocaleDateString()}</p>
      <div className="strip-actions">
        <button onClick={resetPhotos} className="reshoot-btn">
          🔄 Reshoot
        </button>
        <button onClick={downloadStrip} className="download-btn">
          ⬇️ Download Strip
        </button>
      </div>
    </div>
  );
}
