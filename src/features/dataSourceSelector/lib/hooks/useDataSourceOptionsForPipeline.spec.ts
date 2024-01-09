import {act, renderHook} from '@testing-library/react';

import {selectAll} from '@/entities/dataSourceSuggestion/model';
import {selectDefaultDataSource, selectCanModify} from '@/entities/pipeline/model';

import {useDataSourceOptionsForPipeline} from './useDataSourceOptionsForPipeline';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(fn => fn()),
}));
jest.mock('@/entities/dataSourceSuggestion/model', () => ({
  selectAll: jest.fn(),
}));
jest.mock('@/entities/pipeline/model', () => ({
  selectDefaultDataSource: jest.fn(),
  selectCanModify: jest.fn(),
}));

describe('features/dataSourceSelector useDataSourceOptionsForPipeline', () => {
  beforeEach(() => {
    (selectAll as jest.MockedFn<any>).mockImplementation(() => []);
    (selectDefaultDataSource as any as jest.MockedFn<any>).mockImplementation(() => ({type: '42'}));
    (selectCanModify as any as jest.MockedFn<any>).mockImplementation(() => true);
  });

  it('makes selectedType equal the type that was already selected in the pipeline', () => {
    const {result: {current: {
      selectedType,
    }}} = renderHook(() => useDataSourceOptionsForPipeline({pipelineId: '1'}));

    expect(selectedType).toEqual('42');
  });

  it('changes selectedType when onOptionSelect is called', () => {
    const {result} = renderHook(() => useDataSourceOptionsForPipeline({pipelineId: '1'}));

    expect(result.current.selectedType).toEqual('42');

    act(() => {
      result.current.onOptionSelect({label: 'any', value: '43'});
    });

    expect(result.current.selectedType).toEqual('43');
  });

  it('maps suggestions into options', () => {
    (selectAll as jest.MockedFn<any>).mockImplementation(() => [
      {type: 't1', name: 'n1'},
      {type: 't2', name: 'n2'},
    ]);
    const {result} = renderHook(() => useDataSourceOptionsForPipeline({pipelineId: '1'}));
    expect(result.current.typeOptions).toEqual([
      {label: 'n1', value: 't1'},
      {label: 'n2', value: 't2'},
    ]);
  });

  it('should been disabled when data source is already defined for pipeline', () => {
    const {result: {current: {
      isDisabled,
    }}} = renderHook(() => useDataSourceOptionsForPipeline({pipelineId: '1'}));
    expect(isDisabled).toBeTruthy();
  });

  it('should not been disabled when data source is not defined for pipeline', () => {
    (selectDefaultDataSource as any as jest.MockedFn<any>).mockImplementation(() => undefined);
    const {result: {current: {
      isDisabled,
    }}} = renderHook(() => useDataSourceOptionsForPipeline({pipelineId: '1'}));
    expect(isDisabled).toBeFalsy();
  });
});
