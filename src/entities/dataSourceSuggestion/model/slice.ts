import {createSlice} from '@reduxjs/toolkit';

import {DataSourceSuggestion} from '@/entities/dataSourceSuggestion/model/types';

import {dataSourceSuggestionAdapter} from './adapter';

export const dataSourceSuggestionSlice = createSlice({
  name: 'dataSourceSuggestion',
  initialState: dataSourceSuggestionAdapter.getInitialState(),
  reducers: {
    updateDataSourceSuggestions(state, action) {
      // here we have an MVP assumption - one dataSource for one mapper
      // https://github.com/fidi-tech/dotsight-ui/pull/5#discussion_r1398487635
      const dataSources = Object.values<DataSourceSuggestion[]>(action.payload.data)[0];
      dataSourceSuggestionAdapter.setAll(state, dataSources);
    }
  },
});
