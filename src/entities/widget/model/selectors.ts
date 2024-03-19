import {widgetAdapter} from './adapter';

export const {selectAll, selectById} = widgetAdapter.getSelectors(
  // @ts-expect-error
  state => state.widget
);