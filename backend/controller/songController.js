import { Song } from "../models/artistModel.js";

export const getNewReleases = async (limit = 10) => {
  try {
    return await Song.find()
      .populate("artistID", "name")
      .sort({ createdAt: -1 })
      .limit(limit);
  } catch (error) {
    console.error("Error fetching new releases:", error);
    throw error;
  }
};

export const getNewReleasesHandler = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10; // Read limit from query params
    const newSongs = await getNewReleases(limit);
    res.status(200).json(newSongs);
  } catch (error) {
    console.error("Error fetching new releases:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getRecentlyPlayed = async (listenerID, limit = 10) => {
  try {
    const history = await History.find({ listenerID })
      .sort({ playedAt: -1 })
      .limit(limit);
    return history;
  } catch (error) {
    console.error("Error fetching recently played songs:", error);
    throw error;
  }
};
