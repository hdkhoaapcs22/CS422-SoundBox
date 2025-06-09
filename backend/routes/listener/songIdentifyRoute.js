import express from 'express';
import multer from 'multer';
import { identifySong } from '../../controller/songController.js';

const songIdentifyRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

songIdentifyRouter.post('/identify', upload.single('file'), identifySong);

export default songIdentifyRouter;