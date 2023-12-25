import {Dispatch} from '@reduxjs/toolkit';

import {getPipelineParams} from '@/shared/api/dotsight';
import {PipelineId} from '@/shared/api/dotsight/models';

import {setPipelineExecutionParams} from '../actions';

export const getPipelineExecutionParams = (
  {pipelineId, mapperCode}: {pipelineId: PipelineId, mapperCode: string},
) => async (dispatch: Dispatch) => {
  const response = await getPipelineParams({id: pipelineId, mapperCode});
  return dispatch(setPipelineExecutionParams({
    pipelineExecutionParams: {
      id: pipelineId,
      ...response.data
    },
  }));
};
