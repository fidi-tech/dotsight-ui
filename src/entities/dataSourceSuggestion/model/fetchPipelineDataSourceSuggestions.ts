import {Dispatch} from '@reduxjs/toolkit';

import {PipelineId} from '@/shared/api/dotsight/models';
import {getPipelineDataSourceSuggestions} from '@/shared/api/dotsight/pipeline';

import {updateDataSourceSuggestions} from './actions';

type Params = {
  pipelineId: PipelineId;
}

export const fetchPipelineDataSourceSuggestions = ({pipelineId}: Params) => async (dispatch: Dispatch) => {
  const {data} = await getPipelineDataSourceSuggestions({id: pipelineId});
  return dispatch(updateDataSourceSuggestions({data}));
};
