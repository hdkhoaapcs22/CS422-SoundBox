import mongoose from "mongoose";

const listeningHistorySchema = new mongoose.Schema(
  {
    listenerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "listener",
      required: true,
    },
    songID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "song",
      required: true,
    },
    playedAt: {
      type: Date,
      default: Date.now,
    }
  },
  { timestamps: true }
);

const listeningHistoryModel = mongoose.models.listeninghistory || mongoose.model("listeningHistory", listeningHistorySchema);

export default listeningHistoryModel;
