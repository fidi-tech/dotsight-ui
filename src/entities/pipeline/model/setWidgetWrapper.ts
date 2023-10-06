import {Dispatch} from '@reduxjs/toolkit';

import {setPipelineWidgetMapper} from '@/shared/api/dotsight';
import {PipelineId} from '@/shared/api/dotsight/models';
import {WidgetId} from '@/entities/widget/model/types';

import {updatePipelines} from './actions';

export const setWidgetWrapper = (
  {
    pipelineId,
    widgetId,
    type,
    code,
    config,
  }: {
    pipelineId: PipelineId,
    widgetId: WidgetId,
    type: string,
    code: string,
    config: object,
  }
) => async (dispatch: Dispatch) => {
  const response = await setPipelineWidgetMapper({pipelineId, widgetId, type, code, config});
  return dispatch(updatePipelines({pipelines: [response.data]}));
};
