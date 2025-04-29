import songRouter from "./songRoutes.js";
import listeningHistoryRouter from "./listeningHistoryRoutes.js";
import searchHistoryRouter from "./searchHistoryRoutes.js";
import albumRouter from "./albumRoutes.js";
import songIdentifyRouter from "./songIdentifyRoute.js";

const listenerRoutes = (app) => {
  app.use("/api/songs", songRouter);
  app.use("/api/listeninghistory", listeningHistoryRouter);
  app.use("/api/searchhistory", searchHistoryRouter);
  app.use("/api/album", albumRouter);
  app.use("/api/song-identify", songIdentifyRouter);
};

export default listenerRoutes;
