import axios from "axios";

export const getRecentlyPlayed = async (listenerID, limit = 10) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/recently-played/${listenerID}`
    );

    console.log("Fetched recently played songs:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching recently played songs:", error);
    return [];
  }
};

export const updateLikeCount = async (songID, like = true) => {
  try {
    const response = like ? await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/songs/like-song/${songID}`
    ) : await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/songs/unlike-song/${songID}`
    );
    return response.data;
  } catch (error) {
    console.error("Error liking song:", error);
    throw error;
  }
};