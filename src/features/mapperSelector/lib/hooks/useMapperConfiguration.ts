import {PipelineId, selectById} from '@/entities/pipeline/model';
import {useCallback, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {selectAll} from '@/entities/mapperSuggestion/model';
import {IChangeEvent} from '@rjsf/core';
import {getPipelineMappers} from '@/entities/pipeline/model/getters';

export const useMapperConfiguration = ({pipelineId, selectedType}: {pipelineId: PipelineId, selectedType?: string}) => {
  const pipeline = useSelector((state) => selectById(state, pipelineId));
  const mapper = pipeline && Object.values(getPipelineMappers(pipeline) || {})?.[0];

  const [config, setConfig] = useState<object | undefined>(mapper?.config);
  const handleConfigUpdate = useCallback((e: IChangeEvent) => setConfig(e.formData), []);

  const suggestions = useSelector(selectAll);
  const selectedMapper = useMemo(
    () => suggestions.find(suggestion => suggestion.type === selectedType),
    [suggestions, selectedType]
  );

  return {
    config,
    configSchema: selectedMapper?.configSchema,
    handleConfigUpdate,
  };
};
