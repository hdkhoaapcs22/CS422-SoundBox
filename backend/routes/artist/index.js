import crudSoundRouter from "./crudSound.js";
import artistProductRouter from "./product.js";
import artistRouter from "./artist.js";
const artistRoutes = (app) => {
  app.use("/api/artist", crudSoundRouter);
  app.use("/api/artist", artistProductRouter);
  app.use("/api/artist", artistRouter);
};

export default artistRoutes;
