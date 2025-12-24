import { useState, useEffect, useRef } from "react";
import ChannelList from "../components/ChannelList";
import ReactPlayer from "react-player";

const VideoPage = ({ playlist }) => {
  const [search, setSearch] = useState("");
  const [currentChannel, setCurrentChannel] = useState(null);
  const playerRef = useRef(null);

  // Expand Telegram WebApp
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
    }
  }, []);

  // Auto fullscreen on channel select (desktop & supported mobile)
  useEffect(() => {
    if (!currentChannel || !playerRef.current) return;

    const elem = playerRef.current.getInternalPlayer();
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(() => {});
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }, [currentChannel]);

  // Fullscreen button fallback
  const handleFullScreen = () => {
    if (!playerRef.current) return;
    const elem = playerRef.current.getInternalPlayer();
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
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
        <div className="p-4">
          <div className="relative w-full h-60 sm:h-96 md:h-[500px] lg:h-[600px] bg-black rounded">
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
