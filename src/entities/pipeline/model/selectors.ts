import {createSelector} from 'reselect';

import {getPipelineDataSources, getPipelineMappers, getPipelineWidgets} from './getters';
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

export const selectMappers = createSelector(
  selectById,
  (pipeline: Pipeline | undefined) => pipeline && getPipelineMappers(pipeline),
)

export const selectDefaultWidgetType = createSelector(
  selectById,
  (pipeline: Pipeline | undefined) => pipeline && getPipelineWidgets(pipeline)?.[0]?.type,
)

export const selectDefaultWidgetDataShape = createSelector(
  selectById,
  (pipeline: Pipeline | undefined) => pipeline && getPipelineWidgets(pipeline)?.[0]?.datashape,
)
