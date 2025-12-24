import { useState, useEffect, useRef } from "react";
import ChannelList from "../components/ChannelList";
import ReactPlayer from "react-player";

const VideoPage = ({ playlist }) => {
  const [search, setSearch] = useState("");
  const [currentChannel, setCurrentChannel] = useState(null);
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);

  // Expand Telegram WebApp container
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
    }
  }, []);

  // Scroll player into view when a channel is selected
  useEffect(() => {
    if (currentChannel && playerContainerRef.current) {
      playerContainerRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentChannel]);

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

          {/* Telegram mobile workaround */}
          <p className="text-gray-300 text-sm mt-2 mb-1">
            Telegram blocks fullscreen in-app. Tap below to open in your phone's video player:
          </p>
          <a
            href={currentChannel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-blue-500 text-white rounded p-2"
          >
            Open in device video player
          </a>
        </div>
      )}
    </div>
  );
};

export default VideoPage;
