import express from "express";
import { getTop5ArtistsByPlayCount, getSongsByArtist } from "../../controller/artist/artistController.js";
const artistRouter = express.Router();

artistRouter.get("/top-5", getTop5ArtistsByPlayCount);
artistRouter.get("/:artistId", getSongsByArtist);

export default artistRouter;
