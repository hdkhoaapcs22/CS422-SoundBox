import express from "express";
import {
  getNewReleasesHandler,
  getRecentlyPlayed,
  likeSong,
  searchSongs,
  unlikeSong,
} from "../../controller/songController.js";

const songRouter = express.Router();

songRouter.get("/new-releases", getNewReleasesHandler);
songRouter.get("/recently-played/:listenerID", getRecentlyPlayed);

songRouter.post('/like-song/:songId', likeSong);
songRouter.post('/unlike-song/:songId', unlikeSong);
songRouter.get('/search', searchSongs);

export default songRouter;
