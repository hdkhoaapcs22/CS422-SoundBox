import mongoose from "mongoose";

const searchHistorySchema = new mongoose.Schema(
  {
    listenerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "listener",
      required: true,
    },
    songID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "song",
      default: null,
    },
    searchedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const searchHistoryModel = mongoose.models.searchHistory ||
mongoose.model("searchHistory", searchHistorySchema);

export default searchHistoryModel;
