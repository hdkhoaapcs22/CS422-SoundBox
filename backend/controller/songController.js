import { Song } from "../models/artistModel.js";
import listeningHistoryModel from "../models/listeningHistoryModel.js";

export const getNewReleases = async (limit = 20) => {
  try {
    return await Song.find().sort({ createdAt: -1 }).limit(limit);
  } catch (error) {
    console.error("Error fetching new releases:", error);
    throw error;
  }
};

export const getNewReleasesHandler = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const newSongs = await getNewReleases(limit);
    res.status(200).json(newSongs);
  } catch (error) {
    console.error("Error fetching new releases:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getRecentlyPlayed = async (req, res) => {
  const { listenerID } = req.params;

  try {
    const distinctSongIDs = await listeningHistoryModel
      .distinct("songID", {
        listenerID,
      })
      .sort({ playedAt: -1 });

    if (!distinctSongIDs || distinctSongIDs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No recently played songs found for this user.",
      });
    }

    const songs = await Song.find({ _id: { $in: distinctSongIDs } })
      .sort({ playedAt: -1 })
      .limit(20);

    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve recently played songs",
      error: error.message,
    });
  }
};

export const likeSong = async (req, res) => {
  try {
    const { songId } = req.params;
    const song = await Song.findById(songId);

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    song.likes += 1;
    await song.save();

    res.status(200).json({ message: "Song liked successfully", song });
  } catch (error) {
    console.error("Error liking song:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const unlikeSong = async (req, res) => {
  try {
    const { songId } = req.params;
    const song = await Song.findById(songId);

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    if (song.likes > 0) {
      song.likes -= 1;
      await song.save();
    }

    res.status(200).json({ message: "Song unliked successfully", song });
  } catch (error) {
    console.error("Error unliking song:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const searchSongs = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({
      message: "No search query provided",
    });
  }

  try {
    const songs = await Song.find({
      title: { $regex: query, $options: "i" },
    });

    if (!songs.length) {
      return res.status(404).json({
        message: "No songs found matching the search query",
      });
    }

    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to search songs",
      error: error.message,
    });
  }
};
