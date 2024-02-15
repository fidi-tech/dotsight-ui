import {Dispatch} from '@reduxjs/toolkit';

import {WidgetId} from '@/entities/widget/model';
import {setWidgetMetricsById} from '@/shared/api/dotsight';
import {upsert} from '@/entities/widget/model/actions';
import {MetricId} from '@/entities/metric/model';

import {updateMetrics} from '../actions';

export const setMetricsByWidgetId = (id: WidgetId, selectedMetricsIds: MetricId[], query: string) =>
  async (dispatch: Dispatch) => {
    const {widget, metrics} = await setWidgetMetricsById(id, selectedMetricsIds, query);
    dispatch(updateMetrics(metrics));
    dispatch(upsert(widget));
  }