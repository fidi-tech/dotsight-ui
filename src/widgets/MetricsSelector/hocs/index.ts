import {WidgetId} from '@/entities/widget/model';

import {useMetrics} from './useMetrics';

export const useEnhance = (id: WidgetId) => {
  const {
    metrics,
    onSelectMetrics,
    query,
    setQuery,
  } = useMetrics(id);

  return {
    query,
    setQuery,
    metrics,
    onSelectMetrics,
  }
}
