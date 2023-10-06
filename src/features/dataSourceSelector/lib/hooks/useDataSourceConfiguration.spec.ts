import {selectAll} from '@/entities/dataSourceSuggestion/model';
import {selectDefaultDataSource} from '@/entities/pipeline/model';
import {renderHook} from '@testing-library/react';
import {useDataSourceConfiguration} from './useDataSourceConfiguration';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(fn => fn()),
}));
jest.mock('@/entities/dataSourceSuggestion/model', () => ({
  selectAll: jest.fn(),
}));
jest.mock('@/entities/pipeline/model', () => ({
  selectDefaultDataSource: jest.fn(),
}));

describe('features/dataSourceSelector useDataSourceConfiguration', () => {
  beforeEach(() => {
    (selectAll as jest.MockedFn<any>).mockImplementation(() => [
      {type: 't1', configSchema: 'cs1'},
      {type: 't2', configSchema: 'cs2'},
    ]);
    (selectDefaultDataSource as any as jest.MockedFn<any>).mockImplementation(() => ({type: 't1', config: '42'}));
  });

  it('returns pipeline\'s selected data source\'s config', () => {
    const {result} = renderHook(() => useDataSourceConfiguration({pipelineId: '1', selectedType: 't1'}));

    expect(result.current.config).toEqual('42');
  });

  it('returns pipeline\'s selected data source\'s config schema', () => {
    const {result} = renderHook(() => useDataSourceConfiguration({pipelineId: '1', selectedType: 't1'}));

    expect(result.current.configSchema).toEqual('cs1');
  });
});
