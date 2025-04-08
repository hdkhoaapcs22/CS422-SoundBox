import mongoose from "mongoose";

const SongPlaySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: () => new Date().setHours(0, 0, 0, 0), // Store only the day
    unique: false,
  },
  songID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "song",
    required: true,
  },
  playCount: {
    type: Number,
    default: 0,
  },
});

SongPlaySchema.index({ date: 1, songID: 1 }, { unique: true });

const songPlayModel =
  mongoose.models.songPlay || mongoose.model("songPlay", SongPlaySchema);

export default songPlayModel;
