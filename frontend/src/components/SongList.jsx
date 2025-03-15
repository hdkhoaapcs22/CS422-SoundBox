import React, { useState, useEffect } from "react";
import {
  IoArrowForwardOutline,
  IoArrowBackOutline,
  IoHeartOutline,
} from "react-icons/io5";

const SongList = ({ title, songs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);

  useEffect(() => {
    const updateCardsToShow = () => {
      setCardsToShow(window.innerWidth >= 1024 ? 4 : 1);
    };
    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  const nextSlide = () => {
    setCurrentIndex(() =>
      currentIndex + 1 >= songs.length ? 0 : currentIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? songs.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex flex-col text-white px-10 pb-5 w-full overflow-hidden">
      {/* Title and Navigation */}
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-2xl font-bold">{title}</h3>
        <div className="flex flex-row text-[#B6FF52] gap-4">
          <button
            className="cursor-pointer hover:bg-blue-950 p-2 rounded-full"
            onClick={prevSlide}
          >
            <IoArrowBackOutline size={20} />
          </button>
          <button
            className="cursor-pointer hover:bg-blue-950 p-2 rounded-full"
            onClick={nextSlide}
          >
            <IoArrowForwardOutline size={20} />
          </button>
        </div>
      </div>

      {/* Song Cards */}
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
            width: `${songs.length * (100 / cardsToShow)}%`,
          }}
        >
          {songs.map((song, index) => (
            <div
              key={index}
              className="flex flex-col w-[calc(100% / 4)] p-3 items-center bg-transparent rounded-lg cursor-pointer hover:bg-slate-800"
            >
              <img
                src={song.imageUrl}
                alt={song.title}
                className="w-40 h-40 object-cover rounded-lg"
              />
              <div className="flex flex-row w-full justify-between">
                <div className="flex flex-col pt-2">
                  <p className="text-sm font-bold">{song.title}</p>
                  <p className="text-xs">
                    {song.artistID?.name || "Unknown Artist"}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <IoHeartOutline className="w-5 h-5" />
                  <span className="text-xs">{song.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SongList;
