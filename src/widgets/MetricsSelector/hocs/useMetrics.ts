import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {getMetricsByWidgetId} from '@/entities/metric/model/providers/getMetricsByWidgetId';
import {useDispatch} from '@/infra/providers/redux';
import {selectAll} from '@/entities/metric/model/selectors';
import {WidgetId} from '@/entities/widget/model';
import {getMetricId, getMetricIsSelected} from '@/entities/metric/model/getters';
import {MetricId} from '@/entities/metric/model';

import {setMetricsByWidgetId} from '@/entities/metric/model/providers/setMetricsByWidgetId';

export const useMetrics = (id: WidgetId) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  useEffect(() => {
    dispatch(getMetricsByWidgetId(id, query));
  }, [dispatch, id, query]);
  const metrics = useSelector(selectAll);
  const onSelect = useCallback((metricId) => {
    const currentSelectedMetricsIds = metrics.reduce((acc: MetricId[], metric) => {
      if (getMetricIsSelected(metric)) {
        acc.push(getMetricId(metric));
      }
      return acc;
    }, []);
    const updatedMetricsIds = currentSelectedMetricsIds.includes(metricId)
      ? currentSelectedMetricsIds.filter(id => id !== metricId)
      : [...currentSelectedMetricsIds, metricId];

    dispatch(setMetricsByWidgetId(id, updatedMetricsIds, query));
  }, [metrics]);
  return {
    metrics,
    onSelectMetrics: onSelect,
    query,
    setQuery,
  }
}