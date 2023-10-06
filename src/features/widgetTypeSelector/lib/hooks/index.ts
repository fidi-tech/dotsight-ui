import {Ref} from 'react';
import {PipelineId} from '@/entities/pipeline/model';
import {useWidgetTypesForPipeline} from './useWidgetTypesForPipeline';
import {useOnNextStep} from './useOnNextStep';

const useEnhance = ({ref, pipelineId}: {ref: Ref<any>, pipelineId: PipelineId}) => {
  const {typeOptions, selectedType, onOptionSelect, isDisabled} = useWidgetTypesForPipeline({pipelineId});

  useOnNextStep({ref, pipelineId, selectedType});

  return {
    selectedType,
    typeOptions,
    onOptionSelect,
    isDisabled,
  };
};

export default useEnhance;
