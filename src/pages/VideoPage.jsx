import { useState, useEffect, useMemo, useRef } from "react";
import ReactPlayer from "react-player";
import { fetchChannels } from "../services/tvService";
import { FourSquare } from "react-loading-indicators";

const ITEMS_PER_PAGE = 40;

const VideoPage = ({ playlist }) => {
  const [search, setSearch] = useState("");
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currentChannel, setCurrentChannel] = useState(null);
  const [isTelegram, setIsTelegram] = useState(false);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      setIsTelegram(true);
      window.Telegram.WebApp.expand();
    }
  }, []);

  useEffect(() => {
    if (!playlist?.url) return;
    setLoading(true);
    setPage(1);
    setCurrentChannel(null);
    fetchChannels(playlist.url)
      .then(setChannels)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [playlist]);

  const filteredChannels = useMemo(() => {
    if (!search) return channels;
    return channels.filter((ch) =>
      ch.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [channels, search]);

  const totalPages = Math.ceil(filteredChannels.length / ITEMS_PER_PAGE);
  const paginatedChannels = filteredChannels.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950">
      <FourSquare color="#3b82f6" size="medium" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden flex flex-col">
      
      {/* 1. TOP NAVIGATION / SEARCHBAR */}
      <header className="h-16 flex-shrink-0 bg-gray-900/80 backdrop-blur-md border-b border-white/10 flex items-center px-4 z-50">
        <div className="w-full max-w-2xl mx-auto relative">
          <input
            type="text"
            placeholder="Search channels..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-800 text-sm p-2.5 pl-10 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <span className="absolute left-3 top-2.5">🔍</span>
        </div>
      </header>

      {/* 2. MAIN CONTENT AREA */}
      {/* On Laptop (lg:), this becomes a Side-by-Side Row. On Mobile, it's a Column. */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* LEFT SIDE: VIDEO PLAYER */}
        {currentChannel && !isTelegram && (
          <div className="w-full lg:w-[60%] xl:w-[65%] bg-black flex flex-col border-r border-white/10">
            <div className="relative aspect-video lg:h-full lg:aspect-auto flex items-center justify-center">
              <ReactPlayer
                url={currentChannel.url}
                controls
                playing
                width="100%"
                height="100%"
                config={{ file: { forceHLS: true } }}
              />
            </div>
            {/* Info bar below video (only visible if player is active) */}
            <div className="p-4 bg-gray-900/50">
              <h1 className="text-xl font-bold uppercase tracking-tight">{currentChannel.name}</h1>
              <div className="flex items-center gap-2 text-blue-500 text-xs mt-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                LIVE NOW
              </div>
            </div>
          </div>
        )}

        {/* RIGHT SIDE: CHANNEL LIST */}
        {/* This div is scrollable independently on Laptop */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-gray-950">
          
          <div className={`grid gap-4 ${currentChannel 
            ? "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4" // When playing: Bigger cards, fewer columns
            : "grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-5 xl:grid-cols-6" // When idle: Standard grid
          }`}>
            {paginatedChannels.map((ch, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentChannel(ch)}
                className={`group p-2 rounded-2xl cursor-pointer transition-all border-2 
                           ${currentChannel?.name === ch.name 
                             ? "bg-blue-600/20 border-blue-500 shadow-lg" 
                             : "bg-gray-900 border-transparent hover:border-gray-700"}`}
              >
                <div className="w-full aspect-video rounded-xl bg-black/40 flex items-center justify-center overflow-hidden mb-2">
                  {ch.logo ? (
                    <img src={ch.logo} alt="" className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform" />
                  ) : (
                    <div className="text-2xl font-bold text-gray-800">{ch.name[0]}</div>
                  )}
                </div>
                <p className="text-[11px] font-bold text-center truncate uppercase text-gray-400 group-hover:text-white px-1">
                  {ch.name}
                </p>
              </div>
            ))}
          </div>

          {/* PAGINATION SECTION */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 py-10 mt-6 border-t border-white/5">
              <button 
                onClick={() => setPage(p => Math.max(1, p-1))}
                disabled={page === 1}
                className="px-5 py-2 bg-gray-800 rounded-lg hover:bg-blue-600 disabled:opacity-20 transition-all"
              >
                Prev
              </button>
              <span className="text-xs font-mono text-gray-500">
                PAGE {page} / {totalPages}
              </span>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p+1))}
                disabled={page === totalPages}
                className="px-5 py-2 bg-gray-800 rounded-lg hover:bg-blue-600 disabled:opacity-20 transition-all"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default VideoPage;