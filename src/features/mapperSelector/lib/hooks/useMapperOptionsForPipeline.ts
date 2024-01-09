import {PipelineId, selectById, selectCanModify} from '@/entities/pipeline/model';
import {useSelector} from 'react-redux';
import {getPipelineMappers} from '@/entities/pipeline/model/getters';
import {useCallback, useMemo, useState} from 'react';
import {Option} from '@/shared/ui/Selector';
import {selectAll} from '@/entities/mapperSuggestion/model';

export const useMapperOptionsForPipeline = ({pipelineId}: {pipelineId: PipelineId}) => {
  const pipeline = useSelector((state) => selectById(state, pipelineId));
  const canModify = useSelector(state => selectCanModify(state, pipelineId));

  const mapper = pipeline && Object.values(getPipelineMappers(pipeline) || {})?.[0];
  const [selectedType, setSelectedType] = useState(mapper?.type);

  const suggestions = useSelector(selectAll);
  const typeOptions = useMemo(
    () => suggestions.map(suggestion => ({value: suggestion.type, label: suggestion.name})),
    [suggestions]
  );
  const onOptionSelect = useCallback((option: Option) => {
    setSelectedType(option.value);
  }, []);

  return {
    selectedType,
    onOptionSelect,
    typeOptions,
    isDisabled: !canModify || Boolean(mapper?.type),
  };
};
