import React, { useEffect, useState, useContext } from "react";
import { FaHeart, FaShareAlt } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { PlayerContext } from "../../global/PlayerContext";
import axios from "axios";

const AlbumView = ({ albumId, onBack }) => {
  const { playQueue, playWithId } = useContext(PlayerContext);
  const [songs, setSongs] = useState([]);
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/album/${albumId}`
        );
        setAlbum(res.data);

        const songRes = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/album/${albumId}/songs`
        );
        setSongs(songRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbum();
  }, [albumId]);

  if (loading) return <div>Loading album...</div>;
  if (!album) return <div>Album not found.</div>;

  return (
    <div className="text-white px-10 pb-8 min-h-screen">
      <button
        onClick={onBack}
        className="text-[#B6FF52] text-sm font-semibold mb-6 flex items-center gap-2"
      >
        <IoIosArrowRoundBack className="text-xl" /> <span>Back</span>
      </button>

      {/* Album Info */}
      <div className="flex flex-row items-center justify-between mb-10">
        <div className="flex flex-row gap-6">
          <img
            src={album.image}
            alt={album.name}
            className="w-40 h-40 object-cover rounded-lg"
          />
          <div className="flex flex-col justify-center">
            <p className="text-sm text-gray-400">Playlist</p>
            <h1 className="text-4xl font-bold">{album.name}</h1>
            <p className="text-sm text-gray-300 mt-2 w-60">
              {album.description || "Enjoy this amazing album."}
            </p>
            <p className="text-sm mt-2 text-gray-400">
              Created by{" "}
              <span className="text-white font-semibold">
                {album.artistID?.name || "Unknown"}
              </span>
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button
            className="bg-[#B6FF52] text-black px-10 py-2 rounded-md font-semibold hover:bg-lime-300 transition"
            onClick={() => playQueue(songs)}
          >
            Play
          </button>
          <FaShareAlt className="text-white cursor-pointer" size={18} />
        </div>
      </div>

      {/* Playlist Songs */}
      <h2 className="text-xl font-bold mb-4">Playlist Song</h2>

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
                  src={song.image || album.image}
                  alt={song.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <span className="font-semibold">{song.title}</span>
              </td>
              <td className="py-3">
                {(() => {
                  const mainArtist =
                    song.artist?.name || album.artistID?.name || "Unknown";
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
              <td className="py-3">{song.streams?.toLocaleString() || "—"}</td>
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

export default AlbumView;
