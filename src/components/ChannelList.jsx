import { useEffect, useState, useMemo } from "react";
import { fetchChannels } from "../services/tvService";
import { FourSquare } from "react-loading-indicators";

const ITEMS_PER_PAGE = 40;

const ChannelList = ({ playlist, search, onSelectChannel }) => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // 1. Fetch Channels
  useEffect(() => {
    if (!playlist?.url) return;
    setLoading(true);
    setPage(1);
    fetchChannels(playlist.url)
      .then(setChannels)
      .catch((err) => console.error("Error:", err))
      .finally(() => setLoading(false));
  }, [playlist]);

  // 2. Filter logic
  const filteredChannels = useMemo(() => {
    if (!search) return channels;
    return channels.filter((ch) =>
      ch.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [channels, search]);

  // Reset page when searching
  useEffect(() => {
    setPage(1);
  }, [search]);

  // 3. Pagination Logic
  const totalPages = Math.ceil(filteredChannels.length / ITEMS_PER_PAGE);
  const paginatedChannels = filteredChannels.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    setPage(newPage);
    // Scroll to the top of the list container smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return (
    <div className="flex justify-center py-20 w-full">
      <FourSquare color="#3b82f6" size="medium" />
    </div>
  );

  if (filteredChannels.length === 0) return (
    <div className="text-center py-20 text-gray-500">No channels found</div>
  );

  return (
    <div className="w-full flex flex-col">
      {/* GRID STRATEGY:
          - grid-cols-2: 2 cards on mobile (Perfect as requested)
          - sm:grid-cols-3: 3 cards on small tablets
          - lg:grid-cols-2: BIG CARDS on Large Screens (Side-by-side view)
          - xl:grid-cols-2: HUGE CARDS on Extra Large Screens
      */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-2 gap-6 md:gap-10">
        {paginatedChannels.map((ch, idx) => (
          <div
            key={idx}
            onClick={() => onSelectChannel(ch)}
            className="group relative flex flex-col cursor-pointer transition-all duration-500"
          >
            {/* LARGE IMAGE CONTAINER */}
            <div className="relative aspect-video w-full overflow-hidden rounded-[2rem] bg-gray-800 border-2 border-transparent 
                          group-hover:border-blue-500 group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] 
                          transition-all duration-300 shadow-xl">
              {ch.logo ? (
                <img
                  src={ch.logo}
                  alt={ch.name}
                  className="h-full w-full object-contain p-4 md:p-6 transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gray-900 text-4xl font-black text-gray-700">
                  {ch.name[0]}
                </div>
              )}
              
              {/* Subtle Blue Tint on Hover */}
              <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* CHANNEL TEXT */}
            <div className="mt-5 px-2">
              <h3 className="text-sm sm:text-base font-extrabold tracking-tight text-gray-300 
                           group-hover:text-blue-400 transition-colors duration-300 
                           uppercase line-clamp-1 lg:text-xl">
                {ch.name}
              </h3>
              
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]"></span>
                <span className="text-[10px] md:text-xs font-black text-gray-500 uppercase tracking-[0.2em]">
                  Premium 4K Quality
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. PAGINATION CONTROLS (Restored) */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-6 mt-16 mb-10">
          <button
            onClick={() => handlePageChange(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-6 py-3 bg-gray-800 text-white font-bold rounded-2xl
                       disabled:opacity-20 hover:bg-blue-600 transition-all active:scale-90 shadow-lg"
          >
            Prev
          </button>

          <div className="flex items-center bg-gray-800/50 px-6 py-3 rounded-2xl border border-white/5 shadow-inner">
            <span className="text-sm font-black text-gray-400 uppercase tracking-widest">
              Page <span className="text-white">{page}</span> of {totalPages}
            </span>
          </div>

          <button
            onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="px-6 py-3 bg-gray-800 text-white font-bold rounded-2xl
                       disabled:opacity-20 hover:bg-blue-600 transition-all active:scale-90 shadow-lg"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ChannelList;