import createSoundRouter from "./createSound.js";
import artistProductRouter from "./product.js";

const artistRoutes = (app) => {
    app.use('/api/artist', createSoundRouter);
    app.use('/api/artist', artistProductRouter);
}

export default artistRoutes;