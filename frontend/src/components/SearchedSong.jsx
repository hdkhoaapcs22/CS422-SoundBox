import React from "react";
import { IoClose, IoEllipsisHorizontal } from "react-icons/io5";

const SearchedSong = ({ image, title, artist }) => {
  return (
    <div className="flex items-center justify-between px-2 text-white mb-4">
      <div className="flex items-center gap-4 transform transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer">
        <button className="text-gray-400 hover:text-white">
          <IoClose size={20} />
        </button>
        <img src={image} alt={title} className="w-12 h-12 rounded-md" />
        <div>
          <p className="text-lg font-medium">{title}</p>
          <p className="text-sm text-gray-400">{artist}</p>
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
