import {Dispatch} from '@reduxjs/toolkit';

import {WidgetId} from '@/entities/widget/model';
import {fetchWidgetMetricsById} from '@/shared/api/dotsight';

import {updateMetrics} from '../actions';

export const getMetricsByWidgetId = (id: WidgetId, query: string) => async (dispatch: Dispatch) => {
  const metrics = await fetchWidgetMetricsById(id, query);
  return dispatch(updateMetrics(metrics));
};
