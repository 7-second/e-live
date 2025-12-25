import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Hls from "hls.js";
import { FourSquare } from "react-loading-indicators";

const SOURCES = {
  "SPORTS": import.meta.env.VITE_SPORT_URL,
  "XXX": import.meta.env.VITE_XXX_URL,
  "WORLD": import.meta.env.VITE_WORLD_TV_URL,
  "KIDS": import.meta.env.VITE_KIDS_URL,
  "ETH": import.meta.env.VITE_ETH_URL
};

export default function SportsPage() {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("SPORTS");
  const navigate = useNavigate();
  
  // Refs for the player
  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  // 1. DATA LOADING WITH CACHE
  const loadData = async (cat, forceRefresh = false) => {
    setActiveTab(cat);
    const cached = localStorage.getItem(`cache_${cat}`);
    
    if (cached && !forceRefresh) {
      const parsed = JSON.parse(cached);
      setChannels(parsed);
      if (parsed.length > 0 && !selectedChannel) setSelectedChannel(parsed[0]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(SOURCES[cat]);
      const text = await res.text();
      const lines = text.split('\n');
      const list = [];
      let current = null;

      lines.forEach(line => {
        if (line.startsWith("#EXTINF")) {
          current = {
            name: line.split(',').pop().trim(),
            logo: line.match(/tvg-logo="(.*?)"/)?.[1] || ""
          };
        } else if (line.startsWith("http")) {
          if (current) {
            current.url = line.trim();
            list.push(current);
            current = null;
          }
        }
      });

      localStorage.setItem(`cache_${cat}`, JSON.stringify(list));
      setChannels(list);
      if (list.length > 0) setSelectedChannel(list[0]);
    } catch (e) {
      console.error("Failed to fetch", e);
    } finally {
      setLoading(false);
    }
  };

  // Initial Load
  useEffect(() => {
    loadData("SPORTS");
  }, []);

  // 2. VIDEO ATTACHMENT LOGIC
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !selectedChannel?.url) return;

    // Clean up previous HLS instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        manifestLoadingMaxRetry: 4,
      });
      hls.loadSource(selectedChannel.url);
      hls.attachMedia(video);
      hlsRef.current = hls;
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(e => console.log("Autoplay blocked, user must click play."));
      });

      // Error handling for dead streams
      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
            console.warn("Stream error, attempting recovery...");
            hls.startLoad();
        }
      });
    } 
    else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = selectedChannel.url;
    }

    return () => {
      if (hlsRef.current) hlsRef.current.destroy();
    };
  }, [selectedChannel]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans">
      
      {/* NAVBAR */}
      <nav className="h-16 border-b border-white/5 bg-black flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <button onClick={() => navigate("/")} className="text-2xl font-black italic text-green-500 tracking-tighter">ELIVE</button>
          <div className="flex gap-1 overflow-x-auto no-scrollbar max-w-[50vw]">
            {Object.keys(SOURCES).map(k => (
              <button 
                key={k} 
                onClick={() => loadData(k)}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === k ? "bg-white text-black" : "text-zinc-500 hover:text-white"
                }`}
              >
                {k}
              </button>
            ))}
          </div>
        </div>
        <button onClick={() => loadData(activeTab, true)} className="text-[9px] font-bold text-zinc-600 hover:text-green-500 uppercase tracking-[0.2em]">Update Cache</button>
      </nav>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* PLAYER AREA (Always Rendered) */}
        <div className="lg:col-span-8 p-6 flex flex-col bg-black overflow-y-auto">
          <div className="max-w-5xl mx-auto w-full">
            
            {/* The Video Container */}
            <div className="relative group aspect-video bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl shadow-green-500/5">
              <video 
                ref={videoRef} 
                controls 
                playsInline
                className="w-full h-full object-contain"
                poster={selectedChannel?.logo}
              />
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                   <FourSquare color="#22c55e" size="medium" />
                </div>
              )}
            </div>

            {/* Title Info */}
            <div className="mt-8">
              <div className="flex items-center gap-4 mb-2">
                <span className="bg-green-600 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter">LIVE FEED</span>
                <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">{activeTab}</span>
              </div>
              <h1 className="text-6xl font-black uppercase italic tracking-tighter leading-none text-white drop-shadow-md">
                {selectedChannel?.name || "Select a stream"}
              </h1>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className="lg:col-span-4 bg-[#080808] border-l border-white/5 flex flex-col h-[calc(100vh-64px)]">
          <div className="p-5 border-b border-white/5">
             <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Channel List • {channels.length}</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
            {channels.map((chan, i) => (
              <button
                key={i}
                onClick={() => setSelectedChannel(chan)}
                className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all mb-1 ${
                  selectedChannel?.url === chan.url ? "bg-white/10 ring-1 ring-white/10" : "hover:bg-white/5"
                }`}
              >
                <div className="w-10 h-10 bg-black rounded-xl p-1.5 flex-shrink-0 border border-white/5 shadow-inner">
                  <img 
                    src={chan.logo} 
                    className="w-full h-full object-contain" 
                    alt="" 
                    onError={(e) => e.target.src='https://via.placeholder.com/100?text=TV'} 
                  />
                </div>
                <p className={`text-xs font-bold truncate text-left ${selectedChannel?.url === chan.url ? "text-green-400" : "text-zinc-400"}`}>
                  {chan.name}
                </p>
              </button>
            ))}
          </div>
        </aside>

      </div>
    </div>
  );
}