import {createEntityAdapter} from '@reduxjs/toolkit';

import {MapperSuggestion} from './types';

export const mapperSuggestionAdapter = createEntityAdapter<MapperSuggestion>({
  selectId: entity => entity.type,
});
