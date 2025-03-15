import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    audioUrl: {
      type: String,
      required: true,
    },
    collaborators: {
      type: [String],
      default: [],
    },
    likes: {
      type: Number,
      default: 0,
    },
    lyrics: {
      type: String,
      default: "",
    },
    duration: {
      type: Number,
      required: true,
    },
    artistID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "artist",
      required: true,
    },
    albumID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "album",
      default: null,
    },
  },
  { timestamps: true }
);

const albumSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    artistID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "artist",
      required: true,
    },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "song"}],
  },
  { timestamps: true }
);

const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Anonymous",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatarUrl: {
      type: String,
      default:
        "https://res.cloudinary.com/df1i75amy/image/upload/v1737724061/Frame_ipoi4s.png",
    },
    gender: {
      type: String,
      default: "Unknown",
    },
    phone: {
      type: String,
      default: "0000000000",
    },
    identityCard: {
      type: String,
      default: "0000000000000000",
    },
    password: {
      type: String,
      required: true,
    },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "song" }],
    albums: [{ type: mongoose.Schema.Types.ObjectId, ref: "album" }],
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const artistModel =
  mongoose.models.artist || mongoose.model("artist", artistSchema);
const Song = mongoose.models.song || mongoose.model("song", songSchema);
const Album = mongoose.models.album || mongoose.model("album", albumSchema);

export { artistModel, Song, Album };
