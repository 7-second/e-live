import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import ChannelList from "../components/ChannelList";
import HLSPlayer from "../components/HLSPlayer";

const ChannelPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate("/");
    return null;
  }

  const { channel, playlist } = state;
  const [activeChannel, setActiveChannel] = useState(channel);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* STICKY VIDEO */}
      <div className="sticky top-0 z-40 bg-gray-900 pb-3">
        <h2 className="text-xl font-bold mb-2 px-4">
          {activeChannel.name}
        </h2>

        <div className="w-full max-w-5xl mx-auto aspect-video rounded-lg overflow-hidden">
          <HLSPlayer url={activeChannel.streamUrl} autoPlay />
        </div>
      </div>

      {/* OTHER CHANNELS */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-3">
          Other Channels
        </h3>

        <ChannelList
          playlist={playlist}
          search=""
          onSelectChannel={setActiveChannel}
        />
      </div>
    </div>
  );
};

export default ChannelPage;
