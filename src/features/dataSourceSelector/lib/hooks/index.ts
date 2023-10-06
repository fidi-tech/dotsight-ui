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
  const {config, configSchema} = useDataSourceConfiguration({pipelineId, selectedType});

  return {
    selectedType,
    typeOptions,
    configSchema,
    config,
    onOptionSelect,
    isDisabled,
  };
};

export default useEnhance;
