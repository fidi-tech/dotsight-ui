import {MetricValue} from '@/entities/MetricValue/model';
import {DEFAULT_UNIT_ID} from '@/entities/unit/model';

import {useDataset} from './useDataset';

describe('features/widgetViews/ui/Radar/hooks/useDataset', () => {
  const DATA = {
    items: {
      item1: {id: 'item1', name: 'item1'},
      item2: {id: 'item2', name: 'item2'},
    },
    metrics: {
      metric1: {id: 'metric1', name: 'metric1'},
    },
    units: {
      [DEFAULT_UNIT_ID]: {id: DEFAULT_UNIT_ID, name: 'US dollar', symbol: '$'},
    },
    data: {
      items: ['item1', 'item2'],
      metrics: ['metric1'],
      values: {
        item1: {
          metric1: [
            {timestamp: 200000000, value: new MetricValue(12)},
            {timestamp: 300000000, value: new MetricValue(13)},
          ],
        },
        item2: {
          metric1: [
            {timestamp: 200000000, value: new MetricValue(112)},
            {timestamp: 300000000, value: new MetricValue(113)},
          ],
        },
      },
      copyrights: {a: {b: {id: 'id', name: 'c'}}},
    },
  }
  it('successfully converts data', () => {
    expect(useDataset(DATA)).toEqual({
      chart: [
        {
          item1: 12,
          item2: 112,
          timestamp: 199918800,
        },
        {
          item1: 13,
          item2: 113,
          timestamp: 299970000,
        },
      ],
      copyrights: {
        a: {
          b: {
            id: 'id',
            name: 'c',
          },
        },
      },
      items: {
        item1: {
          id: 'item1',
          name: 'item1',
        },
        item2: {
          id: 'item2',
          name: 'item2',
        },
      },
      keys: ['item1', 'item2'],
      title: 'metric1',
      unitId: undefined,
    })
  });
});
