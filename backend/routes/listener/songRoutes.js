import express from "express";
import {
  getNewReleasesHandler,
  getRecentlyPlayed,
  likeSong,
  searchSongs,
  unlikeSong,
  getSongByGenre,
  addPlayCount,
  addSongToFavorites,
  getFavoriteSongs,
  removeSongFromFavorites,
} from "../../controller/songController.js";

const songRouter = express.Router();

songRouter.get("/new-releases", getNewReleasesHandler);
songRouter.get("/recently-played/:listenerID", getRecentlyPlayed);
songRouter.post("/like-song/:songId", likeSong);
songRouter.post("/unlike-song/:songId", unlikeSong);
songRouter.get("/search", searchSongs);
// songRouter.post("/search/save-result", saveSearchedResult);
songRouter.get("/genre/:genre", getSongByGenre);
songRouter.post("/play-count/:songID", addPlayCount);
songRouter.post("/add-to-favorites/:songID", addSongToFavorites);
songRouter.get("/favorites", getFavoriteSongs);
songRouter.post("/remove-from-favorites/:songID", removeSongFromFavorites);
export default songRouter;
