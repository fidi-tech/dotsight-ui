export const useDataset = (_data) => {
  const data = _data.data.data;
  const metrics = _data.data.metrics;
  const items = _data.data.items;

  console.log(metrics, 'metrics');

  return {
    header: ['', ...data.metrics.map(metric => metrics[metric].name)],
    rows: data.items.map(item => {
      return [items[item].name, ...data.metrics.map(metric => {
        return data.values[item][metric][0].value;
      })];
    }),
  }
}