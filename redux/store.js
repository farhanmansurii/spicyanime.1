import { configureStore } from "@reduxjs/toolkit";
import recentlyWatchedReducer from "./reducers/recentlyWatchedReducer";
const store = configureStore({
  reducer: {
    recentlyWatched: recentlyWatchedReducer,
  },

});
export default store;
