import React, { useState, useEffect, useContext } from "react";
import {
  IoArrowForwardOutline,
  IoArrowBackOutline,
  IoHeartOutline,
  IoHeartSharp,
} from "react-icons/io5";
import { PlayerContext } from "../global/PlayerContext";
import {
  updateLikeCount,
  addToFavorites,
  getFavoriteSongs,
} from "../services/songServices";
import { AppContext } from "../global/AppContext";

const SongList = ({ title, songs }) => {
  const { userId } = useContext(AppContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);
  const { playWithId } = useContext(PlayerContext);
  const [likes, setLikes] = useState({});
  const [likedStatus, setLikedStatus] = useState({});

  useEffect(() => {
    const updateCardsToShow = () => {
      setCardsToShow(window.innerWidth >= 1024 ? 4 : 1);
    };
    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userId || !songs || songs.length === 0) return;

      try {
        const favorites = await getFavoriteSongs(userId);
        const favoriteSongIds = new Set(
          favorites.songs.map((song) => song._id)
        );

        const initialLikes = {};
        const initialLikedStatus = {};

        songs.forEach((song) => {
          initialLikes[song._id] = song.likes || 0;
          initialLikedStatus[song._id] = favoriteSongIds.has(song._id);
        });

        setLikes(initialLikes);
        setLikedStatus(initialLikedStatus);
      } catch (error) {
        console.error("Failed to fetch favorite songs:", error);
      }
    };

    fetchFavorites();
  }, [songs, userId]);

  const nextSlide = () => {
    setCurrentIndex(() =>
      currentIndex + 1 >= songs.length ? 0 : currentIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? songs.length - 1 : prevIndex - 1
    );
  };

  const handleLike = async (songID) => {
    console.log(`Like button clicked for song ID: ${songID}`);
    try {
      const isLiked = likedStatus[songID];
      await updateLikeCount(songID);

      if (!isLiked && userId) {
        await addToFavorites(userId, songID);
      } else if (isLiked && userId) {
        await removeFromFavorites(userId, songID);
      }

      setLikes((prevLikes) => ({
        ...prevLikes,
        [songID]: isLiked ? prevLikes[songID] - 1 : prevLikes[songID] + 1,
      }));
      setLikedStatus((prevStatus) => ({
        ...prevStatus,
        [songID]: !isLiked,
      }));
    } catch (error) {
      console.error("Error liking the song:", error);
    }
  };

  return (
    <div className="flex flex-col text-white px-10 pb-5 w-full overflow-hidden">
      {/* Title and Navigation */}
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-2xl font-bold">{title}</h3>
        <div className="flex flex-row text-[#B6FF52] gap-4">
          <button
            className="cursor-pointer hover:bg-blue-950 p-2 rounded-full"
            onClick={prevSlide}
          >
            <IoArrowBackOutline size={20} />
          </button>
          <button
            className="cursor-pointer hover:bg-blue-950 p-2 rounded-full"
            onClick={nextSlide}
          >
            <IoArrowForwardOutline size={20} />
          </button>
        </div>
      </div>

      {/* Song Cards */}
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
            width: `${songs.length * (100 / cardsToShow)}%`,
          }}
        >
          {songs.map((song, index) => (
            <div
              key={index}
              onClick={() => playWithId(index, songs)}
              className="flex flex-col w-[calc(100% / 4)] p-3 items-center bg-transparent rounded-lg cursor-pointer hover:bg-slate-800"
            >
              <img
                src={song.imageUrl}
                alt={song.title}
                className="w-40 h-40 object-cover rounded-lg"
              />
              <div className="flex flex-row w-full justify-between">
                <div className="flex flex-col pt-2">
                  <p className="text-sm font-bold">{song.title}</p>
                  <p className="text-xs">{song.name || "Unknown Artist"}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(song._id);
                    }}
                  >
                    {likedStatus[song._id] ? (
                      <IoHeartSharp className="text-red-500 w-5 h-5" />
                    ) : (
                      <IoHeartOutline className="w-5 h-5" />
                    )}
                  </button>
                  <span className="text-xs">{likes[song._id]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SongList;
