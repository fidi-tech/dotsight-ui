import {renderHook} from '@testing-library/react';
import {useDataSourceConfiguration} from './useDataSourceConfiguration';
import {useRefetchSuggestions} from './useRefetchSuggestions';
import {useDataSourceOptionsForPipeline} from './useDataSourceOptionsForPipeline';
import useEnhance from '.';

jest.mock('./useRefetchSuggestions', () => ({
  useRefetchSuggestions: jest.fn(() => {}),
}));
jest.mock('./useDataSourceOptionsForPipeline', () => ({
  useDataSourceOptionsForPipeline: jest.fn(() => ({
    typeOptions: 'to',
    selectedType: 'st',
    onOptionSelect: 'oos',
    isDisabled: 'isd',
  }) as any),
}));
jest.mock('./useDataSourceConfiguration', () => ({
  useDataSourceConfiguration: jest.fn(() => ({
    config: 'c',
    configSchema: 'cs',
  }) as any),
}));

describe('features/dataSourceSelector useEnhance', () => {
  it('should call all required hooks', () => {
    const pipelineId = '1';
    const {result} = renderHook(() => useEnhance({pipelineId}));

    expect(useRefetchSuggestions).toHaveBeenCalledWith({pipelineId});
    expect(useDataSourceOptionsForPipeline).toHaveBeenCalledWith({pipelineId});
    expect(useDataSourceConfiguration).toHaveBeenCalledWith({pipelineId, selectedType: 'st'});
    expect(result.current).toEqual({
      selectedType: 'st',
      typeOptions: 'to',
      configSchema: 'cs',
      config: 'c',
      onOptionSelect: 'oos',
      isDisabled: 'isd',
    });
  });
});
