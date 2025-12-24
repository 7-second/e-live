import React from "react";
import { useNavigate } from "react-router-dom";

const VideoCard = ({ title, thumbnail, id }) => {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer"
      onClick={() => navigate(`/video/${id}`)}
    >
      <img src={thumbnail} alt={title} className="w-full rounded-lg" />
      <h2 className="text-sm font-semibold mt-2">{title}</h2>
    </div>
  );
};

export default VideoCard;
