import userAuth from './userAuth.js';
import userInformationRouter from './userInformation.js';

const userRoutes = (app) => {
    app.use('/api/user', userAuth);
    app.use('/api/user', userInformationRouter);
}

export default userRoutes;