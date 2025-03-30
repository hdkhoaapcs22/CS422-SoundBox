import songRouter from "./songRoutes.js";
import listeningHistoryRouter from "./listeningHistoryRoutes.js";

const listenerRoutes = (app) => {
  app.use("/api/songs", songRouter);
  app.use("/api/listeninghistory", listeningHistoryRouter);
};

export default listenerRoutes;
