import {WidgetId} from '@/entities/widget/model';
import {getMetricIsSelected} from '@/entities/metric/model/getters';

import {useMetrics} from './useMetrics';

export const useEnhance = (id: WidgetId) => {
  const {
    metrics,
    onSelectMetrics,
    query,
    setQuery,
  } = useMetrics(id);
  const isCompleted = metrics.find(getMetricIsSelected);

  return {
    query,
    setQuery,
    metrics,
    onSelectMetrics,
    isCompleted,
  }
}
