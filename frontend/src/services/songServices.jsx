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
