import React, { useState, useEffect, useContext, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import assets from "../assets/assets";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import useDebounce from "../global/UseDebounce";
import SearchResult from "./SearchResult";
import { AppContext } from "../global/AppContext";

const SearchHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [input, setInput] = useState("");
  const [songs, setSongs] = useState([]);
  const debouncedInput = useDebounce(input, 300);
  const { userId, role } = useContext(AppContext);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (userId && role) {
      fetchUserData(userId, role);
    }
  }, [userId, role]);

  const searching = () => {
    if (location.pathname === "/search") return;
    navigate("/search");
  };

  const fetchUserData = async (userId, role) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/${role}/${userId}`
      );
      if (response.data.success) {
        setUserData(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchSongs = async (query, genre = null) => {
    try {
      let response;
      if (genre) {
        response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/songs/genre/${genre.toLowerCase()}`
        );
      } else {
        response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/songs/search?query=${query}`
        );
      }
      setSongs(response.data);
    } catch (err) {
      console.error("Error fetching search results:", err);
    }
  };

  useEffect(() => {
    if (debouncedInput) {
      fetchSongs(debouncedInput);
      setIsSearchOpen(true);
    } else {
      setSongs([]);
      setIsSearchOpen(false);
    }
  }, [debouncedInput]);

  const handleChange = (value) => {
    setInput(value);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setInput("");
  };

  return (
    <div className="flex flex-row gap-10 p-10 w-full max-w-screen-xl overflow-hidden">
      <div className="w-[65%]">
        <div className="flex flex-col">
          <div className="relative">
            <input
              ref={inputRef}
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
          {isSearchOpen && (
            <div>
              <SearchResult
                songs={songs}
                listenerID={userId}
                closeSearch={closeSearch}
                width={inputRef.current?.offsetWidth}
              />
            </div>
          )}
        </div>
      </div>
      {userData ? (
        <div className="pl-10 flex flex-row w-[35%] max-w-[350px] gap-4">
          <img
            src={
              userData.avatarUrl == ""
                ? assets.defaultAvatarUser
                : userData?.avatarUrl
            }
            alt="User Avatar"
            className="w-10 h-10 rounded-full cursor-pointer"
          />
          <div>
            <p className="text-white font-medium">{userData.name}</p>
            <p className="text-gray-300 text-sm">{userData.email}</p>
          </div>
          <div className="justify-center items-center">
            <IoIosArrowDown className="text-white cursor-pointer" size={24} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SearchHeader;
