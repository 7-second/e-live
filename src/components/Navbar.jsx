import { useState } from "react";
import { NAV_ITEMS } from "../config/navigation";
import { FiSearch } from "react-icons/fi";

const Navbar = ({ activeId, onSelect, onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <nav className="bg-black text-white sticky top-0 z-50">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="text-xl font-bold flex items-center">
          <span className="text-blue-500">E</span>
          <span className="text-red-600 ml-1">-Live</span>
        </div>

        {/* Search */}
        <div className="relative w-40 sm:w-64">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search channels..."
            className="w-full bg-gray-900 border border-gray-700 rounded-full
                       pl-9 pr-4 py-2 text-sm
                       focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Nav items */}
      <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className={`relative px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition
              ${
                activeId === item.id
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-gray-800 hover:bg-gray-700"
              }
            `}
          >
            {item.name}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
