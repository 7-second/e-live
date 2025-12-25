const data = {
  description: "The Smoking Tire heads out to Adams Motorsports Park...",
  sources: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
  subtitle: "By Garage419",
  thumb: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/VolkswagenGTIReview.jpg",
  title: "Volkswagen GTI Review"
};

function Advertisment() {
  return (
    <div className="relative w-full h-52 md:h-72 bg-black overflow-hidden shadow-lg">
      {/* Video Background */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline
        className="w-full h-full object-cover opacity-60"
        src={data.sources} 
      />
      
      {/* Overlay Text */}
      <div className="absolute bottom-4 left-4 right-4">
        <span className="bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded mb-2 inline-block">
          AD
        </span>
        <h1 className="text-lg font-bold text-white drop-shadow-md">
          {data.title}
        </h1>
        <p className="text-xs text-gray-300 line-clamp-1">
          {data.description}
        </p>
      </div>
    </div>
  );
}

export default Advertisment;