import express from 'express';
import { createArtist } from '../../controller/admin/adminController.js';

const artistSound = express.Router();

artistSound.post('/create-artist', createArtist);

export default artistSound;