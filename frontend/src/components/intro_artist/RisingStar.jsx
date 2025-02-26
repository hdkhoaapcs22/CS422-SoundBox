import React from "react";
import assets from "../../assets/assets";
import { IoHeartOutline } from "react-icons/io5";

const RisingStar = () => {
  const rankingData = [
    {
      rank: "01",
      artist: "Dewa 19",
      song: "Separuh Nafas",
      listeners: "2,242,900",
      likes: "798",
      image: assets.reputation,
    },
    {
      rank: "02",
      artist: "Lalelimanino",
      song: "Rapsodi",
      listeners: "942,551",
      likes: "798",
      image: assets.aespa,
    },
    {
      rank: "03",
      artist: "Maliq & D'Essentials",
      song: "Senja Teduh Pelita",
      listeners: "1,315,282",
      likes: "798",
      image: assets.harry_house,
    },
    {
      rank: "04",
      artist: "Tulus",
      song: "Hati Hati Di Jalan",
      listeners: "5,968,463",
      likes: "798",
      image: assets.pink_venom,
    },
    {
      rank: "05",
      artist: "Lyodra",
      song: "Sang Dewi",
      listeners: "5,968,463",
      likes: "798",
      image: assets.reputation,
    },
  ];
  return (
    <div className="flex flex-col text-white items-center w-full overflow-hidden">
      <h2 className="text-4xl font-bold">Rising Star</h2>
      <table className="text-white w-[70%] my-10">
        <thead>
          <tr className="text-left border-b border-gray-700 text-gray-300">
            <th className="py-2 px-4">#</th>
            <th className="py-2 px-4">Artist</th>
            <th className="py-2 px-4">Popular Hits</th>
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
                <span>{item.artist}</span>
              </td>
              <td className="py-4 px-4">{item.song}</td>
              <td className="py-4 px-4">{item.listeners}</td>
              <td className="py-4 px-4 flex items-center space-x-2">
                <IoHeartOutline className="w-5 h-5" />
                <span>{item.likes}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-2xl mb-2">UPCOMING TOUR</p>
      <p className="text-4xl font-bold mb-10">ARTIST HIGHLIGHT</p>
      <img src={assets.artist_highlight} alt="" className="w-[70%]"/>
    </div>
  );
};

export default RisingStar;
