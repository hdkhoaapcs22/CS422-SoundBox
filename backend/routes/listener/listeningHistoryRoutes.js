import express from "express";
import {
  addSongListeningHistory,
  getListeningHistory,
} from "../../controller/listeningHistoryController.js";

const listeningHistoryRouter = express.Router();

listeningHistoryRouter.post("/add", addSongListeningHistory);
listeningHistoryRouter.get("/:listenerID", getListeningHistory);

export default listeningHistoryRouter;
