import {RawWidgetData} from '@/shared/api/dotsight';

export const useDataset = (_data: RawWidgetData) => {
  const {data, metrics, items} = _data;

  return {
    header: ['', ...data.metrics.map(metric => metrics[metric].name)],
    rows: data.items.map(item => {
      return [
        items[item].name,
        ...data.metrics.map(metric => {
            const value = data.values[item][metric]?.[0]?.value;
            if (value && !value.isNull()) {
              return value.getStringValue();
            }
            return null;
          },
        ),
      ];
    }),
  }
}
