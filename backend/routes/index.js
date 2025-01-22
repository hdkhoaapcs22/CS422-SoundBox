import userAuth from './userAuth.js';

const userRoutes = (app) => {
    app.use('/api/user', userAuth);
}

export default userRoutes;