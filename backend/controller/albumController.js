import { Album } from "../models/artistModel.js";

export const getNewAlbum = async (limit = 20) => {
  try {
    return await Album.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("artistID", "name avatarUrl");
  } catch (error) {
    console.error("Error fetching new releases:", error);
    throw error;
  }
};

export const getNewAlbumHandler = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const newSongs = await getNewAlbum(limit);
    res.status(200).json(newSongs);
  } catch (error) {
    console.error("Error fetching new releases:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAlbumById = async (req, res) => {
  const { id } = req.params;

  try {
    const album = await Album.findById(id).populate(
      "artistID",
      "name avatarUrl"
    );

    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    res.status(200).json(album);
  } catch (error) {
    console.error("Error fetching album:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getSongsByAlbumId = async (req, res) => {
  const { albumId } = req.params;

  try {
    const album = await Album.findById(albumId).populate("songs");

    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    res.status(200).json(album.songs);
  } catch (error) {
    console.error("Error fetching album songs:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
