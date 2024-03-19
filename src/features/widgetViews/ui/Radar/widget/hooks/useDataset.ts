import {RawWidgetData} from '@/shared/api/dotsight';
import {DEFAULT_UNIT_ID, UnitId} from '@/entities/unit/model';
import {pick, omit} from '@/shared/lib/object';
import {MetricId} from '@/entities/metric/model';
import {SubCategoryId} from '@/entities/subCategory/model';

export const useDataset = (data: RawWidgetData) => {
  const map: Record<MetricId, Record<SubCategoryId, number> & {unitId?: UnitId}> = {};
  data.data.metrics.forEach(metric => {
    data.data.items.forEach(item => {
      if (!map[metric]) {
        map[metric] = {};
        if (data.data.values[item][metric]?.[0].value.isMultiValue()) {
          map[metric].unitId = DEFAULT_UNIT_ID;
        }
      }
      if (data.data.values[item][metric]) {
        map[metric][item] = data.data.values[item][metric][0].value.getNumericValue();
      }
    })
    map[metric].max = Math.max(...Object.values(omit(map[metric], ['unitId'])).filter(Boolean));
    data.data.items.forEach(item => {
      if (map[metric][item]) {
        map[metric][item] = map[metric][item] / map[metric].max;
      }
    })
  });
  return {
    chart: Object.entries(map).map(([metric, values]) => {
      return {
        metric,
        ...values,
        fullMark: 1,
      }
    }),
    copyrights: data.data.copyrights,
    items: pick(data.items, data.data.items),
    metrics: pick(data.metrics, data.data.metrics),
  }
}