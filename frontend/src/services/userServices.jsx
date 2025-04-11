import axios from "axios";

export const getUserInformation = async (userId, role) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/${role}/${userId}`
    );
    console.log("User info response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to get user info:", error);
    return { success: false, message: error.message };
  }
};
