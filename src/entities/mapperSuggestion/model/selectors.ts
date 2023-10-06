import {mapperSuggestionAdapter} from './adapter';

export const {selectAll, selectById} = mapperSuggestionAdapter.getSelectors(
  // @ts-expect-error
  state => state.mapperSuggestion
);
