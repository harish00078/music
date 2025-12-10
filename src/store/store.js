import { configureStore } from "@reduxjs/toolkit";
import playlistReducer from "./playlistSlice.js";
import playerReducer from "./playerSlice.js";

export const store = configureStore({
  reducer: {
    playlist: playlistReducer,
    player: playerReducer,
  },
});

export default store;
