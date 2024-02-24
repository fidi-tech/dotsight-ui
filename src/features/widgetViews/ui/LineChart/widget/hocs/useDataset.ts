import {RawWidgetData} from '@/shared/api/dotsight';
import {SubCategoryId} from '@/entities/subCategory/model';
import {DEFAULT_UNIT_ID, UnitId} from '@/entities/unit/model';
import {timestampToStartOfTheDay} from '@/shared/lib/date';

export const useDataset = (data: RawWidgetData) => {
  const metric = data.data.metrics[0];
  const map: Record<number, Record<SubCategoryId, number>> = {};
  let unitId: UnitId | undefined;
  data.data.items.forEach(item => {
    const values = data.data.values[item][metric];
    values.forEach(_value => {
      const timestamp = timestampToStartOfTheDay(_value.timestamp);
      const value = _value.value;
      if (!map[timestamp]) {
        map[timestamp] = {};
      }
      if (value.isMultiValue()) {
        unitId = DEFAULT_UNIT_ID;
      }
      map[timestamp][item] = value.getNumericValue();
    })
  });
  const chart = Object.entries(map).map(
    ([timestamp, values]) => ({timestamp, ...values})
  );
  return {
    title: data.metrics[metric].name,
    items: data.items,
    chart,
    keys: data.data.items,
    unitId,
  }
}