import express from 'express';
import { register, login, forgotPassword } from '../../controller/listener/listenerController.js';

const listenerAuth = express.Router();

listenerAuth.post('/register', register);
listenerAuth.post('/login', login);
listenerAuth.post('/forgotpassowrd', forgotPassword);

export default listenerAuth;
