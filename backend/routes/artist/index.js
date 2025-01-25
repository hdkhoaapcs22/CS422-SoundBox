import crudSoundRouter from "./crudSound.js";
import artistProductRouter from "./product.js";

const artistRoutes = (app) => {
    app.use('/api/artist', crudSoundRouter);
    app.use('/api/artist', artistProductRouter);
}

export default artistRoutes;