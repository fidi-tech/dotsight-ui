import {MetricValue} from '@/entities/MetricValue/model';
import {DEFAULT_UNIT_ID} from '@/entities/unit/model';

import {useDataset} from './useDataset';

describe('features/widgetViews/ui/Table/hooks/useDataset', () => {
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
      header: ['', 'metric1', 'metric2', 'metric3'],
      rows: [
        ['item1', '13', null, '$24.00'],
        ['item2', null, '113', '$224.00'],
      ],
      copyrights: {
        a: {
          b: {
            id: 'id',
            name: 'c',
          },
        },
      },
    })
  });
});
