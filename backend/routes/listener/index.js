import songRouter from "./songRoutes.js";

const listenerRoutes = (app) => {
    app.use('/api/songs', songRouter);
}

export default listenerRoutes;