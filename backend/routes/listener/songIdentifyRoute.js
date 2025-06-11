import express from 'express';
import multer from 'multer';
import path from 'path';
import { identifySong } from '../../controller/songController.js';

const songIdentifyRouter = express.Router();
// const upload = multer({ dest: 'uploads/' });
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 1024 * 1024 }, // 1MB limit
  fileFilter: (_, file, cb) => {
    const ext = path.extname(file.originalname);
    if (![".wav", ".mp3", ".m4a"].includes(ext)) {
      return cb(new Error("Only audio files are allowed"), false);
    }
    cb(null, true);
  },
});

songIdentifyRouter.post('/identify', upload.single('file'), identifySong);

export default songIdentifyRouter;