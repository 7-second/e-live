import { useEffect, useState, useMemo } from "react";
import { fetchChannels } from "../services/tvService";
import { FourSquare } from "react-loading-indicators";

const ITEMS_PER_PAGE = 40;

const ChannelList = ({ playlist, search, onSelectChannel }) => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!playlist?.url) return;

    setLoading(true);
    setPage(1); // reset page on playlist change

    fetchChannels(playlist.url)
      .then(setChannels)
      .finally(() => setLoading(false));
  }, [playlist]);

  const filteredChannels = useMemo(() => {
    if (!search) return channels;
    return channels.filter((ch) =>
      ch.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [channels, search]);

  useEffect(() => {
    setPage(1); // reset page on search
  }, [search]);

  const totalPages = Math.ceil(filteredChannels.length / ITEMS_PER_PAGE);

  const paginatedChannels = filteredChannels.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="flex justify-center mt-16">
        <FourSquare color="#32cd32" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (filteredChannels.length === 0) {
    return (
      <div className="text-center mt-16 text-gray-400">
        No channels found
      </div>
    );
  }

  return (
    <>
      {/* CHANNEL GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 p-4">
        {paginatedChannels.map((ch, idx) => (
          <div
            key={idx}
            onClick={() => onSelectChannel(ch)}
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

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-800 rounded
                       disabled:opacity-40 hover:bg-gray-700"
          >
            Prev
          </button>

          <span className="text-sm text-gray-300">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-800 rounded
                       disabled:opacity-40 hover:bg-gray-700"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default ChannelList;
