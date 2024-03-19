import {categoryAdapter} from './adapter';

export const {selectAll} = categoryAdapter.getSelectors(
  // @ts-expect-error
  state => state.category
);