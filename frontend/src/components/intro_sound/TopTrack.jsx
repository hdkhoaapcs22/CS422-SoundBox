import React from "react";
import { IoHeartOutline } from "react-icons/io5";

const TopTracks = ({ rankingData, loading }) => {
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
        {!loading && (
          <>
            <tbody>
              {rankingData.map((item, index) => (
                <tr
                  key={index + 1}
                  className="hover:bg-[#05439f] hover:bg-opacity-20 cursor-pointer"
                >
                  <td className="py-4 px-4">{index + 1}</td>
                  <td className="py-4 px-4 flex items-center space-x-4">
                    <img
                      src={item.artistInfo.avatarUrl}
                      alt={item.artistInfo.avatarUrl}
                      className="w-10 h-10 rounded-lg"
                    />
                    <span>{item.song}</span>
                  </td>
                  <td className="py-4 px-4">{item.artistInfo.name}</td>

                  <td className="py-4 px-4">{item.totalPlays}</td>
                  <td className="py-4 px-4 flex items-center space-x-2">
                    <IoHeartOutline className="w-5 h-5" />
                    <span>{item.likes}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </table>
    </div>
  );
};

export default TopTracks;
