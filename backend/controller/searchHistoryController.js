import searchHistoryModel from "../models/searchHistoryModel.js";
import { Song } from "../models/artistModel.js";
export const saveSearchedResult = async (req, res) => {
  try {
    const { listenerID, songID } = req.body;

    const existingHistory = await searchHistoryModel.findOne({
      listenerID: listenerID,
      songID: songID,
    });

    if (existingHistory) {
      existingHistory.searchedAt = Date.now();

      await existingHistory.save();

      return res.status(200).json({
        message: "Update timestamp",
      });
    }

    const newHistory = new searchHistoryModel({
      listenerID,
      songID,
    });
    await newHistory.save();
    res.status(200).json({
      success: true,
      message: "Search result saved successfully",
    });
  } catch (error) {
    console.error("Error saving search result:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRecentSearch = async (req, res) => {
  const { listenerID } = req.params;

  try {
    const searchHistory = await searchHistoryModel
      .find({ listenerID })
      .sort({ searchedAt: -1 });

    if (!searchHistory || searchHistory.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No recently played songs found for this user.",
      });
    }

    const songIDs = searchHistory.map((entry) => entry.songID);

    const songs = await Song.find({ _id: { $in: songIDs } });

    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve recently played songs",
      error: error.message,
    });
  }
};

export const deleteSearchHistory = async (req, res) => {
  try {
    const { listenerID, songID } = req.params;

    const deletedHistory = await searchHistoryModel.findOneAndDelete({
      listenerID: listenerID,
      songID: songID,
    });

    if (!deletedHistory) {
      return res.status(404).json({
        success: false,
        message: "Search history not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Search history deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting search history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete search history",
      error: error.message,
    });
  }
};

export const deleteAllSearchHistory = async (req, res) => {
  const { listenerID } = req.params;

  try {
    const result = await searchHistoryModel.deleteMany({ listenerID });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No search history found for this user.",
      });
    }

    res.status(200).json({
      success: true,
      message: "All search history cleared.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to clear search history.",
      error: error.message,
    });
  }
};
