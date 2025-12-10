import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentIndex: 0,
  playing: false,
  volume: 0.9,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    play(state) {
      state.playing = true;
    },
    pause(state) {
      state.playing = false;
    },
    togglePlay(state) {
      state.playing = !state.playing;
    },
    setVolume(state, action) {
      state.volume = action.payload;
    },
    setCurrentIndex(state, action) {
      state.currentIndex = action.payload;
    },
    nextTrack(state, action) {
      const total = action.payload;
      state.currentIndex = (state.currentIndex + 1) % total;
      state.playing = true;
    },
    prevTrack(state, action) {
      const total = action.payload;
      state.currentIndex =
        state.currentIndex - 1 < 0 ? total - 1 : state.currentIndex - 1;
      state.playing = true;
    },
  },
});

export const {
  play,
  pause,
  togglePlay,
  setVolume,
  setCurrentIndex,
  nextTrack,
  prevTrack,
} = playerSlice.actions;

export default playerSlice.reducer;
