import React, { useState, useEffect, useContext } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import SongList from "../SongList";
import { getSongsByArtist } from "../../services/songServices";
import { PlayerContext } from "../../global/PlayerContext";

const ArtistView = ({ artist, onBack }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { playQueue } = useContext(PlayerContext);

  useEffect(() => {
    const fetchSongs = async () => {
      if (!artist || !artist.artistId) return;
      console.log("Fetching songs for artist:", artist.artistId);
      const res = await getSongsByArtist(artist.artistId);
      if (res.success) {
        setSongs(res.data);
      } else {
        console.error("Failed to load songs for artist");
      }
      setLoading(false);
    };

    fetchSongs();
  }, [artist]);

  if (!artist) {
    return <div className="text-white p-6">Loading artist data...</div>;
  }

  if (loading) {
    return <div className="text-white p-6">Loading songs...</div>;
  }

  return (
    <div className="text-white pb-8 min-h-screen">
      <button
        onClick={onBack}
        className="text-[#B6FF52] text-sm font-semibold mb-6 flex items-center gap-2 pl-10"
      >
        <IoIosArrowRoundBack className="text-xl" /> <span>Back</span>
      </button>

      {/* Artist Info */}
      <div className="flex flex-row items-center justify-between mb-10 pl-10">
        <div className="flex flex-row gap-6">
          <img
            src={artist.image}
            alt={artist.artist}
            className="w-40 h-40 object-cover rounded-lg"
          />
          <div className="flex flex-col justify-center gap-5">
            <h1 className="text-4xl font-bold">{artist.artist}</h1>
            {/* Buttons */}
            <div className="flex items-center gap-4">
              <button
                className="bg-[#B6FF52] text-black px-10 py-2 rounded-md font-semibold hover:bg-lime-300 transition"
                onClick={() => playQueue(songs)}
              >
                Play
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Artist Top Track */}
      <SongList title="Top Track" songs={songs} />
    </div>
  );
};

export default ArtistView;
