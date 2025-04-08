import express from "express";
import { getNewAlbumHandler, getSongsByAlbumId, getAlbumById } from "../../controller/albumController.js";
const albumRouter = express.Router();

albumRouter.get("/new-album", getNewAlbumHandler);
albumRouter.get("/:albumId/songs", getSongsByAlbumId);
albumRouter.get("/:id", getAlbumById);

export default albumRouter;
