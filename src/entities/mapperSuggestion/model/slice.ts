import {createSlice} from '@reduxjs/toolkit';

import {mapperSuggestionAdapter} from './adapter';

export const mapperSuggestionSlice = createSlice({
  name: 'mapperSuggestion',
  initialState: mapperSuggestionAdapter.getInitialState(),
  reducers: {
    updateMapperSuggestions(state, action) {
      mapperSuggestionAdapter.setAll(state, action.payload.data);
    }
  },
});
