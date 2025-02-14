import React from "react";
import assets from "../../assets/assets";
import { IoPlaySkipForward } from "react-icons/io5";

const ExpressYourselfSection = () => {
  return (
    <div className="flex flex-col relative text-white pt-16 py-0 w-full h-full min-h-[120vh] overflow-hidden">
      {/* Left Section: Text */}
      <div className="flex gap-32">
        <h1 className="text-7xl sm:text-8xl md:text-9xl pl-28 sm:pl-40 md:pl-[250px] font-semibold leading-4">
          EXPRESS
        </h1>
        <span
          className="absolute rounded-full bg-[#E97FF1]
        w-10 h-10 md:w-12 md:h-12 left-[480px] sm:left-[640px] md:left-[900px]
        top-5 sm:top-20"
        ></span>
        <div
          className="absolute flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 
        rounded-full border-2 right-48 bg-gradient-to-r to-[#D9D9D91A] from-[#F5F5F533] 
        border-white/50 backdrop-blur-md shadow-lg 
        left-[450px] sm:left-[600px] md:left-[850px]
        top-5 sm:top-20"
        >
          <IoPlaySkipForward className="text-white text-2xl md:text-3xl" />
        </div>
      </div>
      <h6 className="text-3xl sm:text-4xl md:text-5xl pl-[420px] sm:pl-[550px] md:pl-[800px] mt-0 font-light">
        in music
      </h6>
      <h1 className="text-7xl sm:text-8xl md:text-9xl pl-44 sm:pl-52 md:pl-[350px] font-semibold">
        YOURSELF
      </h1>
      <div className="flex flex-col items-center mt-5 relative">
        <img
          src={assets.home_decoration}
          alt="Decoration"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 z-10"
        />
        <div className="relative flex w-full justify-center">
          <img src={assets.melody1} className="w-full relative" />
          <img
            src={assets.listen_popular_icon}
            className="absolute top-0 left-10 w-1/6"
          />
        </div>
      </div>

      {/* <img
        src={assets.home_decoration}
        alt=""
        className="w-1/5 sm:w-1/4 -mt-36 mb-20 z-0"
      /> */}
    </div>
  );
};

export default ExpressYourselfSection;
