import express from 'express';
import { getUserInformation, updateUserInformation } from '../controller/userInformationController.js';
import upload from '../middleware/multer.js';

const userInformationRouter = express.Router();

userInformationRouter.get('/:role/:userId',getUserInformation);
userInformationRouter.post('/update-profile/:role/:userId', upload.single('avatarUrl') ,updateUserInformation);

export default userInformationRouter;