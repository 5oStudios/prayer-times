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
    rotateDirection: ORIENTATION.DEFAULT,
  },
  selectors: {
    selectRotateDirection: (state) => state.rotateDirection,
  },
  reducers: {
    setOrientation: (state, action) => {
      state.rotateDirection = action.payload;
    },
    refresh: (state) => {
      state.rotateDirection = getSavedOrientation();
      console.log('state', state.rotateDirection);
    },
    saveLocalStorage: (state) => {
      savedOrientation(state.rotateDirection);
    },
  },
});

export const { setOrientation, refresh, saveLocalStorage } = rotateWindowStateSlice.actions;

export const { selectRotateDirection } = rotateWindowStateSlice.selectors;

export default rotateWindowStateSlice;
