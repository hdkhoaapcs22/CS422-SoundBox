import React, { useContext } from "react";
import { IoClose, IoEllipsisHorizontal } from "react-icons/io5";
import { PlayerContext } from "../global/PlayerContext";
import { AppContext } from "../global/AppContext";
import axios from "axios";

const SearchedSong = ({ songs, index, setSongs }) => {
  const { playWithId } = useContext(PlayerContext);
  const { userId } = useContext(AppContext);

  const deleteASearchHistory = async (songID) => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/searchhistory/delete/${userId}/${songID}`
      );
      setSongs((prevSongs) => prevSongs.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting search history:", error);
    }
  };

  return (
    <div
      className="flex items-center justify-between px-2 text-white mb-4"
      onClick={() => playWithId(index, songs)}
    >
      <div className="flex items-center gap-4 transform transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer">
        <button
          className="text-gray-400 hover:text-white"
          onClick={(e) => {
            e.stopPropagation();
            deleteASearchHistory(songs[index]._id);
          }}
        >
          <IoClose size={20} />
        </button>
        <img
          src={songs[index].imageUrl}
          alt={songs[index].title}
          className="w-12 h-12 rounded-md"
        />
        <div>
          <p className="text-lg font-medium">{songs[index].title}</p>
          <p className="text-sm text-gray-400">{songs[index].name}</p>
        </div>
      </div>
      <IoEllipsisHorizontal
        className="text-gray-400 hover:text-white"
        size={24}
      />
    </div>
  );
};

export default SearchedSong;
