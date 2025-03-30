import React, { useContext, useState } from "react";
import { IoShuffle } from "react-icons/io5";
import {
  TbPlayerTrackPrevFilled,
  TbPlayerTrackNextFilled,
} from "react-icons/tb";
import { RxLoop } from "react-icons/rx";
import { FaPlay, FaPause } from "react-icons/fa";
import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";
import { PlayerContext } from "../global/PlayerContext";

const Player = () => {
  const {
    seekBg,
    seekSlider,
    playStatus,
    play,
    pause,
    volume,
    handleVolumeChange,
    isMuted,
    toggleMute,
    time,
    track,
    seekSong,
  } = useContext(PlayerContext);

  return (
    <div
      className="h-full bg-gradient-to-r from-white/35 to-white/20 flex
     items-center justify-between text-white px-6"
    >
      <div className="flex flex-row justify-start gap-4 items-center">
        <img
          src={track.imageUrl}
          alt=""
          className="h-[68px] w-[70px] rounded-lg object-cover"
        />
        <div>
          <p className="text-xl max-w-48 font-semibold">{track.title}</p>
          <p className="text-sm font-thin">{track.name}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <p>
          {time.currentTime.minute}:{time.currentTime.second}
        </p>
        <div
          ref={seekBg}
          onClick={seekSong}
          className="w-[60vw] max-w-[450px] bg-[#707070] rounded-full cursor-pointer"
        >
          <hr
            ref={seekSlider}
            className="h-1 border-none bg-[#B6FF52] rounded-full"
          />
        </div>
        <p>
          {time.totalTime.minute}:{time.totalTime.second}
        </p>
      </div>
      <div className="relative flex items-center justify-center gap-4">
        <IoShuffle className="cursor-pointer" size={25} />
        <TbPlayerTrackPrevFilled className="cursor-pointer" size={25} />
        <div className="w-12 h-12 rounded-full bg-[#B6FF52] flex items-center justify-center cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-[#0F1C2E] flex items-center justify-center">
            {!playStatus ? (
              <FaPlay onClick={play} className="text-[#B6FF52]" size={18} />
            ) : (
              <FaPause onClick={pause} className="text-[#B6FF52]" size={18} />
            )}
          </div>
        </div>
        <TbPlayerTrackNextFilled className="cursor-pointer" size={23} />
        <RxLoop className="cursor-pointer" size={23} />
      </div>
      <div className="flex items-center gap-2">
        <div onClick={toggleMute} className="cursor-pointer">
          {isMuted ? (
            <FaVolumeXmark className="text-white" size={23} />
          ) : (
            <FaVolumeHigh className="text-white" size={23} />
          )}
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => handleVolumeChange(e.target.value)}
          className="w-28 h-2 bg-slate-50 rounded-lg cursor-pointer accent-[#B6FF52]"
        />
      </div>
    </div>
  );
};

export default Player;
