import {createSlice} from '@reduxjs/toolkit';

import {subCategoryAdapter} from './adapter';

export const subCategorySlice = createSlice({
  name: 'subCategory',
  initialState: subCategoryAdapter.getInitialState(),
  reducers: {
    updateSubCategories(state, action) {
      subCategoryAdapter.setAll(state, action.payload);
    }
  },
});
