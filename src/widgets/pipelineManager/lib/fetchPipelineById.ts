import {Dispatch} from '@reduxjs/toolkit';

import {getPipelineById} from '@/shared/api/dotsight';
import {PipelineId} from '@/shared/api/dotsight/models';

import {updatePipelines} from '@/entities/pipeline/model/actions';

export const fetchPipelineById = ({id}: {id: PipelineId}) => async (dispatch: Dispatch) => {
  const pipeline = await getPipelineById({id});
  if (!pipeline) {
    window.location.assign('/');
    return null;
  }
  return dispatch(updatePipelines({pipelines: [pipeline]}));
};
