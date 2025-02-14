import React from "react";
import assets from "../../assets/assets";

const TopSongFigure = () => {
  return (
    <div className="container mx-auto p-14 md:px-20 lg:px-32 w-full flex flex-col items-center justify-center overflow-hidden">
      {/* <div className="relative pr-14">
        <div className="w-64 h-64 rounded-lg overflow-hidden shadow-lg">
          <img
            src={assets.TopSongFigure1}
            alt="Background Art"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-14 left-12 w-64 h-64 rounded-lg overflow-hidden shadow-lg">
          <img
            src={assets.TopSongFigure2}
            alt="Microphone"
            className="w-full h-full object-cover"
          />
        </div>
      </div> */}

      {/* <div className="text-left">
        <h2 className="text-4xl font-bold leading-snug">
          MANY TOP SONGS THAT <br /> CAN BE PLAYED FROM <br /> ALL COUNTRIES
        </h2>
        <p className="mt-4 text-white/70">
          Find your favorite music playlist easily and quickly that can be
          accessed anytime, anywhere, and anymore.
        </p>
        <div className="flex justify-center md:justify-start mt-8 gap-16">
          <div>
            <p className="text-4xl font-medium">500K+</p>
            <p className="text-white/70">Famous Singer</p>
          </div>
          <div>
            <p className="text-4xl font-medium">240K+</p>
            <p className="text-white/70">Playlist Song</p>
          </div>
        </div>
      </div> */}
      <div className="flex flex-col md:flex-row gap-20 w-full">
        <div className="relative pr-14 w-full sm:w-1/2 max-w-lg">
          <div className="w-64 h-64 rounded-lg shadow-lg">
            <img
              src={assets.TopSongFigure1}
              alt="Background Art"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-14 left-12 w-64 h-64 rounded-lg shadow-lg">
            <img
              src={assets.TopSongFigure2}
              alt="Microphone"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5 items-start w-full mt-10 sm:mt-0 text-white">
          <p className="text-4xl sm:text-5xl sm:mb-5 max-w-sm sm:max-w-md font-bold text-white">
            MANY TOP SONGS THAT CAN BE PLAYED FROM ALL COUNTRIES
          </p>
          <p className="sm:mb-5 text-white max-w-sm sm:max-w-md">
            Find your favorite music playlist easily and quickly that can be
            accessed anytime, anywhere, and anymore.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-5 md:gap-20 w-full 2xl:pr-28">
            <div>
              <p className="text-3xl sm:text-4xl font-medium">500K+</p>
              <p className="text-white/70">Famous Singer</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-medium">240K+</p>
              <p className="text-white/70">Playlist Song</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSongFigure;
