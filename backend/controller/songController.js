import { Song } from "../models/artistModel.js";
import listeningHistoryModel from "../models/listeningHistoryModel.js";
import songPlayModel from "../models/songPlayModel.js";
import favoriteSongModel from "../models/favouriteSongModel.js";

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
      success: false,
      message: "No search query provided",
    });
  }

  try {
    const songs = await Song.find({
      title: { $regex: query, $options: "i" },
    });

    if (!songs.length) {
      return res.status(404).json({
        success: false,
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

export const getSongByGenre = async (req, res) => {
  const { genre } = req.params;
  try {
    const songs = await Song.find({ genre: genre });

    if (!songs.length) {
      return res.status(404).json({
        success: false,
        message: "No songs found for this genre",
      });
    }

    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get songs by genre",
      error: error.message,
    });
  }
};

let playCountCache = {};

export const addPlayCount = (req, res) => {
  const { songID } = req.params;
  if (!songID) return res.status(400).json({ message: "Song ID is required" });

  const today = new Date().toISOString().split("T")[0];
  const key = `${songID}_${today}`;
  console.log("Play count key:", key);

  if (!playCountCache[key]) {
    playCountCache[key] = 0;
  }

  playCountCache[key] += 1;
  console.log("Play count cache: ", playCountCache);
  console.log(
    "Play count cache updated for key:",
    key,
    "New count:",
    playCountCache[key]
  );
  res
    .status(200)
    .json({ success: true, message: "Play count updated in cache" });
};

// Function to flush the cache to database every 10 minutes
const flushPlayCountsToDB = async () => {
  const entries = Object.entries(playCountCache);

  for (const [key, count] of entries) {
    if (count > 0) {
      const [songID, dateStr] = key.split("_");
      const date = new Date(dateStr);
      // const underscoreIndex = key.indexOf("_");
      // const songID = key.slice(0, underscoreIndex);
      // const dateStr = key.slice(underscoreIndex + 1);
      // const date = new Date(dateStr);
      date.setHours(0, 0, 0, 0);

      await songPlayModel.findOneAndUpdate(
        { songID, date },
        { $inc: { playCount: count } },
        { upsert: true, new: true }
      );
    }
  }

  console.log("Play counts saved to database:", playCountCache);
  playCountCache = {};
};

setInterval(flushPlayCountsToDB, 1 * 60 * 1000);

export const addSongToFavorites = async (req, res) => {
  try {
    const { userId, songId } = req.body;

    if (!userId || !songId) {
      return res.status(400).json({
        success: false,
        message: "Missing userId or songId",
      });
    }

    const updatedFavorites = await favoriteSongModel.findOneAndUpdate(
      { userID: userId },
      { $addToSet: { songs: songId } }, // prevent duplicates
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      message: "Song added to favorites",
      data: updatedFavorites,
    });
  } catch (error) {
    console.error("Error adding song to favorites:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getFavoriteSongs = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Missing userId",
      });
    }

    const fav = await favoriteSongModel
      .findOne({ userID: userId })
      .populate("songs");

    if (!fav || fav.songs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No favorite songs found for this user",
        songs: [],
      });
    }

    res.status(200).json({
      success: true,
      songs: fav.songs,
    });
  } catch (error) {
    console.error("Error fetching favorite songs:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const removeSongFromFavorites = async (req, res) => {
  try {
    const { userId, songId } = req.body;

    if (!userId || !songId) {
      return res.status(400).json({
        success: false,
        message: "Missing userId or songId",
      });
    }

    const updatedFavorites = await favoriteSongModel.findOneAndUpdate(
      { userID: userId },
      { $pull: { songs: songId } },
      { new: true }
    );

    if (!updatedFavorites) {
      return res.status(404).json({
        success: false,
        message: "Favorite list not found for this user",
      });
    }

    res.status(200).json({
      success: true,
      message: "Song removed from favorites",
      data: updatedFavorites,
    });
  } catch (error) {
    console.error("Error removing song from favorites:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getTopSongsInWeek = async (req, res) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const result = await songPlayModel.aggregate([
      {
        $match: {
          date: { $gte: oneWeekAgo },
        },
      },
      // Group by songID and count play count
      {
        $group: {
          _id: "$songID",
          totalPlays: { $sum: "$playCount" },
        },
      },
      // Sort by play count
      { $sort: { totalPlays: -1 } },
      // Limit to top 5
      { $limit: 5 },
      // Join with songs collection
      {
        $lookup: {
          from: "songs",
          localField: "_id",
          foreignField: "_id",
          as: "song",
        },
      },
      { $unwind: "$song" },
      {
        $addFields: {
          "song.totalPlays": "$totalPlays",
        },
      },
      {
        $replaceRoot: { newRoot: "$song" },
      },
    ]);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error("Error fetching top weekly songs:", err);
    res.status(500).json({
      success: false,
      message: "Failed to get top weekly songs",
      error: err.message,
    });
  }
};

export const getMonthlyTopOneHit = async (req, res) => {
  try {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const result = await songPlayModel.aggregate([
      {
        $match: {
          date: { $gte: oneMonthAgo },
        },
      },
      {
        $group: {
          _id: "$songID",
          totalPlays: { $sum: "$playCount" },
        },
      },
      { $sort: { totalPlays: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "songs",
          localField: "_id",
          foreignField: "_id",
          as: "song",
        },
      },
      { $unwind: "$song" },
      {
        $addFields: {
          "song.totalPlays": "$totalPlays",
        },
      },
      {
        $replaceRoot: { newRoot: "$song" },
      },
      {
        $lookup: {
          from: "artists",
          localField: "artistID",
          foreignField: "_id",
          as: "artist",
        },
      },
      { $unwind: "$artist" }, // Flatten artist array
      {
        $project: {
          likes: 1,
          totalPlays: 1,
          title: 1,
          "artist.name": 1,
          "artist.avatarUrl": 1,
        }
      }
    ]);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error("Error fetching monthly top one-hit artist:", err);
    res.status(500).json({
      success: false,
      message: "Failed to get monthly top one-hit artist",
      error: err.message,
    });
  }
}