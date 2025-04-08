import React, { useContext, useEffect, useRef } from "react";
import { PlayerContext } from "../global/PlayerContext";
import axios from "axios";

const SearchResult = ({ songs, listenerID, closeSearch, width }) => {
  const { playWithId } = useContext(PlayerContext);
  const dropdownRef = useRef(null);

  const handleClick = async (song, index) => {
    playWithId(index, songs);
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/searchhistory/save-result`,
        {
          listenerID: listenerID,
          songID: song._id,
        }
      );
    } catch (error) {
      console.error("Error saving search result:", error);
    }
    closeSearch();
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      closeSearch();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      style={{ width: `${width}px` }}
      className="absolute bg-black flex flex-col shadow-lg rounded-2xl 
    mt-5 max-h-[300px] overflow-y-auto scrollbar-hide z-50"
    >
      {songs.map((song, index) => {
        return (
          <div
            key={index}
            onClick={() => handleClick(song, index)}
            className="flex flex-row items-center justify-between px-4 py-2 hover:bg-[#081221] cursor-pointer"
          >
            <div className="flex items-center gap-4 transform transition-transform duration-300 ease-in-out hover:scale-110">
              <img
                src={song.imageUrl}
                alt={song.title}
                className="w-12 h-12 rounded-md"
              />
              <div>
                <p className="text-base font-medium text-white">{song.title}</p>
                <p className="text-sm text-gray-400">{song.name}</p>
              </div>
            </div>
          </div>
        );
      })}
      {songs.length === 0 && (
        <p className="text-white p-4">No results found.</p>
      )}
    </div>
  );
};

export default SearchResult;
