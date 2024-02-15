import {createSlice} from '@reduxjs/toolkit';

import {widgetAdapter} from './adapter';

export const widgetSlice = createSlice({
  name: 'widget',
  initialState: widgetAdapter.getInitialState(),
  reducers: {
    upsert(state, action) {
      widgetAdapter.upsertOne(state, action.payload);
    }
  },
});
