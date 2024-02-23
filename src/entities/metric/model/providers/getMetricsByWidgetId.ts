import {Dispatch} from '@reduxjs/toolkit';

import {WidgetId} from '@/entities/widget/model';
import {fetchWidgetMetricsById} from '@/shared/api/dotsight';

import {updateMetrics} from '../actions';
import {updatePresets} from '@/entities/preset/model/actions';

// TODO move from metric entity (presets are also updated here)
export const getMetricsByWidgetId = (id: WidgetId, query: string) => async (dispatch: Dispatch) => {
  const {metrics, presets} = await fetchWidgetMetricsById(id, query);
  dispatch(updateMetrics(metrics));
  return dispatch(updatePresets(presets));
};
