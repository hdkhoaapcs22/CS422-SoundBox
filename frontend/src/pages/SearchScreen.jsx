import React, { useState, useContext, useEffect, useRef } from "react";
import SearchedSong from "../components/SearchedSong";
import { AppContext } from "../global/AppContext";
import axios from "axios";
import SearchResult from "../components/SearchResult";
import UploadAudio from "../components/UploadAudio";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const genres = [
  "K-Pop",
  "Indie",
  "R&B",
  "EDM",
  "Pop",
  "Ballad",
  "Hip-Hop",
  "Jazz",
  "Blues",
  "J-Pop",
  "Rock",
];
const SearchScreen = () => {
  const [songs, setSongs] = useState([]);
  const [songsByGenre, setSongByGenre] = useState([]);
  const [showAudioSearch, setShowAudioSearch] = useState(false);
  const { userId } = useContext(AppContext);
  const [_, setIsSearchOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchRecentSearch = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/searchhistory/${userId}`
        );
        setSongs(response.data);
      } catch (err) {
        console.error("Error fetching search results:", err);
      }
    };

    fetchRecentSearch();
  }, [userId]);

  const fetchSongsByGenre = async (genre) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/songs/genre/${genre.toLowerCase()}`
      );
      setSongByGenre(response.data);
      setIsSearchOpen(true);
    } catch (error) {
      console.error("Error fetching songs by genre:", error);
    }
  };

  const deleteAllSearchHistory = async () => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/searchhistory/delete-all/${userId}`
      );
      setSongs([]);
    } catch (error) {
      console.error("Error deleting search history:", error);
    }
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSongByGenre([]);
  };

  return (
    <div className="w-screen h-[88%] px-10 flex flex-col overflow-y-auto scrollbar-hide">
      <div
        className="flex flex-row gap-5 items-center cursor-pointer text-white mb-2"
        onClick={() => setShowAudioSearch((prev) => !prev)}
      >
        <h2 className="font-bold text-xl">Explore More Song by Audio</h2>
        {showAudioSearch ? (
          <IoIosArrowUp className="transition-transform size-5" />
        ) : (
          <IoIosArrowDown className="transition-transform size-5" />
        )}
      </div>
      {showAudioSearch && (
        <div className="transition-all duration-300 ease-in-out">
          <UploadAudio />
        </div>
      )}
      {/* Search by Genre */}
      <h2 className="text-white font-bold text-xl mb-4">Genre</h2>
      <div className="flex flex-col">
        <div ref={inputRef} className="flex flex-wrap gap-4">
          {genres.map((genre) => (
            <button
              key={genre}
              className="px-4 py-2 rounded-md bg-[#143A71] text-white hover:bg-opacity-20"
              onClick={() => fetchSongsByGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
        {songsByGenre.length > 0 && (
          <div>
            <SearchResult
              songs={songsByGenre}
              listenerID={userId}
              closeSearch={closeSearch}
              width={1024}
            />
          </div>
        )}
      </div>
      {/* Search by Song Name */}
      <div className="flex flex-row justify-between items-center w-[75%] mt-10 mb-4">
        <span className="text-white font-bold text-xl">Recent Search</span>
        <button
          className="text-[#B6FF52] font-semibold border border-[#B6FF52] px-5 py-2 rounded-xl flex-shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            deleteAllSearchHistory();
          }}
        >
          Clear All
        </button>
      </div>
      <div className="py-2 min-h-min overflow-y-auto flex-grow">
        {songs.map((_, index) => (
          <SearchedSong
            key={index}
            index={index}
            songs={songs}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchScreen;
