import {createSlice} from '@reduxjs/toolkit';

import {metricAdapter} from './adapter';

export const metricSlice = createSlice({
  name: 'metric',
  initialState: metricAdapter.getInitialState(),
  reducers: {
    updateMetrics(state, action) {
      metricAdapter.setAll(state, action.payload);
    }
  },
});
