import express from 'express';
import {createSong, createAlbum, updateSong} from '../../controller/artist/crudSoundController.js';
import upload from '../../middleware/multer.js';

const crudSoundRouter = express.Router();

crudSoundRouter.post("/add-song", upload.fields([{name: 'image', maxCount: 1},{name: 'audio', maxCount: 1}]), createSong);
crudSoundRouter.post("/add-album", upload.fields([
    { name: "albumImage", maxCount: 1 },
    { name: "songs[image]", maxCount: 10 },
    { name: "songs[audio]", maxCount: 10 },
]), createAlbum);
crudSoundRouter.post('/update-song/:artistId/:songId',upload.fields([{name: 'image', maxCount: 1},{name: 'audio', maxCount: 1}]) ,updateSong);

export default crudSoundRouter;