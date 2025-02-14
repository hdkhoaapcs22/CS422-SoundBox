import React, { useState, useRef, useEffect } from "react";
import assets, { artist_with_song } from "../assets/assets";
import Download from "../components/intro_album/Download";
import PopularAlbum from "../components/intro_album/PopularAlbum";
import NewRelease from "../components/intro_album/NewRelease";
const IntroAlbum = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const childWidth =
        scrollContainerRef.current.firstChild?.offsetWidth || 1;
      const index = Math.round(scrollLeft / childWidth);
      setCurrentIndex(index);
    }
  };
  return (
    <div className="w-full overflow-hidden" id="IntroAlbum">
      <div
        className="min-h-screen bg-cover bg-center flex transition-all duration-500"
        style={{
          backgroundImage: `url(${
            artist_with_song[currentIndex]?.image || assets.background_image
          })`,
        }}
      >
        <div className="container flex flex-col p-20">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto scrollbar-hide scroll-smooth"
          >
            {artist_with_song.map((artist, index) => (
              <div key={index} className="flex flex-col gap-20">
                <p className="text-white text-5xl font-bold w-full">
                  {artist.artist}
                </p>
                <div className="columns-2 space-y-7 text-white text-xl font-semibold">
                  {artist.songs.map((song, songindex) => (
                    <div
                      key={songindex}
                      className="flex items-center space-x-3"
                    >
                      <p className="text-5xl font-bold">
                        {String(songindex + 1).padStart(2, "0")}
                      </p>
                      <p className="text-xl font-light">{song}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PopularAlbum />
      <NewRelease />
      <Download />
    </div>
  );
};

export default IntroAlbum;
