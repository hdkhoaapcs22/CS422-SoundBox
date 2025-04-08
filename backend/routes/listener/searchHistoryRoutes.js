import express from "express";
import {
  getRecentSearch,
  saveSearchedResult,
  deleteSearchHistory,
  deleteAllSearchHistory,
} from "../../controller/searchHistoryController.js";

const searchHistoryRouter = express.Router();

searchHistoryRouter.post("/save-result", saveSearchedResult);
searchHistoryRouter.get("/:listenerID", getRecentSearch);
searchHistoryRouter.delete("/delete/:listenerID/:songID", deleteSearchHistory);
searchHistoryRouter.delete("/delete-all/:listenerID", deleteAllSearchHistory);
export default searchHistoryRouter;
