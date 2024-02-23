import {presetAdapter} from './adapter';

export const {selectAll} = presetAdapter.getSelectors(
  // @ts-expect-error
  state => state.preset
);
