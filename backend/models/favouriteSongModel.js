import mongoose from "mongoose";

const favoriteSongSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "song" }],
});

const favoriteSongModel =
  mongoose.models.favoriteSong ||
  mongoose.model("favoriteSong", favoriteSongSchema);

export default favoriteSongModel;
