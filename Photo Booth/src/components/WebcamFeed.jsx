// components/WebcamFeed.jsx
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import Controls from "./Controls";

export default function WebcamFeed({ addPhoto, filter }) {
  const webcamRef = useRef(null);
  const [countdown, setCountdown] = useState(null);
  const [message, setMessage] = useState("");

  const startCountdownAndCapture = () => {
    let counter = 3;
    setMessage(""); // reset
    setCountdown(counter);

    const countdownInterval = setInterval(() => {
      counter--;
      if (counter > 0) {
        setCountdown(counter);
      } else {
        clearInterval(countdownInterval);
        setCountdown(null);
        capturePhoto();
      }
    }, 1000);
  };

  const capturePhoto = () => {
    const video = webcamRef.current?.video;
    if (!video) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    switch (filter) {
      case "noir":
        ctx.filter = "grayscale(1) contrast(1.2)";
        break;
      case "fisheye":
        ctx.filter = "contrast(1.5) saturate(1.8)";
        break;
      case "rainbow":
        ctx.filter = "hue-rotate(140deg) saturate(1.5)";
        break;
      case "glitch":
        ctx.filter = "contrast(2) hue-rotate(90deg)";
        break;
      case "crosshatch":
        ctx.filter = "grayscale(1) brightness(1.5)";
        break;
      default:
        ctx.filter = "none";
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/png");
    addPhoto(imageData);

    // Optional delay before next shot message
    setTimeout(() => {
      setMessage("Get ready for the next shot!");
      setTimeout(() => setMessage(""), 1500);
    }, 500);
  };

  return (
    <div className="webcam-container">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        mirrored={true}
        videoConstraints={{ facingMode: "user" }}
        className={`webcam-view ${filter}`}
      />
      <Controls onCapture={startCountdownAndCapture} />

      {countdown && (
        <div className="countdown-overlay">
          <span>{countdown}</span>
        </div>
      )}

      {message && (
        <div className="message-overlay">
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}
