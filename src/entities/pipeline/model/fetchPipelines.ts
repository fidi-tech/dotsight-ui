import {Dispatch} from '@reduxjs/toolkit';
import {getPipelinesList} from '@/shared/api/dotsight';
import {updatePipelines} from './actions';

export const fetchPipelines = () => async (dispatch: Dispatch) => {
  const response = await getPipelinesList();
  return dispatch(updatePipelines({pipelines: response.data}));
};
