import {Dispatch} from '@reduxjs/toolkit';

import {getPipelineById} from '@/shared/api/dotsight';
import {PipelineId} from '@/shared/api/dotsight/models';

import {updatePipelines} from './actions';

export const fetchPipelineById = ({id}: {id: PipelineId}) => async (dispatch: Dispatch) => {
  const response = await getPipelineById({id});
  return dispatch(updatePipelines({pipelines: [response.data]}));
};
