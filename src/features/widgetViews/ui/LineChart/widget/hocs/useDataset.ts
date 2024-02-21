export const useDataset = (data) => {
  const _data = data.data;
  const metric = _data.data.metrics[0];
  const map = {};
  _data.data.items.forEach(item => {
    const values = _data.data.values[item][metric];
    values.forEach(_value => {
      const timestamp = _value.timestamp;
      const value = _value.value;
      if (!map[timestamp]) {
        map[timestamp] = {};
      }
      map[timestamp][item] = value;
    })
  });
  return {
    title: _data.metrics[metric].name,
    items: _data.items,
    chart: Object.entries(map).map(([timestamp, values]) => ({timestamp, ...values})),
    keys: _data.data.items,
  }
}