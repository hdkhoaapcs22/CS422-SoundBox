import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../global/AppContext";
import { getFavoriteSongs } from "../../services/songServices";
import { IoHeartOutline } from "react-icons/io5";
import { RiPokerHeartsFill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { PlayerContext } from "../../global/PlayerContext";

const Favorite = () => {
  const { playQueue, playWithId } = useContext(PlayerContext);
  const { userId } = useContext(AppContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userId) return;

      try {
        const favSongs = await getFavoriteSongs(userId);
        if (!favSongs || !favSongs.songs) {
          console.log("No favorite songs found or invalid response:", favSongs);
          return;
        }
        console.log("Favorite songs:", favSongs.songs);
        setFavorites(favSongs.songs);
      } catch (error) {
        console.error("Failed to load favorite songs:", error);
      }
    };

    fetchFavorites();
  }, [userId]);
  return (
    <div className="text-white px-10 pb-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-row items-center justify-between mb-6">
        <div className="flex flex-row gap-6 items-center">
          <div className="w-32 h-32 bg-gradient-to-b from-[#94E822] to-[#D5F7A6] rounded-lg flex items-center justify-center">
            <RiPokerHeartsFill className="text-white text-6xl" />
          </div>
          <div>
            <p className="uppercase text-sm font-semibold text-gray-300">
              Playlist
            </p>
            <h1 className="text-5xl font-extrabold text-white">
              Your Favorite
            </h1>
          </div>
        </div>

        {/* Play Button */}
        <div className="mt-6">
          <button
            className="bg-[#B6FF52] text-black px-10 py-2 rounded-md font-semibold hover:bg-lime-300 transition"
            onClick={() => playQueue(favorites)}
          >
            Play
          </button>
        </div>
      </div>

      <table className="w-full text-left text-sm">
        <thead className="border-b border-gray-600 text-gray-400">
          <tr>
            <th className="pl-2 py-2">#</th>
            <th className="py-2">Song</th>
            <th className="py-2">Artist</th>
            <th className="py-2">Likes</th>
          </tr>
        </thead>
        <tbody>
          {favorites.map((song, index) => (
            <tr
              key={song._id}
              className="cursor-pointer hover:bg-slate-800 hover:bg-opacity-50 transition-all duration-200 rounded-lg overflow-hidden"
              onClick={() => playWithId(index, favorites)}
            >
              <td className="pl-2 py-3">
                {String(index + 1).padStart(2, "0")}
              </td>
              <td className="py-3 flex items-center gap-3">
                <img
                  src={song.imageUrl}
                  alt={song.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <span className="font-semibold">{song.title}</span>
              </td>
              <td className="py-3">
                {(() => {
                  const mainArtist = song.name || "Unknown";
                  const validCollaborators = (song.collaborators || []).filter(
                    (c) => c.trim() !== ""
                  );
                  const collaborators =
                    validCollaborators.length > 0
                      ? `, ${validCollaborators.join(", ")}`
                      : "";
                  return `${mainArtist}${collaborators}`;
                })()}
              </td>
              <td className="py-3 gap-1">
                <div className="inline-flex items-center gap-1">
                  <FaHeart />
                  <span>{song.likes || 0}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Favorite;
