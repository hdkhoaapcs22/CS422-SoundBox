import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { IoShuffle } from "react-icons/io5";
import {
  TbPlayerTrackPrevFilled,
  TbPlayerTrackNextFilled,
} from "react-icons/tb";
import { RxLoop } from "react-icons/rx";
import { FaPlay, FaPause } from "react-icons/fa";
import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";
import { PlayerContext } from "../context/PlayerContext";

const Player = () => {
  const { seekBg, seekSlider, playStatus, play, pause } =
    useContext(PlayerContext);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setVolume(isMuted ? 50 : 0);
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    setIsMuted(event.target.value === "0");
  };
  return (
    <div
      className="h-full bg-gradient-to-b from-white/35 to-white/20 flex
    justify-between items-center text-white px-4"
    >
      <div className="flex flex-row items-center gap-4">
        <img
          src={assets.sound_banner_1}
          alt=""
          className="h-[70px] w-[70px] rounded-lg object-cover"
        />
        <div>
          <p className="text-xl max-w-48 font-semibold">Until I Found You</p>
          <p className="text-sm font-thin">Stephen Sanchez</p>
        </div>
        <div className="flex items-center gap-4 pl-8">
          <p>1:06</p>
          <div
            ref={seekBg}
            className="w-[60vw] max-w-[450px] bg-[#707070] rounded-full cursor-pointer"
          >
            <hr
              ref={seekSlider}
              className="h-1 border-none w-20 bg-[#B6FF52] rounded-full"
            />
          </div>
          <p>3:20</p>
        </div>
        <div className="relative flex items-center justify-center gap-4 pl-8">
          <IoShuffle className="cursor-pointer" size={25} />
          <TbPlayerTrackPrevFilled className="cursor-pointer" size={25} />
          <div className="w-14 h-14 rounded-full bg-[#B6FF52] flex items-center justify-center cursor-pointer">
            <div className="w-11 h-11 rounded-full bg-[#0F1C2E] flex items-center justify-center">
              {playStatus ? (
                <FaPlay onClick={play} className="text-[#B6FF52]" size={20} />
              ) : (
                <FaPause onClick={pause} className="text-[#B6FF52]" size={20} />
              )}
            </div>
          </div>
          <TbPlayerTrackNextFilled className="cursor-pointer" size={25} />
          <RxLoop className="cursor-pointer" size={25} />
        </div>
        <div className="flex items-center gap-2 pl-8">
          <div onClick={toggleMute} className="cursor-pointer">
            {isMuted ? (
              <FaVolumeXmark className="text-white" size={25} />
            ) : (
              <FaVolumeHigh className="text-white" size={25} />
            )}
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-1 bg-slate-50 rounded-lg cursor-pointer accent-[#B6FF52]"
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
