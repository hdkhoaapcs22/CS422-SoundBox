import listenerAuth from './listenerAuth.js';

const listenerRoutes = (app) => {
    app.use('/api/user', listenerAuth);
}

export default listenerRoutes;