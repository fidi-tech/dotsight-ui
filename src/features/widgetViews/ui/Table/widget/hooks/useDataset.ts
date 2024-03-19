import {RawWidgetData} from '@/shared/api/dotsight';

export const useDataset = (_data: RawWidgetData) => {
  const {data, metrics, items} = _data;

  return {
    header: ['', ...data.metrics.map(metric => metrics[metric].name)],
    rows: data.items.map(item => {
      return [
        items[item].name,
        ...data.metrics.map(metric => {
            const m = data.values[item][metric];
            if (!m) {
              return null;
            }
            const length = m.length;
            if (!length) {
              return null;
            }
            const value = m[length - 1]?.value;
            if (value && !value.isNull()) {
              return value.getStringValue();
            }
            return null;
          },
        ),
      ];
    }),
    copyrights: data.copyrights,
  }
}
