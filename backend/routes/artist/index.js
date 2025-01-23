import createSoundRouter from "./createSound.js";

const artistRoutes = (app) => {
    app.use('/api/artist', createSoundRouter);
}

export default artistRoutes;