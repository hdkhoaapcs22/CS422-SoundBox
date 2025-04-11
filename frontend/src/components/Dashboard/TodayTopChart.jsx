import React, { useState, useEffect, useContext } from "react";
import { BsPlayCircleFill } from "react-icons/bs";
import { getTopSongsInWeek } from "../../services/songServices";
import { PlayerContext } from "../../global/PlayerContext";

const TodayTopChart = () => {
  const [topSongs, setTopSongs] = useState([]);
  const { playWithId } = useContext(PlayerContext);

  useEffect(() => {
    const fetchTopSongs = async () => {
      const songs = await getTopSongsInWeek();
      setTopSongs(songs);
    };
    fetchTopSongs();
  }, []);
  return (
    <div className="w-full px-3 text-white overflow-hidden">
      <h3 className="text-xl font-bold text-center pb-5">Weekly Top's Chart</h3>
      <div className="flex justify-between items-center text-gray-300 border-b pb-2">
        <span className="w-10">#</span>
        <span className="flex-1">Song</span>
        <span className="w-16 mr-5"></span>
      </div>

      {/* Song List */}
      <div className="mt-2 overflow-y-auto scrollbar-hide">
        {topSongs.map((song, index) => (
          <div
            key={index}
            className="flex items-center p-2 hover:bg-blue-900 rounded-lg transition cursor-pointer"
            onClick={() => playWithId(index, topSongs)}
          >
            <span className="w-10 font-bold justify-start">{index + 1}</span>
            <div className="flex items-center flex-1">
              <img
                src={song.imageUrl}
                alt={song.title}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div className="ml-3">
                <p className="text-sm text-white font-medium">{song.title}</p>
                <p className="text-gray-400 text-sm">{song.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center ml-6 text-gray-300">
                <span className="text-sm">{song.totalPlays}</span>
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
