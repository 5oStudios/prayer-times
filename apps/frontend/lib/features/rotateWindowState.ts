import { createSlice } from '@reduxjs/toolkit';

export enum ORIENTATION {
  DEFAULT = '',
  LEFT = 'vrLEFT',
  RIGHT = 'vrRIGHT',
}

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function getSavedOrientation(): ORIENTATION {
  if (!isBrowser()) {
    return ORIENTATION.DEFAULT;
  }

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
  if (isBrowser()) {
    localStorage.setItem('rotateWindowState', JSON.stringify({ value }));
  }
}

export const rotateWindowStateSlice = createSlice({
  name: 'rotateWindow',
  initialState: {
    rotateDirection: ORIENTATION.DEFAULT, // Initial state without localStorage
  },
  selectors: {
    selectRotateDirection: (state) => state.rotateDirection,
  },
  reducers: {
    setOrientation: (state, action) => {
      state.rotateDirection = action.payload;
      savedOrientation(state.rotateDirection);
    },
    refresh: (state) => {
      state.rotateDirection = getSavedOrientation();
      console.log('state', state.rotateDirection);
    },
  },
});

export const rotateWindowPreloadedState = {
  rotateWindow: {
    rotateDirection: ORIENTATION.DEFAULT, // Preloaded state without localStorage
  },
};

export const { setOrientation, refresh } = rotateWindowStateSlice.actions;

export const { selectRotateDirection } = rotateWindowStateSlice.selectors;

export default rotateWindowStateSlice;
