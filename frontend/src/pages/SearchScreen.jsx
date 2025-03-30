import React from "react";
import SearchedSong from "../components/SearchedSong";
import assets from "../assets/assets";
const recentSearches = [
  {
    image: assets.reputation,
    title: "Flying High",
    artist: "JKT48",
  },
  {
    image: assets.harry_house,
    title: "One Kiss (With Dua Lipa)",
    artist: "Calvin Harris",
  },
  {
    image: assets.pink_venom,
    title: "As It Was",
    artist: "Harry Styles",
  },
  {
    image: assets.aespa,
    title: "I Ain’t Worried",
    artist: "OneRepublic",
  },
  {
    image: assets.banner_2,
    title: "IDGAF",
    artist: "Dua Lipa",
  },
];

const genres = [
  "K-Pop",
  "Indie",
  "R&B",
  "EDM",
  "Pop",
  "HipHop",
  "Jazz",
  "Blues",
  "Dangdut",
  "J-Pop",
  "Rock",
];
const SearchScreen = () => {
  return (
    <div className="w-screen h-[88%] px-10 flex flex-col overflow-hidden">
      <h2 className="text-white font-bold text-xl mb-4">Genre</h2>
      <div className="flex flex-wrap gap-4">
        {genres.map((genre) => (
          <button
            key={genre}
            className="px-4 py-2 rounded-md bg-[#143A71] text-white hover:bg-opacity-20"
          >
            {genre}
          </button>
        ))}
      </div>
      <div className="flex flex-row justify-between items-center w-[75%] mt-10 mb-4">
        <span className="text-white font-bold text-xl">Recent Search</span>
        <button className="text-[#B6FF52] font-semibold border border-[#B6FF52] px-5 py-2 rounded-xl flex-shrink-0">
          Clear All
        </button>
      </div>
      <div className="py-2 overflow-y-auto flex-grow">
        {recentSearches.map((song, index) => (
          <SearchedSong
            key={index}
            image={song.image}
            title={song.title}
            artist={song.artist}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchScreen;
