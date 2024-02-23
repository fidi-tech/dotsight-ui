import {Dispatch} from '@reduxjs/toolkit';

import {WidgetId} from '@/entities/widget/model';
import {setWidgetMetricsById} from '@/shared/api/dotsight';
import {upsert} from '@/entities/widget/model/actions';
import {MetricId} from '@/entities/metric/model';

import {updateMetrics} from '../actions';
import {PresetId} from '@/entities/preset/model';
import {updatePresets} from '@/entities/preset/model/actions';

export const setMetricsByWidgetId = (id: WidgetId, selectedMetricsIds?: MetricId[], presetId?: PresetId, query?: string) =>
  async (dispatch: Dispatch) => {
    const {widget, metrics} = await setWidgetMetricsById(id, selectedMetricsIds, presetId, query);
    dispatch(updateMetrics(metrics.metrics));
    dispatch(updatePresets(metrics.presets));
    dispatch(upsert(widget));
  }
