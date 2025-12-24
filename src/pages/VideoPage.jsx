import { useState, useEffect, useMemo } from "react";
import ChannelList from "../components/ChannelList";

const ITEMS_PER_PAGE = 40;

const VideoPage = ({ playlist }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch channels when playlist changes
  useEffect(() => {
    if (!playlist?.url) return;

    setLoading(true);
    setPage(1);

    import("../services/tvService")
      .then(({ fetchChannels }) => fetchChannels(playlist.url))
      .then((data) => setChannels(data))
      .finally(() => setLoading(false));
  }, [playlist]);

  // Filtered channels based on search
  const filteredChannels = useMemo(() => {
    if (!search) return channels;
    return channels.filter((ch) =>
      ch.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [channels, search]);

  // Reset page on search
  useEffect(() => setPage(1), [search]);

  const totalPages = Math.ceil(filteredChannels.length / ITEMS_PER_PAGE);

  const paginatedChannels = filteredChannels.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // Redirect user to the channel URL
  const handleSelectChannel = (channel) => {
    window.location.href = channel.url; // opens in browser / native player
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-16 text-white">
        Loading channels...
      </div>
    );
  }

  if (filteredChannels.length === 0) {
    return (
      <div className="text-center mt-16 text-gray-400">No channels found</div>
    );
  }

  return (
    <div className="p-2">
      {/* Search bar */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search channels..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
      </div>

      {/* Channel list */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 p-4">
        {paginatedChannels.map((ch, idx) => (
          <div
            key={idx}
            onClick={() => handleSelectChannel(ch)}
            className="bg-gray-800 hover:bg-gray-700 rounded-xl p-3
                       flex flex-col items-center cursor-pointer
                       transition transform hover:scale-105"
          >
            {ch.logo ? (
              <img
                src={ch.logo}
                alt={ch.name}
                className="w-16 h-16 object-contain mb-2"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-lg">
                {ch.name[0]}
              </div>
            )}
            <span className="text-xs text-center mt-1 line-clamp-2">
              {ch.name}
            </span>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-800 rounded disabled:opacity-40 hover:bg-gray-700"
          >
            Prev
          </button>

          <span className="text-sm text-gray-300">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-800 rounded disabled:opacity-40 hover:bg-gray-700"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPage;
