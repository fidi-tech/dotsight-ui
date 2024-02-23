import {createSlice} from '@reduxjs/toolkit';

import {presetAdapter} from './adapter';

export const presetSlice = createSlice({
  name: 'preset',
  initialState: presetAdapter.getInitialState(),
  reducers: {
    updatePresets(state, action) {
      presetAdapter.setAll(state, action.payload);
    }
  },
});
