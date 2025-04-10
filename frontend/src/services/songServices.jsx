import axios from "axios";

export const getRecentlyPlayed = async (listenerID, limit = 10) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/recently-played/${listenerID}`
    );
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
    console.error("Error fetching recently played songs:", error);
    return [];
  }
};

export const addToListeningHistory = async (listenerID, songID) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/listeninghistory/add`,
      {
        listenerID,
        songID,
      }
    );
    return response;
  } catch (error) {
    console.error("Error saving listening history:", error);
  }
};

export const incrementPlayCount = async (songID) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/songs/play-count/${songID}`,
      {
        songID,
      }
    );
    return response;
  } catch (error) {
    console.error("Error updating play count:", error);
  }
};

export const getSongsByArtist = async (artistID) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/artist/${artistID}`,
      {
        params: { artistID },
      }
    );
    console.log("Response from getSongsByArtist:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching songs:", error);
    return [];
  }
};
