import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    listenerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "listener",
      required: true,
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "song",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.playlist ||
  mongoose.model("playlist", playlistSchema);
