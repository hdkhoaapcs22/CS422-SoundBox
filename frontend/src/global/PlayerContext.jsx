import { createContext, useEffect, useRef, useState, useContext } from "react";
import { AppContext } from "../global/AppContext";
import axios from "axios";
import {
  addToListeningHistory,
  incrementPlayCount,
} from "../services/songServices";

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
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

    const handleEnded = () => {
      if (currentIndex < queue.length - 1) {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        playWithId(nextIndex, queue);
      } else {
        setPlayStatus(false); // Stop when no more songs
      }
    };

    // Set the ontimeupdate function
    audioRef.current.ontimeupdate = updateTime;
    audioRef.current.onended = handleEnded;

    return () => {
      if (audioRef.current) {
        audioRef.current.ontimeupdate = null;
        audioRef.current.onended = null;
      }
    };
  }, [track, currentIndex, queue]);

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

  const playQueue = (songs) => {
    if (!songs || songs.length === 0) return;
    setQueue(songs);
    setCurrentIndex(0);
    playWithId(0, songs);
  };

  const playWithId = async (id, songsData) => {
    try {
      if (!songsData || !songsData[id]) return;

      const selectedTrack = songsData[id];
      setTrack(selectedTrack);
      if (audioRef.current) {
        audioRef.current.src = selectedTrack.audioUrl;

        // Wait for metadata to load before playing
        await new Promise((resolve) => {
          audioRef.current.onloadedmetadata = () => {
            resolve();
          };
        });

        await audioRef.current.play();
        setPlayStatus(true);
      }

      const playCountResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/songs/play-count/${
          selectedTrack._id
        }`,
        {
          songID: selectedTrack._id,
        }
      );

      if (playCountResponse.status !== 200) {
        console.error("❌ Failed to update play count");
      } else {
        console.log("✅ Play count updated");
      }

      const historyResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/listeninghistory/add`,
        {
          listenerID: userId,
          songID: selectedTrack._id,
        }
      );

      if (historyResponse.status !== 201) {
        console.error("❌ Failed to save listening history");
      } else {
        console.log("✅ Listening history saved");
      }
    } catch (err) {
      console.error("🔥 Global error in playWithId:", err);
    }
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
    queue,
    setQueue,
    currentIndex,
    setCurrentIndex,
    playQueue,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
