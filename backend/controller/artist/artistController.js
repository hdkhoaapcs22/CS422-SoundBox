import songPlayModel from "../../models/songPlayModel.js";
import { Song } from "../../models/artistModel.js";

export const getTop5ArtistsByPlayCount = async (req, res) => {
  try {
    const result = await songPlayModel.aggregate([
      // Group play count by song
      {
        $group: {
          _id: "$songID",
          totalPlayCount: { $sum: "$playCount" },
        },
      },
      // Join with songs to get artist info
      {
        $lookup: {
          from: "songs", // collection name
          localField: "_id",
          foreignField: "_id",
          as: "song",
        },
      },
      { $unwind: "$song" },
      {
        $group: {
          _id: "$song.artistID", // group by artist
          totalPlays: { $sum: "$totalPlayCount" },
        },
      },
      {
        $lookup: {
          from: "artists",
          localField: "_id", // artistID
          foreignField: "_id",
          as: "artistInfo",
        },
      },
      { $unwind: "$artistInfo" },
      { $sort: { totalPlays: -1 } },
      { $limit: 5 },
      {
        $project: {
          _id: 0,
          totalPlays: 1,
          artistInfo: {
            _id: "$artistInfo._id",
            name: "$artistInfo.name",
            avatarUrl: "$artistInfo.avatarUrl",
            gender: "$artistInfo.gender",
            email: "$artistInfo.email",
          },
        },
      },
    ]);

    res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error("Error fetching top artists:", err);
    res.status(500).json({
      success: false,
      message: "Failed to get top artists",
      error: err.message,
    });
  }
};

export const getSongsByArtist = async (req, res) => {
  const { artistId } = req.params;

  try {
    const songs = await Song.find({ artistID: artistId }).sort({
      createdAt: -1,
    });

    console.log("Songs fetched for artist:", artistId, songs);

    res.status(200).json({
      success: true,
      data: songs,
    });
  } catch (err) {
    console.error("Error fetching songs by artist:", err);
    res.status(500).json({
      success: false,
      message: "Failed to get songs by artist",
      error: err.message,
    });
  }
};
