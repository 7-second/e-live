import { useState } from "react";
import { NAV_ITEMS } from "../config/navigation";
import { FiSearch } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom"; // Added useLocation
import { MdSportsSoccer } from "react-icons/md"; // Optional: adding a sports icon

const Navbar = ({ activeId, onSelect, onSearch }) => {
  const [query, setQuery] = useState("");
  const location = useLocation(); // To check if we are on the sports page

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-2xl">
      {/* Main Top bar */}
      <div className="flex items-center justify-between px-4 py-3 gap-2">
        
        {/* 1. Logo */}
        <Link to="/" className="text-xl font-black flex items-center flex-shrink-0">
          <span className="text-blue-500">E</span>
          <span className="text-red-600 ml-0.5">-LIVE</span>
        </Link>

        {/* 2. ADVERTISEMENT SCROLLING TEXT */}
        <div className="hidden sm:flex flex-1 overflow-hidden bg-red-600/10 border border-red-600/20 rounded-full py-1.5 mx-2 relative">
          <div className="whitespace-nowrap flex animate-marquee">
            <span className="text-[10px] font-black text-red-500 uppercase tracking-widest px-8">
              For advertisement contact us on @telegramuser — For advertisement contact us on @telegramuser — 
            </span>
            <span className="text-[10px] font-black text-red-500 uppercase tracking-widest px-8">
              For advertisement contact us on @telegramuser — For advertisement contact us on @telegramuser — 
            </span>
          </div>
        </div>

        {/* 3. Search Bar */}
        <div className="relative w-32 xs:w-40 sm:w-56 md:w-64 flex-shrink-0">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search..."
            className="w-full bg-gray-900/50 border border-gray-800 rounded-full
                       pl-9 pr-4 py-1.5 text-xs md:text-sm
                       focus:outline-none focus:border-blue-500 focus:bg-gray-900 transition-all"
          />
        </div>
      </div>

      {/* MOBILE ADVERTISEMENT */}
      <div className="sm:hidden w-full overflow-hidden bg-red-600/10 border-y border-red-600/10 py-1 mb-2">
        <div className="whitespace-nowrap flex animate-marquee-fast">
          <span className="text-[9px] font-bold text-red-500 uppercase tracking-wider px-4">
             Contact for Ads: @telegramuser — Contact for Ads: @telegramuser — 
          </span>
        </div>
      </div>

      {/* Nav items (Categories + NEW SPORTS LINK) */}
      <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide no-scrollbar items-center">
        
        {/* NEW SPORT NAVIGATION BUTTON */}
        {/* <Link
          to="/sports"
          className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all uppercase tracking-tighter
            ${
              /
                ? "bg-green-600 text-white shadow-[0_0_15px_rgba(22,163,74,0.4)]"
                : "bg-gray-800/60 hover:bg-gray-700 text-gray-400 hover:text-white"
            }
          `}
        >
          <MdSportsSoccer size={14} />
          Sports
        </Link> */}

        {/* Divider line between Sports and Categories */}
        <div className="w-[1px] h-4 bg-gray-700 mx-1 flex-shrink-0" />

        {/* Your existing Dynamic Categories */}
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className={`relative px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all uppercase tracking-tighter
              ${
                activeId === item.id && location.pathname !== "/sports"
                  ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                  : "bg-gray-800/60 hover:bg-gray-700 text-gray-400 hover:text-white"
              }
            `}
          >
            {item.name}
          </button>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 20s linear infinite; }
        .animate-marquee-fast { animation: marquee 12s linear infinite; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </nav>
  );
};

export default Navbar;