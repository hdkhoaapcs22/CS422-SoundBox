import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaShareAlt } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { PlayerContext } from "../../global/PlayerContext";

const SoundView = ({ genre, onBack }) => {
  const { playQueue, playWithId } = useContext(PlayerContext);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenreSongs = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/songs/genre/${genre.toLowerCase()}`
        );
        setSongs(res.data);
        console.log("Song by genre", res.data);
      } catch (err) {
        console.error("Error fetching songs by genre:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGenreSongs();
  }, [genre]);

  if (loading) return <div>Loading {genre} songs...</div>;

  return (
    <div className="text-white">
      <button
        onClick={onBack}
        className="text-[#B6FF52] text-sm font-semibold mb-6 flex items-center gap-2"
      >
        <IoIosArrowRoundBack className="text-xl" /> <span>Back</span>
      </button>

      {/* Genre Info */}
      <div className="flex flex-row items-center justify-between mb-10">
        <div className="flex flex-col justify-center">
          <p className="text-lg text-gray-400">Genre</p>
          <h1 className="text-6xl font-bold capitalize">{genre}</h1>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button
            className="bg-[#B6FF52] text-black px-10 py-2 rounded-md font-semibold hover:bg-lime-300 transition"
            onClick={() => playQueue(songs)}
          >
            Play All
          </button>
          <FaShareAlt className="text-white cursor-pointer" size={18} />
        </div>
      </div>

      {/* Playlist Songs */}
      {songs.length === 0 ? (
        <div>No songs found for {genre}.</div>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">Songs</h2>

          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-600 text-gray-400">
              <tr>
                <th className="pl-2 py-2">#</th>
                <th className="py-2">Song</th>
                <th className="py-2">Artist</th>
                <th className="py-2">Stream Count</th>
                <th className="py-2">Likes</th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song, index) => (
                <tr
                  key={song._id}
                  className="cursor-pointer hover:bg-slate-800 hover:bg-opacity-50 transition-all duration-200 rounded-lg overflow-hidden"
                  onClick={() => playWithId(index, songs)}
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
                  <td className="py-3">{song.name}</td>
                  <td className="py-3">
                    {song.streams?.toLocaleString() || "—"}
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
        </>
      )}
    </div>
  );
};

export default SoundView;
