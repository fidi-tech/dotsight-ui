import {act, renderHook} from '@testing-library/react';
import {useMapperOptionsForPipeline} from '@/features/mapperSelector/lib/hooks/useMapperOptionsForPipeline';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(fn => fn()),
}));
jest.mock('@/entities/pipeline/model', () => ({
  selectById: jest.fn((s, id) => ({id})),
}));
jest.mock('@/entities/pipeline/model/getters', () => ({
  getPipelineMappers: jest.fn(() => ({
    mapper1: {
      type: 't1',
    },
  })),
}));
jest.mock('@/entities/mapperSuggestion/model', () => ({
  selectAll: jest.fn(() => [
    {type: 's1'},
    {type: 's2'},
  ]),
}));

describe('features/mapperSelector useMapperOptionsForPipeline', () => {
  it('should return selected type from the pipeline', () => {
    const {result} = renderHook(() => useMapperOptionsForPipeline({
      pipelineId: 'pid',
    }));
    expect(result.current.selectedType).toEqual('t1');
  });

  it('should select mapped suggestions', () => {
    const {result} = renderHook(() => useMapperOptionsForPipeline({
      pipelineId: 'pid',
    }));
    expect(result.current.typeOptions).toEqual([
      {value: 's1', label: 's1'},
      {value: 's2', label: 's2'},
    ]);
  });

  it('should return isDisabled if mapper is selected', () => {
    const {result} = renderHook(() => useMapperOptionsForPipeline({
      pipelineId: 'pid',
    }));
    expect(result.current.isDisabled).toEqual(true);
  });

  it('changes selectedType when onOptionSelect is called', () => {
    const {result} = renderHook(() => useMapperOptionsForPipeline({
      pipelineId: 'pid',
    }));

    act(() => {
      result.current.onOptionSelect({value: 't2', label: 'l2'});
    });

    expect(result.current.selectedType).toEqual('t2');
  });
});
