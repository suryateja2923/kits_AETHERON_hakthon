import { useEffect, useRef } from "react";

export default function Avatar3D({ speaking }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (speaking) {
      // Ensure smooth looping during long speech
      if (video.paused) {
        video.play().catch(() => {});
      }
    } else {
      video.pause();
    }
  }, [speaking]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "black",
        overflow: "hidden",
      }}
    >
      <video
        ref={videoRef}
        src="/interview1.mp4"
        muted
        loop
        playsInline
        preload="auto"
        style={{
          width: "100vw",
          height: "100vh",
          objectFit: "fill",
        }}
      />
    </div>
  );
}