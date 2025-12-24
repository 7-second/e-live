import { useState } from "react";
import Navbar from "../components/Navbar";
import ChannelList from "../components/ChannelList";
import HLSPlayer from "../components/HLSPlayer";
import { NAV_ITEMS } from "../config/navigation";
import { FiX } from "react-icons/fi";

const Home = () => {
  const [activeNav, setActiveNav] = useState(NAV_ITEMS[0]);
  const [search, setSearch] = useState("");
  const [activeChannel, setActiveChannel] = useState(null);

  const closePlayer = () => setActiveChannel(null);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar
        activeId={activeNav.id}
        onSelect={(item) => {
          setActiveNav(item);
          setSearch("");
        }}
        onSearch={setSearch}
      />

      <h1 className="px-4 pt-4 text-xl font-bold">
        {activeNav.name}
      </h1>

      <ChannelList
        playlist={activeNav}
        search={search}
        onSelectChannel={setActiveChannel}
      />
      

      {/* FULLSCREEN PLAYER */}
      {activeChannel && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex flex-col items-center justify-center p-4">
          <button
            onClick={closePlayer}
            className="absolute top-4 right-4 bg-gray-800 p-2 rounded-full hover:bg-gray-700"
          >
            <FiX size={22} />
          </button>

          <h2 className="mb-4 text-lg font-bold text-center">
            {activeChannel.name}
          </h2>

          <div className="w-full max-w-4xl aspect-video">
            <HLSPlayer url={activeChannel.streamUrl} autoPlay />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
