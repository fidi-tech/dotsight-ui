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
  header: 'expected_header',
  rows: 'expected_rows',
  copyrights: 'expected_copyrights',
};
describe('features/widgetViews/ui/Table/hooks/index', () => {
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
        header: EXPECTED.header,
        rows: EXPECTED.rows,
        copyrights: EXPECTED.copyrights,
      });
    })
  })
});
