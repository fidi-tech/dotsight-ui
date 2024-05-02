import {Dispatch} from '@reduxjs/toolkit';

import {AppState} from '@/infra/providers/redux';
import {WidgetId} from '@/entities/widget/model';
import {setWidgetMetricsById} from '@/shared/api/dotsight';
import {upsert} from '@/entities/widget/model/actions';
import {MetricId} from '@/entities/metric/model';
import {PresetId} from '@/entities/preset/model';
import {updatePresets} from '@/entities/preset/model/actions';
import {selectAll as selectAllPresets} from '@/entities/preset/model/selectors';
import {getPresetId, getPresetIsSelected} from '@/entities/preset/model/getters';

import {updateMetrics} from '../actions';

export const setMetricsByWidgetId = (id: WidgetId, selectedMetricsIds?: MetricId[], presetId?: PresetId, query?: string) =>
  async (dispatch: Dispatch, getState: () => AppState) => {
    let _presetId = presetId;
    if (presetId) {
        // deselection handling
        const state = getState();
        const presets = selectAllPresets(state);
        const currentSelectedPreset = presets.find(getPresetIsSelected);
        _presetId = (
          currentSelectedPreset
          && getPresetId(currentSelectedPreset) === presetId
        ) ? undefined : presetId;
    }

    const {widget, metrics} = await setWidgetMetricsById(id, selectedMetricsIds, _presetId, query);
    dispatch(updateMetrics(metrics.metrics));
    dispatch(updatePresets(metrics.presets));
    dispatch(upsert(widget));
  }
