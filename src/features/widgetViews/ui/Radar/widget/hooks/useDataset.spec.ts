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
      metric2: {id: 'metric2', name: 'metric2'},
      metric3: {id: 'metric3', name: 'metric3'},
    },
    units: {
      [DEFAULT_UNIT_ID]: {id: DEFAULT_UNIT_ID, name: 'US dollar', symbol: '$'},
    },
    data: {
      items: ['item1', 'item2'],
      metrics: ['metric1', 'metric2', 'metric3'],
      values: {
        item1: {
          metric1: [
            {timestamp: 2, value: new MetricValue(12)},
            {timestamp: 3, value: new MetricValue(13)},
          ],
          metric3: [
            {timestamp: 3, value: new MetricValue({[DEFAULT_UNIT_ID]: 23})},
            {timestamp: 4, value: new MetricValue({[DEFAULT_UNIT_ID]: 24})},
          ]
        },
        item2: {
          metric2: [
            {timestamp: 2, value: new MetricValue(112)},
            {timestamp: 3, value: new MetricValue(113)},
          ],
          metric3: [
            {timestamp: 3, value: new MetricValue({[DEFAULT_UNIT_ID]: 223})},
            {timestamp: 4, value: new MetricValue({[DEFAULT_UNIT_ID]: 224})},
          ]
        },
      },
      copyrights: {a: {b: {id: 'id', name: 'c'}}},
    },
  }
  it('successfully converts data', () => {
    expect(useDataset(DATA)).toEqual({
      chart: [
        {
          fullMark: 1,
          item1: 1,
          max: 12,
          metric: 'metric1',
        },
        {
          fullMark: 1,
          item2: 1,
          max: 112,
          metric: 'metric2',
        },
        {
          fullMark: 1,
          item1: 0.1031390134529148,
          item2: 1,
          max: 223,
          metric: 'metric3',
          unitId: 'usd',
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
      metrics: {
        metric1: {
          id: 'metric1',
          name: 'metric1',
        },
        metric2: {
          id: 'metric2',
          name: 'metric2',
        },
        metric3: {
          id: 'metric3',
          name: 'metric3',
        },
      },
    })
  });
});
