import axios from "axios";

export const fetchTopArtists = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/artist/top-5`
    );
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch top artists:", error);
    return [];
  }
};
