import {PipelineId} from '@/entities/pipeline/model';

import {useDataSourceConfiguration} from './useDataSourceConfiguration';
import {useRefetchSuggestions} from './useRefetchSuggestions';
import {useDataSourceOptionsForPipeline} from './useDataSourceOptionsForPipeline';

const useEnhance = ({pipelineId}: {pipelineId: PipelineId}) => {
  useRefetchSuggestions({pipelineId});

  const {
    typeOptions,
    selectedType,
    onOptionSelect,
    isDisabled,
  } = useDataSourceOptionsForPipeline({pipelineId});
  const {description, config, configSchema} = useDataSourceConfiguration({pipelineId, selectedType});

  return {
    selectedType,
    typeOptions,
    description,
    configSchema,
    config,
    onOptionSelect,
    isDisabled,
  };
};

export default useEnhance;
