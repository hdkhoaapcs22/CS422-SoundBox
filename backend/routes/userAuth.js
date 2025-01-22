import express from 'express';
import { register, login, forgotPassword, resetPassword} from '../controller/userAuthController.js';

const userAuth = express.Router();

userAuth.post('/register', register);
userAuth.post('/login', login);
userAuth.post('/forgotpassword', forgotPassword);
userAuth.post('/resetpassword/:id', resetPassword)

export default userAuth;
