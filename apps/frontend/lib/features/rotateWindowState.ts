import { createSlice } from '@reduxjs/toolkit';

// TODO: make helper
export enum ORIENTATION {
  DEFAULT = '',
  LEFT = 'vrLEFT',
  RIGHT = 'vrRIGHT',
}

export function getSavedOrientation(): ORIENTATION {
  const serializedState = localStorage.getItem('rotateWindowState');
  if (serializedState === null) {
    return ORIENTATION.DEFAULT;
  }
  try {
    const parsedState = JSON.parse(serializedState);
    return parsedState.value || ORIENTATION.DEFAULT;
  } catch (e) {
    return ORIENTATION.DEFAULT;
  }
}
function savedOrientation(value: ORIENTATION) {
  localStorage.setItem('rotateWindowState', JSON.stringify({ value }));
}

export const rotateWindowStateSlice = createSlice({
  name: 'rotateWindow',
  initialState: {
    rotateDirection: getSavedOrientation(),
  },
  selectors: {
    selectRotateDirection: (state) => state.rotateDirection,
  },
  reducers: {
    setOrientation: (state, action) => {
      state.rotateDirection = action.payload;
      savedOrientation(state.rotateDirection);
    },
  },
});

export const rotateWindowPreloadedState = {
  rotateWindow: {
    rotateDirection: getSavedOrientation(),
  },
};

export const { setOrientation } = rotateWindowStateSlice.actions;

export const { selectRotateDirection } = rotateWindowStateSlice.selectors;

export default rotateWindowStateSlice;
