import {Dispatch} from '@reduxjs/toolkit';

import {addWidgetToPipeline} from '@/shared/api/dotsight';

import {updatePipelines} from './actions';
import {WidgetId} from '@/entities/widget/model/types';

export const addWidget = ({id, type, config, datashape}: {id: WidgetId; type: string; config: object; datashape: string}) => async (dispatch: Dispatch) => {
  const response = await addWidgetToPipeline({id, type, config, datashape});
  return dispatch(updatePipelines({pipelines: [response.data]}));
}
