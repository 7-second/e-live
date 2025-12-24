import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ChannelList from "../components/ChannelList";
import { NAV_ITEMS } from "../config/navigation";

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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* NAVBAR */}
      <Navbar
        activeId={activeNav.id}
        onSelect={(item) => {
          setActiveNav(item);
          setSearch("");
        }}
        onSearch={setSearch}
      />

      {/* CATEGORY TITLE */}
      <h1 className="px-4 pt-4 text-xl font-bold">
        {activeNav.name}
      </h1>

      {/* CHANNEL LIST */}
      <ChannelList
        playlist={activeNav}
        search={search}
        onSelectChannel={handleChannelClick}
      />
    </div>
  );
};

export default Home;
