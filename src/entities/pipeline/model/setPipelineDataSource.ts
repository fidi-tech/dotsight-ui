import {Dispatch} from '@reduxjs/toolkit';

import {setPipelineDataSource as _setPipelineDataSource} from '@/shared/api/dotsight';
import {PipelineId} from '@/shared/api/dotsight/models';

import {updatePipelines} from './actions';

export const setPipelineDataSource = (
  {
    pipelineId,
    type,
    config,
  }: {
    pipelineId: PipelineId,
    type: string,
    config: object,
  }
) => async (dispatch: Dispatch) => {
  const response = await _setPipelineDataSource({pipelineId, type, config});
  return dispatch(updatePipelines({pipelines: [response.data]}));
};
