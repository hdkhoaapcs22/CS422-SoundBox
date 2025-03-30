import { createContext, useEffect, useRef, useState, useContext } from "react";
import { AppContext } from "../global/AppContext";
import axios from "axios";
export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef(null);
  const seekBg = useRef(null);
  const seekSlider = useRef(null);
  const { userId } = useContext(AppContext);
  const [track, setTrack] = useState({
    title: "Handlebars",
    artistName: "Jennie",
    imageUrl:
      "https://res.cloudinary.com/df1i75amy/image/upload/v1741835934/u6nekzrydjsr8yeg6fpm.jpg",
    audioUrl:
      "https://res.cloudinary.com/df1i75amy/video/upload/v1741835936/jm4qrmij0sm7c9yuymjx.mp3",
    duration: 184.73,
    currentTime: 0,
    isPlaying: false,
  });

  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: "00",
      minute: "0",
    },
    totalTime: {
      second: "00",
      minute: "0",
    },
  });

  useEffect(() => {
    if (!audioRef.current) return;

    const updateTime = () => {
      if (!audioRef.current || !seekSlider.current) return;

      // Update the slider width based on current progress
      seekSlider.current.style.width =
        Math.floor(
          (audioRef.current.currentTime / audioRef.current.duration) * 100
        ) + "%";

      // Update the current and total time
      setTime({
        currentTime: {
          second: String(
            Math.floor(audioRef.current.currentTime % 60)
          ).padStart(2, "0"),
          minute: String(Math.floor(audioRef.current.currentTime / 60)),
        },
        totalTime: {
          second: String(Math.floor(audioRef.current.duration % 60)).padStart(
            2,
            "0"
          ),
          minute: String(Math.floor(audioRef.current.duration / 60)),
        },
      });
    };

    // Set the ontimeupdate function
    audioRef.current.ontimeupdate = updateTime;

    return () => {
      if (audioRef.current) {
        audioRef.current.ontimeupdate = null; // Clean up the event listener
      }
    };
  }, []);

  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);

  const handleVolumeChange = (value) => {
    if (!audioRef.current) return;
    const newVolume = value / 100;
    setVolume(value);
    audioRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    setIsMuted(!isMuted);
    audioRef.current.muted = !isMuted;
  };

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const seekSong = (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  const playWithId = async (id, songsData) => {
    if (!songsData || !songsData[id]) return;
    const selectedTrack = songsData[id];
    setTrack(selectedTrack);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/listeninghistory/add`,
        {
          listenerID: userId,
          songID: selectedTrack._id,
        }
      );

      if (response.status !== 201) {
        throw new Error("Failed to save listening history");
      }
    } catch (error) {
      console.error("Error saving listening history:", error);
    }
    await audioRef.current.play();
    setPlayStatus(true);
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
    play,
    pause,
    handleVolumeChange,
    volume,
    isMuted,
    toggleMute,
    seekSong,
    playWithId,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
