import { useState, useRef } from "react";
import ChannelList from "../components/ChannelList";
import HLSPlayer from "../components/HLSPlayer";

const ChannelPage = ({ playlist }) => {
  const [activeChannel, setActiveChannel] = useState(null);

  // 👇 ref for video section
  const videoRef = useRef(null);

  const handleSelectChannel = (channel) => {
    setActiveChannel(channel);

    // 👇 scroll to video after state update
    setTimeout(() => {
      videoRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      
      {/* VIDEO SECTION */}
      <div
        ref={videoRef}
        className="sticky top-0 z-40 bg-black p-3"
      >
        {activeChannel ? (
          <>
            <h2 className="mb-2 text-lg font-bold">
              {activeChannel.name}
            </h2>

            <div className="aspect-video w-full">
              <HLSPlayer url={activeChannel.streamUrl} autoPlay />
            </div>
          </>
        ) : (
          <div className="text-center text-gray-400 py-10">
            Select a channel to play
          </div>
        )}
      </div>

      {/* CHANNEL LIST */}
      <ChannelList
        playlist={playlist}
        onSelectChannel={handleSelectChannel}
      />
    </div>
  );
};

export default ChannelPage;
