import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ChannelList from "../components/ChannelList";
import HLSPlayer from "../components/HLSPlayer";

const ChannelPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      navigate("/");
    }
  }, [state, navigate]);

  if (!state) return null;

  const { channel, playlist } = state;
  const [activeChannel, setActiveChannel] = useState(channel);

  return (
    /* MAIN WRAPPER: Full screen height, no body scroll */
    <div className="h-screen w-full bg-gray-950 text-white flex flex-col overflow-hidden">
      
      {/* HEADER BAR */}
      <header className="h-16 flex-shrink-0 flex items-center justify-between px-6 bg-gray-900 border-b border-white/10 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate("/")}
            className="p-2 hover:bg-white/10 rounded-full transition-all group"
          >
            <span className="text-gray-400 group-hover:text-white">←</span> Back
          </button>
          <div className="h-6 w-[1px] bg-white/10"></div>
          <h2 className="text-sm md:text-base font-bold text-blue-400 uppercase tracking-widest truncate max-w-[200px] md:max-w-md">
            {activeChannel.name}
          </h2>
        </div>
        <div className="hidden md:block">
           <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Premium Player v1.0</span>
        </div>
      </header>

      {/* MAIN CONTENT: Split Row for Laptops */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* LEFT PANEL: THE PLAYER */}
        <section className="w-full lg:w-[65%] xl:w-[70%] h-auto lg:h-full bg-black flex flex-col">
          <div className="flex-1 relative flex items-center justify-center bg-black overflow-hidden">
            <div className="w-full aspect-video lg:aspect-auto lg:h-full lg:w-full">
              <HLSPlayer 
                key={activeChannel.streamUrl} 
                url={activeChannel.streamUrl} 
                autoPlay 
              />
            </div>
          </div>
          
          {/* Details below player */}
          <div className="p-4 bg-gray-900/50 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/20">
                {activeChannel.name[0]}
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-extrabold uppercase">{activeChannel.name}</h1>
                <p className="text-[10px] text-green-500 font-bold tracking-[0.2em] animate-pulse">● LIVE STREAMING</p>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT PANEL: SIDEBAR CHANNEL LIST */}
        <aside className="flex-1 overflow-y-auto bg-gray-900/30 backdrop-blur-sm custom-scrollbar border-l border-white/10">
          <div className="p-5">
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-6 border-b border-white/5 pb-3">
              Up Next / Other Channels
            </h3>

            {/* We pass the onSelectChannel but keep the styling handled by 
              ChannelList. To ensure images are big, we make sure the 
              ChannelList grid is responsive inside this narrow sidebar.
            */}
            <div className="channel-sidebar-grid">
              <ChannelList
                playlist={playlist}
                search=""
                onSelectChannel={(ch) => {
                  setActiveChannel(ch);
                  // Scroll to top on mobile so they see the player change
                  if (window.innerWidth < 1024) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              />
            </div>
          </div>
        </aside>

      </main>
    </div>
  );
};

export default ChannelPage;