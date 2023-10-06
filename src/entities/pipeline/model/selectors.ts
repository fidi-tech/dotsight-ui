import {createSelector} from 'reselect';

import {getPipelineDataSources, getPipelineWidgets} from './getters';
import {Pipeline} from './types';
import {pipelineAdapter} from './adapter';

export const {selectAll, selectById} = pipelineAdapter.getSelectors(
  // @ts-expect-error
  state => state.pipeline
);

export const selectDefaultDataSource = createSelector(
  selectById,
  (pipeline: Pipeline | undefined) => pipeline && getPipelineDataSources(pipeline)?.[0],
);

export const selectDefaultWidgetType = createSelector(
  selectById,
  (pipeline: Pipeline | undefined) => pipeline && getPipelineWidgets(pipeline)?.[0]?.type,
)
