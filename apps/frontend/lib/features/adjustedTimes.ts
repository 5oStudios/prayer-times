import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  id: string;
  extraMinutes: number;
}[] = [];

export const adjustedTimesSlice = createSlice({
  name: 'adjustedTimes',
  initialState,
  selectors: {
    selectAdjustedTimes: (state) => state,
  },
  reducers: {
    adjustTime(state, action: { payload: { id: string; extraMinutes: number } }) {
      const { id, extraMinutes } = action.payload;
      const index = state.findIndex((time) => time.id === id);
      if (index === -1) {
        state.push({ id, extraMinutes });
      } else {
        state[index].extraMinutes = extraMinutes;
      }
    },
  },
});

export const { adjustTime } = adjustedTimesSlice.actions;
export const { selectAdjustedTimes } = adjustedTimesSlice.selectors;
