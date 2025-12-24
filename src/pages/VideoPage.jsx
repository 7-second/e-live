import { useState, useEffect, useRef } from "react";
import ChannelList from "../components/ChannelList";
import ReactPlayer from "react-player";

const VideoPage = ({ playlist }) => {
  const [search, setSearch] = useState("");
  const [currentChannel, setCurrentChannel] = useState(null);
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);

  // Expand Telegram WebApp
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
    }
  }, []);

  // Scroll player into view on channel select
  useEffect(() => {
    if (currentChannel && playerContainerRef.current) {
      playerContainerRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentChannel]);

  // Fullscreen button fallback
  const handleFullScreen = () => {
    if (!playerRef.current) return;
    const elem = playerRef.current.getInternalPlayer();
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(() => {});
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  };

  return (
    <div className="p-2">
      {/* Search bar */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search channels..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
      </div>

      {/* Channel list */}
      <ChannelList
        playlist={playlist}
        search={search}
        onSelectChannel={(ch) => setCurrentChannel(ch)}
      />

      {/* Video player */}
      {currentChannel && (
        <div ref={playerContainerRef} className="p-4">
          <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] bg-black rounded">
            <ReactPlayer
              ref={playerRef}
              url={currentChannel.url}
              controls
              width="100%"
              height="100%"
            />
          </div>

          <button
            onClick={handleFullScreen}
            className="mt-2 p-2 bg-blue-500 text-white rounded w-full"
          >
            Fullscreen
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPage;
