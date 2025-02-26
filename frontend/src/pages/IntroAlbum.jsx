import React, { useState } from "react";
import assets, { artist_with_song } from "../assets/assets";
import Download from "../components/intro_album/Download";
import PopularAlbum from "../components/intro_album/PopularAlbum";
import NewRelease from "../components/intro_album/NewRelease";
const IntroAlbum = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % artist_with_song.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex == 0 ? artist_with_song.length - 1 : prevIndex - 1
    );
  };
  return (
    <div className="w-full overflow-hidden">
      <div
        className="min-h-screen bg-cover bg-center flex transition-all duration-500 ease-in-out"
        style={{
          backgroundImage: `url(${
            artist_with_song[currentIndex]?.image || assets.background_image
          })`,
        }}
      >
        <div className="container flex flex-col p-20">
          <div className="flex transition-transform duration-500 ease-in-out">
            <div className="flex flex-col gap-20">
              <p className="text-white text-5xl font-bold w-full">
                {artist_with_song[currentIndex].artist}
              </p>
              <div
                className={`columns-2 space-y-7 text-white text-xl font-semibold transition-transform duration-500 ease-in-out`}
              >
                {artist_with_song[currentIndex].songs.map((song, songindex) => (
                  <div key={songindex} className="flex items-center space-x-3">
                    <p className="text-5xl font-bold">
                      {String(songindex + 1).padStart(2, "0")}
                    </p>
                    <p className="text-xl font-light">{song}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-20 flex space-x-4">
        <img
          src={assets.left_arrow_button}
          alt="Previous"
          className="w-12 h-12 cursor-pointer opacity-70 hover:opacity-100 transition"
          onClick={handlePrev}
        />
        <img
          src={assets.right_arrow_button}
          alt="Next"
          className="w-12 h-12 cursor-pointer opacity-70 hover:opacity-100 transition"
          onClick={handleNext}
        />
      </div>

      <PopularAlbum />
      <NewRelease />
      <Download />
    </div>
  );
};

export default IntroAlbum;
