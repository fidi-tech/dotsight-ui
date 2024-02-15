import {metricAdapter} from './adapter';

export const {selectAll} = metricAdapter.getSelectors(
  // @ts-expect-error
  state => state.metric
);