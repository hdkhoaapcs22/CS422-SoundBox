import React from "react";

const SearchResult = ({ songs }) => {
  return (
    <div className="w-full bg-black flex flex-col shadow-lg rounded-2xl mt-5 max-h-[300px] overflow-y-auto scrollbar-hide">
      {songs.map((song, index) => {
        return (
          <div
            key={index}
            className="flex flex-row items-center justify-between px-4 py-2"
          >
            <div className="flex items-center gap-4 transform transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer">
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
        <p>No result found.</p>
      )}
    </div>
  );
};

export default SearchResult;
