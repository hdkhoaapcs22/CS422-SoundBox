import React from "react";
import assets from "../../assets/assets";
import { IoPlaySkipForward } from "react-icons/io5";

const ImageDecoration = () => {
    return (
        <div className="w-1/2 relative">
            <div className="absolute bg-gradient-to-t from-white/20 to-white/35 top-[56px] left-12 rounded-tr-[140px] rounded-tl-[140px] w-[320px] h-[320px] object-cover"></div>
            <img
                src={assets.avatarUser5}
                alt="Music Lover"
                className="w-[300px] rounded-lg z-10 object-cover relative left-14 bottom-16"
            />
            <div className="absolute z-10 left-6 bottom-12 flex items-center justify-center w-20 h-20 rounded-full border-2 bg-gradient-to-r to-[#D9D9D91A] from-[#F5F5F533] border-white/50 backdrop-blur-md shadow-lg">
                <IoPlaySkipForward className="text-white text-3xl" />
            </div>
            <img src={assets.melody2} className="absolute w-full h-24 z-8 top-28" />
            {/* Floating Elements */}
            <div className="absolute top-[290px] left-0 w-20 h-20 bg-pink-400 rounded-full "></div>
            <div className="absolute top-14 right-20 w-20 h-20 bg-pink-400 rounded-full animate-pulse"></div>
            <div className="absolute top-14 left-24 w-7 h-7 bg-pink-400 rounded-full animate-pulse"></div>
        </div>
    );
};

export default ImageDecoration;
