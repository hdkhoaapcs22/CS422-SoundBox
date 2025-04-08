import React from "react";
import SongList from "../SongList";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../global/AppContext";

const RecentlyPlayed = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useContext(AppContext);
  useEffect(() => {
    const fetchRecentlyPlayed = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL +
            `/api/songs/recently-played/${userId}`
        );
        setSongs(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentlyPlayed();
  }, [userId]);

  if (loading) return <p>Loading new releases...</p>;
  if (error) return <p>Error: {error}</p>;

  return <SongList title="Recently Played" songs={songs} />;
};

export default RecentlyPlayed;
