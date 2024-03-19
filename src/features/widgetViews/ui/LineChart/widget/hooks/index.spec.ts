import {useEnhance} from '.';
import {useDataset} from './useDataset';

jest.mock('./useDataset', () => ({
  useDataset: jest.fn(),
}));

const PARAMS = {
  items: {item1: {id: 'item1', name: 'item1'}},
  metrics: {metric1: {id: 'metric1', name: 'metric1'}},
  units: {unit1: {id: 'unit1', name: 'unit1', symbol: '$'}},
  data: {
    items: [],
    metrics: [],
    values: {},
    copyrights: {},
  },
};
const EXPECTED = {
  items: 'expected_items',
  chart: 'expected_chart',
  copyrights: 'expected_copyrights',
  title: 'expected_title',
  keys: 'expected_keys',
  unitId: 'expectedUnitId',
};
describe('features/widgetViews/ui/LineChart/hooks/index', () => {
  describe('useEnhance', () => {
    (useDataset as jest.MockedFn<any>).mockImplementation(() => EXPECTED);
    it('calls useDataset with correct params', () => {
      useEnhance(PARAMS);
      expect(useDataset).toHaveBeenCalledTimes(1);
      expect(useDataset).toHaveBeenCalledWith(PARAMS);
    })
    it('returns data from useDataset', () => {
      (useDataset as jest.MockedFn<any>).mockImplementation(() => EXPECTED);
      expect(useEnhance(PARAMS)).toEqual({
        items: EXPECTED.items,
        chart: EXPECTED.chart,
        copyrights: EXPECTED.copyrights,
        title: EXPECTED.title,
        keys: EXPECTED.keys,
        unitId: EXPECTED.unitId,
      });
    })
  })
});
