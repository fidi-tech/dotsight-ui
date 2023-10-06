import {createEntityAdapter} from '@reduxjs/toolkit';

import {DataSourceSuggestion} from './types';

export const dataSourceSuggestionAdapter = createEntityAdapter<DataSourceSuggestion>({
  selectId: entity => entity.type,
});
