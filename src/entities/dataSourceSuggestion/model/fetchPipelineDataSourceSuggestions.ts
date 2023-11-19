import {Dispatch} from '@reduxjs/toolkit';

import {PipelineId} from '@/shared/api/dotsight/models';
import {getPipelineDataSourceSuggestions} from '@/shared/api/dotsight/pipeline';

import {updateDataSourceSuggestions} from './actions';

type Params = {
  pipelineId: PipelineId;
  entity: string;
}

export const fetchPipelineDataSourceSuggestions = ({pipelineId, entity}: Params) => async (dispatch: Dispatch) => {
  const response = await getPipelineDataSourceSuggestions({id: pipelineId});
  return dispatch(updateDataSourceSuggestions({data: response.data[entity]}));
};
