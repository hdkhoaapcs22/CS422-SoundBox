import express from 'express';
import { register, login, forgotPassword, resetPassword } from '../../controller/listener/listenerController.js';

const listenerAuth = express.Router();

listenerAuth.post('/register', register);
listenerAuth.post('/login', login);
listenerAuth.post('/forgotpassword', forgotPassword);
listenerAuth.post('/resetpassword/:id/:resetToken', resetPassword)

export default listenerAuth;
