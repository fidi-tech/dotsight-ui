import {act, renderHook} from '@testing-library/react';
import {useMapperConfiguration} from '@/features/mapperSelector/lib/hooks/useMapperConfiguration';

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
      config: {initial: 'config'},
    },
  })),
}));
jest.mock('@/entities/mapperSuggestion/model', () => ({
  selectAll: jest.fn(() => [
    {type: 'st', configSchema: 'cs'},
    {type: 'nst'},
  ]),
}));

describe('features/mapperSelector useMapperConfiguration', () => {
  it('should return config from the pipeline', () => {
    const {result} = renderHook(() => useMapperConfiguration({
      pipelineId: 'pid',
      selectedType: 'st',
    }));
    expect(result.current.config).toEqual({initial: 'config'});
  });

  it('changes config when handleConfigUpdate is called', () => {
    const {result} = renderHook(() => useMapperConfiguration({
      pipelineId: 'pid',
      selectedType: 'st',
    }));

    act(() => {
      result.current.handleConfigUpdate({formData: {updated: 'config'}} as any);
    });

    expect(result.current.config).toEqual({updated: 'config'});
  });

  it('returns configSchema from suggestions', () => {
    const {result} = renderHook(() => useMapperConfiguration({
      pipelineId: 'pid',
      selectedType: 'st',
    }));

    expect(result.current.configSchema).toEqual('cs');
  });
});
