import { createSlice } from "@reduxjs/toolkit";

const recentlyWatchedSlice = createSlice({
  name: "recentlyWatched",
  initialState: [],
  reducers: {
    addRecentlyWatched: (state, action) => {
      const { item } = action.payload;
      const index = state.findIndex(i => i.animeId === item.animeId);
      if (index === -1) {
        const newState = [item, ...state]
        window.localStorage.setItem("recentlyWatched", JSON.stringify(newState));
        return newState;
      } else {
        const newState = [...state.slice(0, index), item, ...state.slice(index + 1)];
        window.localStorage.setItem("recentlyWatched", JSON.stringify(newState));
        return newState;
      }
    },
    updateRecentlyWatched: (state, action) => {
      return action.payload;
    },
    removeRecentlyWatched: (state, action) => {
      const { animeId } = action.payload;
      const newState = state.filter(i => i.animeId !== animeId);
      window.localStorage.setItem("recentlyWatched", JSON.stringify(newState));
      return newState;
    }
  }
});

export const { addRecentlyWatched, removeRecentlyWatched, updateRecentlyWatched } = recentlyWatchedSlice.actions;
export default recentlyWatchedSlice.reducer;
