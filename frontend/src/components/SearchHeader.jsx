import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import assets from "../assets/assets";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import useDebounce from "../global/UseDebounce";
import SearchResult from "./SearchResult";

const SearchHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [input, setInput] = useState("");
  const [songs, setSongs] = useState([]);
  const debouncedInput = useDebounce(input, 300);

  const searching = () => {
    if (location.pathname === "/search") return;
    navigate("/search");
  };

  const fetchSongs = async (query) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/songs/search?query=${query}`
      );
      setSongs(response.data);
      // console.log(response.data);
    } catch (err) {
      console.error("Error fetching search results:", err);
    }
  };

  useEffect(() => {
    if (debouncedInput) {
      fetchSongs(debouncedInput);
    } else {
      setSongs([]);
    }
  }, [debouncedInput]);

  const handleChange = (value) => {
    setInput(value);
  };

  return (
    <div className="flex flex-row gap-10 p-10 w-full max-w-screen-xl overflow-hidden">
      <div className="w-[65%]">
        <div className="flex flex-col">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for music, album, artist..."
              className="w-full p-3 bg-white border border-[#B6FF52] rounded-xl text-[#222222] focus:outline-none focus:ring-green-400 "
              onClick={searching}
              onChange={(e) => handleChange(e.target.value)}
            />
            <IoSearch
              className="absolute right-8 top-1/2 transform -translate-y-1/2 text-[#222222] cursor-pointer"
              size={24}
            />
          </div>

          {songs.length > 0 && (
            <div>
              <SearchResult songs={songs} />
            </div>
          )}
        </div>
      </div>
      <div className="pl-10 flex flex-row w-[35%] max-w-[350px] gap-4">
        <img
          src={assets.avatarUser1}
          alt="User Avatar"
          className="w-10 h-10 rounded-full cursor-pointer"
        />
        <div>
          <p className="text-white font-medium">Jerome Bell</p>
          <p className="text-gray-300 text-sm">jeromebell@gmail.com</p>
        </div>
        <div className="justify-center items-center">
          <IoIosArrowDown className="text-white cursor-pointer" size={24} />
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
