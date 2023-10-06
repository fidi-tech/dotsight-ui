import {dataSourceSuggestionAdapter} from './adapter';

export const {selectAll, selectById} = dataSourceSuggestionAdapter.getSelectors(
  // @ts-expect-error
  state => state.dataSourceSuggestion
);
