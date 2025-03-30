import React from "react";
import SongList from "../SongList";
import { useEffect, useState } from "react";
import axios from "axios";

const NewRelease = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchNewReleases = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/songs/new-releases"
        );
        setSongs(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewReleases();
  }, []);

  if (loading) return <p>Loading new releases...</p>;
  if (error) return <p>Error: {error}</p>;

  return <SongList title="New Release" songs={songs} />;
};

export default NewRelease;
