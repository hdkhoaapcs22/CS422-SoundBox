import React from "react";
import assets from "../../assets/assets";
import { IoHeartOutline } from "react-icons/io5";

const TopTracks = () => {
  const rankingData = [
    {
      rank: "01",
      song: "Bad Habit",
      artist: "Steve Lacy",
      listeners: "5,968,463",
      likes: "798",
      image: assets.reputation,
    },
    {
      rank: "02",
      song: "Unholy",
      artist: "Sam Smith",
      listeners: "2,315,282",
      likes: "798",
      image: assets.harry_house,
    },
    {
      rank: "03",
      song: "As It Was",
      artist: "Harry Styles",
      listeners: "2,245,282",
      likes: "798",
      image: assets.pink_venom,
    },
    {
      rank: "04",
      song: "I Ain’t Worried",
      artist: "OneRepublic",
      listeners: "1,945,282",
      likes: "798",
      image: assets.aespa,
    },
    {
      rank: "05",
      song: "Until I Found You",
      artist: "Stephen Sanchez",
      listeners: "1,245,282",
      likes: "798",
      image: assets.harry_house,
    },
  ];
  return (
    <div className="flex flex-col text-white items-center w-full overflow-hidden">
      <h2 className="text-4xl font-bold">Today's Top Chart</h2>
      <table className="text-white w-[70%] my-10">
        <thead>
          <tr className="text-left border-b border-gray-700 text-gray-300">
            <th className="py-2 px-4">#</th>
            <th className="py-2 px-4">Song</th>
            <th className="py-2 px-4">Artist</th>
            <th className="py-2 px-4">Monthly Listeners</th>
            <th className="py-2 px-4">Likes</th>
          </tr>
        </thead>
        <tbody>
          {rankingData.map((item) => (
            <tr
              key={item.rank}
              className="hover:bg-[#05439f] hover:bg-opacity-20 cursor-pointer"
            >
              <td className="py-4 px-4">{item.rank}</td>
              <td className="py-4 px-4 flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.artist}
                  className="w-10 h-10 rounded-lg"
                />
                <span>{item.song}</span>
              </td>
              <td className="py-4 px-4">{item.artist}</td>
              <td className="py-4 px-4">{item.listeners}</td>
              <td className="py-4 px-4 flex items-center space-x-2">
                <IoHeartOutline className="w-5 h-5" />
                <span>{item.likes}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopTracks;
