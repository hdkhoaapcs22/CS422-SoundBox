import listeningHistoryModel from "../models/listeningHistoryModel.js";

export const addSongListeningHistory = async (req, res) => {
  const { listenerID, songID } = req.body;

  try {
    const newHistory = new listeningHistoryModel({
      listenerID,
      songID,
    });

    await newHistory.save();

    res.status(201).json({
      success: true,
      message: "Listening history saved successfully.",
      data: newHistory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to save listening history",
      error: error.message,
    });
  }
};

export const getListeningHistory = async (req, res) => {
  const { listenerID } = req.params;

  try {
    const history = await listeningHistoryModel.find({ listenerID }).populate({
      path: "songID",
      select: "title name imageUrl",
    });

    if (!history || history.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No listening history found for this listener.",
      });
    }

    res.status(200).json({
      success: true,
      data: history.map((entry) => ({
        songTitle: entry.songID.title,
        artistName: entry.songID.name,
        imageUrl: entry.songID.imageUrl,
        playedAt: entry.playedAt,
      })),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve listening history",
      error: error.message,
    });
  }
};
