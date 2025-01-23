import express from 'express';
import {createSong, createAlbum} from '../../controller/artist/createSoundController.js';
import upload from '../../middleware/multer.js';

const createSoundRouter = express.Router();

createSoundRouter.post('/add-song', upload.fields([{name: 'image', maxCount: 1},{name: 'audio', maxCount: 1}]),  createSong);
createSoundRouter.post('/add-album', createAlbum);

export default createSoundRouter;