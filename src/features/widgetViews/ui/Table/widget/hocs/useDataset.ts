import {getScalarValue} from '@/shared/lib/unit';

export const useDataset = (_data) => {
  const data = _data.data.data;
  const metrics = _data.data.metrics;
  const items = _data.data.items;
  const units = _data.data.units;

  return {
    header: ['', ...data.metrics.map(metric => metrics[metric].name)],
    rows: data.items.map(item => {
      return [
        items[item].name,
        ...data.metrics.map(metric =>
          getScalarValue(data.values[item][metric]?.[0]?.value, units['usd'])
        ),
      ];
    }),
  }
}
