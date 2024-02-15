import {createSlice} from '@reduxjs/toolkit';

import {categoryAdapter} from './adapter';

export const categorySlice = createSlice({
  name: 'category',
  initialState: categoryAdapter.getInitialState(),
  reducers: {
    updateCategories(state, action) {
      categoryAdapter.setAll(state, action.payload);
    }
  },
});
