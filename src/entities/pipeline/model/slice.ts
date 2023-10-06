import {createSlice} from '@reduxjs/toolkit';
import {pipelineAdapter} from './adapter';

export const pipelineSlice = createSlice({
  name: 'pipeline',
  initialState: pipelineAdapter.getInitialState(),
  reducers: {
    updatePipelines(state, action) {
      pipelineAdapter.upsertMany(state, action.payload.pipelines);
    },
  },
});
