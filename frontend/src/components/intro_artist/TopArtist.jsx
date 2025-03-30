import React from "react";
import assets from "../../assets/assets";

const TopArtist = ({
  title = "This Year Top 5",
  rankingData = [], 
}) => {
  return (
    <div className="w-full flex flex-col items-center text-white mb-20 overflow-hidden">
      <p className="text-4xl font-bold mb-28">{title}</p>
      <div className="relative flex justify-between items-center space-x-10">
        {rankingData.map((item) => (
          <div key={item.rank} className="relative flex flex-col flex-shrink-0 items-center">
            {/* Number */}
            <span className="absolute -left-7 -top-20 text-[120px] font-bold text-transparent z-0 font-outline-2">
              {item.rank}
            </span>

            {/* Artist Image */}
            <div className="w-36 h-36 rounded-full overflow-hidden z-10">
              <img
                src={item.image}
                alt={item.artist}
                className="w-full h-full object-cover transition-transform group-hover:scale-105 cursor-pointer"
              />
            </div>

            {/* Artist Name */}
            <p className="mt-3 text-lg font-semibold">{item.artist}</p>
            <p className="text-sm text-gray-300">{item.genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopArtist;
