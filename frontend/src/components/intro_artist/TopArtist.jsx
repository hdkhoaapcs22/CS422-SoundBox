import React from "react";
import assets from "../../assets/assets";
const rankingData = [
  {
    rank: "1",
    artist: "Raisa",
    genre: "R&B Soul",
    image: assets.reputation,
  },
  {
    rank: "2",
    artist: "Tulus",
    genre: "Rock",
    image: assets.aespa,
  },
  {
    rank: "3",
    artist: "Hivi",
    genre: "Pop",
    image: assets.pink_venom,
  },
  {
    rank: "4",
    artist: "Lyodra",
    genre: "Pop",
    image: assets.harry_house,
  },
  {
    rank: "5",
    artist: "RAN",
    genre: "R&B Funk",
    image: assets.pink_venom,
  },
];

const TopArtist = () => {
  return (
    <div className="flex flex-col items-center text-white my-20 w-full overflow-hidden">
      <p className="text-4xl font-bold mb-28">This Year Top 5</p>
      <div className="relative flex justify-center items-center space-x-10">
        {rankingData.map((item) => (
          <div key={item.rank} className="relative flex flex-col items-center">
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
