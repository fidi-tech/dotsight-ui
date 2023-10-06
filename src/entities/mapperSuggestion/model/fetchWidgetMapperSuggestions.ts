import {Dispatch} from '@reduxjs/toolkit';

import {PipelineId} from '@/shared/api/dotsight/models';
import {WidgetId} from '@/entities/widget/model/types';
import {getWidgetMapperSuggestions} from '@/shared/api/dotsight/pipeline';

import {updateMapperSuggestions} from './actions';

type Params = {
  pipelineId: PipelineId,
  widgetId: WidgetId,
}

export const fetchWidgetMapperSuggestions = ({pipelineId, widgetId}: Params) => async (dispatch: Dispatch) => {
  const response = await getWidgetMapperSuggestions({id: pipelineId, widgetId});
  return dispatch(updateMapperSuggestions({data: response.data}));
};
