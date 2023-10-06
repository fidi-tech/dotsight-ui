import {createSlice} from '@reduxjs/toolkit';

import {dataSourceSuggestionAdapter} from './adapter';

export const dataSourceSuggestionSlice = createSlice({
  name: 'dataSourceSuggestion',
  initialState: dataSourceSuggestionAdapter.getInitialState(),
  reducers: {
    updateDataSourceSuggestions(state, action) {
      dataSourceSuggestionAdapter.setAll(state, action.payload.data);
    }
  },
});
