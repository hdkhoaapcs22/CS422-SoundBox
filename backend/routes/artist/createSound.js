import express from 'express';
import {createSong, createAlbum} from '../../controller/artist/createSoundController.js';
import upload from '../../middleware/multer.js';

const createSoundRouter = express.Router();

createSoundRouter.post('/add-song', upload.fields([{name: 'image', maxCount: 1},{name: 'audio', maxCount: 1}]),  createSong);
createSoundRouter.post("/add-album", upload.fields([
    { name: "albumImage", maxCount: 1 },
    { name: "songs[image]", maxCount: 10 },
    { name: "songs[audio]", maxCount: 10 },
]), createAlbum);

export default createSoundRouter;