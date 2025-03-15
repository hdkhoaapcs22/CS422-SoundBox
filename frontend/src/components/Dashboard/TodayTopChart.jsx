import React from "react";
import assets from "../../assets/assets";
import { IoHeartOutline } from "react-icons/io5";
import { BsPlayCircleFill } from "react-icons/bs";

const songs = [
  {
    rank: "01",
    image: assets.reputation,
    title: "Bad Habit",
    artist: "Steve Lacy",
    likes: 798,
  },
  {
    rank: "02",
    image: assets.sound_banner_1,
    title: "Unholy",
    artist: "Sam Smith",
    likes: 429,
  },
  {
    rank: "03",
    image: assets.sound_banner_2,
    title: "As It Was",
    artist: "Harry Styles",
    likes: 826,
  },
  {
    rank: "04",
    image: assets.aespa,
    title: "I Ain't Worried",
    artist: "One Republic",
    likes: 540,
  },
  {
    rank: "05",
    image: assets.harry_house,
    title: "Until I Found You",
    artist: "Stephen Sanchez",
    likes: 196,
  },
];

const TodayTopChart = () => {
  return (
    <div className="w-full max-w-[350px] px-2 text-white overflow-hidden">
      <h3 className="text-xl font-bold text-center pb-5">Today Top's Chart</h3>
      <div className="flex justify-between items-center text-gray-300 border-b pb-2">
        <span className="w-10">#</span>
        <span className="flex-1">Song</span>
        <span className="w-16 mr-5">Likes</span>
      </div>

      {/* Song List */}
      <div className="mt-2 overflow-y-auto scrollbar-hide">
        {songs.map((song, index) => (
          <div
            key={index}
            className="flex items-center p-2 hover:bg-blue-900 rounded-lg transition cursor-pointer"
          >
            <span className="w-10 font-bold justify-start">{song.rank}</span>
            <div className="flex items-center flex-1">
              <img
                src={song.image}
                alt={song.title}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div className="ml-3">
                <p className="text-sm text-white font-medium">{song.title}</p>
                <p className="text-gray-400 text-sm">{song.artist}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center ml-6 text-gray-300">
                <IoHeartOutline className="text-white mr-1" />
                <span className="text-sm">{song.likes}</span>
              </div>
              <BsPlayCircleFill className="text-green-400 text-xl cursor-pointer hover:text-green-500 transition" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayTopChart;
