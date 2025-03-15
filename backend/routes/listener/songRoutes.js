import express from "express";
import {
  getNewReleasesHandler,
  getRecentlyPlayed,
} from "../../controller/songController.js";

const songRouter = express.Router();

songRouter.get("/new-releases", getNewReleasesHandler);

songRouter.get("/recently-played/:listenerID", async (req, res) => {
  try {
    const { listenerID } = req.params;
    const history = await getRecentlyPlayed(listenerID, 10);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default songRouter;
