import React, { useRef, useEffect, useState } from "react";
import Hls from "hls.js";
import { FourSquare } from "react-loading-indicators";

const HLSPlayer = ({ url, autoPlay = false }) => {
  const videoRef = useRef();
  const hlsRef = useRef(null);
  const [levels, setLevels] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(-1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!url) return;

    setLoading(true);

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
      hlsRef.current = hls;

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setLevels(hls.levels);
        setCurrentLevel(hls.currentLevel); // initial auto
        setLoading(false);
        if (autoPlay) video.play();
      });

      hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
        setCurrentLevel(data.level);
      });

      hls.on(Hls.Events.ERROR, () => setLoading(false));

      return () => hls.destroy();
    } else {
      video.src = url;
      if (autoPlay) video.play();
      setLoading(false);
    }
  }, [url, autoPlay]);

  const handleQualityChange = (levelIndex) => {
    if (!hlsRef.current) return;

    if (levelIndex === -1) {
      // Auto
      hlsRef.current.currentLevel = -1;
    } else {
      hlsRef.current.currentLevel = levelIndex;
    }

    setCurrentLevel(levelIndex);
  };

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <FourSquare color="#32cd32" size="medium" text="" textColor="" />
        </div>
      )}

      <video
        ref={videoRef}
        controls
        className="w-full h-full rounded bg-black"
        preload="metadata"
        playsInline
        autoPlay={autoPlay}
      />

      {levels.length > 0 && (
        <div className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white p-2 rounded z-20">
          <select
            value={currentLevel}
            onChange={(e) => handleQualityChange(Number(e.target.value))}
            className="bg-gray-800 text-white p-1 rounded"
          >
            <option value={-1}>Auto</option>
            {levels.map((level, idx) => (
              <option key={idx} value={idx}>
                {level.height}p ({Math.round(level.bitrate / 1000)} kbps)
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default HLSPlayer;
