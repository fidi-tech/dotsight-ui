import {subCategoryAdapter} from './adapter';

export const {selectAll} = subCategoryAdapter.getSelectors(
  // @ts-expect-error
  state => state.subCategory
);