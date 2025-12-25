import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ChannelList from "../components/ChannelList";
import { NAV_ITEMS } from "../config/navigation";
import Advertisment from "../components/Advertisment";

const Home = () => {
  const navigate = useNavigate();

  const [activeNav, setActiveNav] = useState(NAV_ITEMS[0]);
  const [search, setSearch] = useState("");

  // When user clicks a channel
  const handleChannelClick = (channel) => {
    navigate("/channel", {
      state: {
        channel,
        playlist: activeNav,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* NAVBAR - Fixed or Standard */}
      <Navbar
        activeId={activeNav.id}
        onSelect={(item) => {
          setActiveNav(item);
          setSearch("");
        }}
        onSearch={setSearch}
      />

      {/* ADVERTISEMENT - Full Width */}
      <div className="w-full">
        <Advertisment />
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        
        {/* CATEGORY TITLE - Responsive text size */}
        <div className="flex items-center justify-between pt-8 mb-6 border-b border-gray-800 pb-4">
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
            {activeNav.name}
          </h1>
          <div className="text-sm text-gray-400 font-medium bg-gray-800 px-3 py-1 rounded-full">
            {activeNav.id.toUpperCase()}
          </div>
        </div>

        {/* CHANNEL LIST - The Grid logic is inside this component */}
        <ChannelList
          playlist={activeNav}
          search={search}
          onSelectChannel={handleChannelClick}
        />
      </main>
    </div>
  );
};

export default Home;