import React from "react";
import { IoSearch } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import assets from "../assets/assets";
const SearchHeader = () => {
  return (
    <div className="flex flex-row gap-10 p-10 w-full max-w-screen-xl overflow-hidden">
      <div className="relative w-[65%]">
        <input
          type="search"
          placeholder="Search for music, album, artist..."
          className="w-full p-3 bg-white border border-[#B6FF52] rounded-xl text-[#222222] focus:outline-none focus:ring-green-400 "
        />
        <IoSearch
          className="absolute right-8 top-1/2 transform -translate-y-1/2 text-[#222222] cursor-pointer"
          size={24}
        />
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
