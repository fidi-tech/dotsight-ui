import {WidgetId} from '@/entities/widget/model';
import {getMetricIsSelected} from '@/entities/metric/model/getters';

import {useMetrics} from './useMetrics';
import {getPresetIsSelected} from '@/entities/preset/model/getters';

export const useEnhance = (id: WidgetId) => {
  const {
    metrics,
    presets,
    onSelectMetrics,
    onSelectPreset,
    query,
    setQuery,
  } = useMetrics(id);
  const isCompleted = metrics.find(getMetricIsSelected) || presets.find(getPresetIsSelected);

  return {
    query,
    setQuery,
    metrics,
    presets,
    onSelectMetrics,
    onSelectPreset,
    isCompleted,
  }
}
