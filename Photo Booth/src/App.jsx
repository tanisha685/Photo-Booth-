import React, { useState } from "react";
import WebcamFeed from "./components/WebcamFeed";
import FilterSelector from "./components/FilterSelector";
import PhotoStripBuilder from "./components/PhotoStripBuilder";
import "./App.css";

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [filter, setFilter] = useState("none");

  const addPhoto = (photo) => {
    if (photos.length < 3) {
      setPhotos([...photos, photo]);
    }
  };

  const resetPhotos = () => setPhotos([]);

  return (
    <div className="app-container">
      <h1 className="title">🎞️ Welcome to Tanisha's PhotoBooth</h1>
      {photos.length < 3 ? (
        <>
          <FilterSelector currentFilter={filter} setFilter={setFilter} />
          <WebcamFeed addPhoto={addPhoto} filter={filter} />
        </>
      ) : (
        <PhotoStripBuilder photos={photos} resetPhotos={resetPhotos} />
      )}
    </div>
  );
}
