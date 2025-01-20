import React from "react";
import assets from "../../assets/assets";
import { IoPlaySkipForward } from "react-icons/io5";

const ExpressYourselfSection = () => {
    return (
        <div className="relative text-white pt-16 py-0">
            {/* Left Section: Text */}
            <div className="flex gap-32 items-center justify-center">
                <h1 className="text-9xl font-medium leading-4">EXPRESS</h1>
                <span className="rounded-full bg-[#E97FF1] w-12 h-12"></span>
                <div className="absolute flex items-center justify-center w-20 h-20 rounded-full border-2 right-48 bg-gradient-to-r to-[#D9D9D91A] from-[#F5F5F533] border-white/50 backdrop-blur-md shadow-lg">
                    <IoPlaySkipForward className="text-white text-3xl" />
                </div>
            </div>
            <h6 className="pl-[860px] text-4xl mt-0">in music</h6>
            <h1 className="text-9xl font-medium leading-tight pl-80">
                YOURSELF
            </h1>

            {/* Right Section: Image with Green Background */}
            <div className="-mx-60 relative">
                <img src={assets.melody1} className="w-full h-24" />
            </div>
                <div className="relative bottom-36 h-[400px] w-full">
                    {/* Background shape */}
                    <div className="absolute top-[120px] left-80 w-[300px] h-[320px] bg-[#B6FF52] rounded-tr-[120px] rounded-tl-[120px]"></div>
                    <div className="absolute top-32 w-16 h-16 bg-[#E97FF1] rounded-full right-[430px]"></div>

                    {/* Person Image */}
                    <img
                        src={assets.avatarUser5}
                        alt="User Listening"
                        className="absolute w-[300px] h-auto object-cover z-10 drop-shadow-2xl left-[320px] "
                    />
                </div>
        </div>
    );
};

export default ExpressYourselfSection;
