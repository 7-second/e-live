import React from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const VideoPage = () => {
  const { id } = useParams();

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Video {id}</h1>
        <div className="w-full aspect-video">
          <ReactPlayer
            url={`https://www.example.com/video${id}.mp4`}
            controls
            width="100%"
            height="100%"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VideoPage;
