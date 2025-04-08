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
    const response = like
      ? await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/songs/like-song/${songID}`
        )
      : await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/songs/unlike-song/${songID}`
        );
    return response.data;
  } catch (error) {
    console.error("Error liking song:", error);
    throw error;
  }
};

export const addToFavorites = async (userId, songId) => {
  return await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/songs/add-to-favorites/${songId}`,
    {
      userId,
      songId,
    }
  );
};

export const removeFromFavorites = async (userId, songId) => {
  return await axios.post(
    `${
      import.meta.env.VITE_BACKEND_URL
    }/api/songs/remove-from-favorites/${songId}`,
    {
      userId,
      songId,
    }
  );
};

export const getFavoriteSongs = async (userId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/songs/favorites`,
      {
        params: { userId },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching favorite songs:", error);
    console.error("Error fetching recently played songs:", error);
    return [];
  }
};
