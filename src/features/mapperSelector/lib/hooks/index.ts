import {PipelineId} from '@/entities/pipeline/model';
import {useMapperConfiguration} from './useMapperConfiguration';
import {useMapperOptionsForPipeline} from './useMapperOptionsForPipeline';
import {useOnNextStep} from './useOnNextStep';
import {useRefetchSuggestions} from './useRefetchSuggestions';
import {Ref} from 'react';

const useEnhance = ({ref, pipelineId}: {ref: Ref<any>, pipelineId: PipelineId}) => {
  useRefetchSuggestions({pipelineId});

  const {
    selectedType,
    onOptionSelect,
    typeOptions,
    isDisabled,
  } = useMapperOptionsForPipeline({pipelineId});
  const {description, config, configSchema, handleConfigUpdate} = useMapperConfiguration({pipelineId, selectedType});

  const {formRef} = useOnNextStep({ref, pipelineId, selectedType, config});

  return {
    selectedType,
    onOptionSelect,
    typeOptions,
    isDisabled,
    config,
    description,
    configSchema,
    handleConfigUpdate,
    formRef,
  }
};

export default useEnhance;
