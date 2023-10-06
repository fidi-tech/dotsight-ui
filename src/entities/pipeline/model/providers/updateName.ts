import {Dispatch} from '@reduxjs/toolkit';

import {updatePipelineName as _updatePipelineName} from '@/shared/api/dotsight';
import {PipelineId} from '@/entities/pipeline/model/types';

import {updatePipelines} from '../actions';

export const updatePipelineName = (
  {pipelineId, name}: {pipelineId: PipelineId, name: string},
) => async (dispatch: Dispatch) => {
  const response = await _updatePipelineName({id: pipelineId, name});
  return dispatch(updatePipelines({pipelines: [response.data]}));
};
