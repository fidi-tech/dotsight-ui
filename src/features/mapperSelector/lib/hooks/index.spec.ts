import {renderHook} from '@testing-library/react';
import useEnhance from '.';
import {Ref} from 'react';

import {useMapperConfiguration} from './useMapperConfiguration';
import {useMapperOptionsForPipeline} from './useMapperOptionsForPipeline';
import {useOnNextStep} from './useOnNextStep';
import {useRefetchSuggestions} from './useRefetchSuggestions';

jest.mock('./useMapperConfiguration', () => ({
  useMapperConfiguration: jest.fn(() => ({
    config: 'c',
    configSchema: 'cs',
    handleConfigUpdate: 'hcu',
  })),
}));
jest.mock('./useMapperOptionsForPipeline', () => ({
  useMapperOptionsForPipeline: jest.fn(() => ({
    selectedType: 'st',
    onOptionSelect: 'oos',
    typeOptions: 'to',
    isDisabled: 'id',
  })),
}));
jest.mock('./useOnNextStep', () => ({
  useOnNextStep: jest.fn(() => ({
    formRef: 'fr',
  })),
}));
jest.mock('./useRefetchSuggestions');

describe('features/mapperSelector useEnhance', () => {
  it('should call all required hooks', () => {
    const pipelineId = '1';
    const ref = {some: 'ref'} as any as Ref<any>;
    const {result} = renderHook(() => useEnhance({ref, pipelineId}));

    expect(useRefetchSuggestions).toHaveBeenCalledTimes(1);
    expect(useRefetchSuggestions).toHaveBeenCalledWith({pipelineId});
    expect(useMapperOptionsForPipeline).toHaveBeenCalledTimes(1);
    expect(useMapperOptionsForPipeline).toHaveBeenCalledWith({pipelineId});
    expect(useMapperConfiguration).toHaveBeenCalledTimes(1);
    expect(useMapperConfiguration).toHaveBeenCalledWith({
      pipelineId,
      selectedType: 'st',
    });
    expect(useOnNextStep).toHaveBeenCalledTimes(1);
    expect(useOnNextStep).toHaveBeenCalledWith({
      ref,
      pipelineId,
      selectedType: 'st',
      config: 'c',
    });

    expect(result.current).toEqual({
      selectedType: 'st',
      onOptionSelect: 'oos',
      typeOptions: 'to',
      isDisabled: 'id',
      config: 'c',
      configSchema: 'cs',
      handleConfigUpdate: 'hcu',
      formRef: 'fr',
    });
  });
});
