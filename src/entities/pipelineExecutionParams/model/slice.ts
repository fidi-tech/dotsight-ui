import {createSlice} from '@reduxjs/toolkit';

import {pipelineExecutionParamsAdapter} from './adapter';

export const pipelineExecutionParamsSlice = createSlice({
  name: 'pipelineExecutionParams',
  initialState: pipelineExecutionParamsAdapter.getInitialState(),
  reducers: {
    setPipelineExecutionParams(state, action) {
      pipelineExecutionParamsAdapter.upsertOne(state, action.payload.pipelineExecutionParams);
    },
  },
});
