import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    hadithTickerSpeed: 150,
  },
  selectors: {
    selectHadithTickerSpeed: (state) => state.hadithTickerSpeed,
  },
  reducers: {
    setHadithTickerSpeed: (state, action) => {
      state.hadithTickerSpeed = action.payload;
    },
  },
});

export const { setHadithTickerSpeed } = settingsSlice.actions;

export const { selectHadithTickerSpeed } = settingsSlice.selectors;

export default settingsSlice;
