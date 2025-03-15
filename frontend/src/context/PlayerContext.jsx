import { createContext, useRef, useState } from "react";
import assets from "../assets/assets";
export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef(null);
  const seekBg = useRef(null);
  const seekSlider = useRef(null);

  const [track, setTrack] = useState({
    name: "Until I Found You",
    artist: "Stephen Sanchez",
    cover: assets.sound_banner_1,
    duration: 200,
    currentTime: 0,
    isPlaying: false,
  });

  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const contextValue = {
    audioRef,
    seekBg,
    seekSlider,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play, pause
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
