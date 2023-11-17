import {PipelineId, selectDefaultDataSource} from '@/entities/pipeline/model';
import {useSelector} from 'react-redux';
import {useCallback, useMemo, useState} from 'react';
import {Option} from '@/shared/ui/Selector';
import {selectAll} from '@/entities/dataSourceSuggestion/model';

export const useDataSourceOptionsForPipeline = ({pipelineId}: {pipelineId: PipelineId}) => {
  const dataSource = useSelector(state => selectDefaultDataSource(state, pipelineId));
  const [selectedType, setType] = useState(dataSource?.type);
  const onOptionSelect = useCallback((option: Option) => {
    setType(option.value);
  }, []);
  const suggestions = useSelector(selectAll);
  const typeOptions = useMemo(
    () => suggestions.map(suggestion => ({value: suggestion.type, label: suggestion.name})),
    [suggestions]
  );

  return {
    selectedType,
    onOptionSelect,
    typeOptions,
    isDisabled: Boolean(dataSource?.type),
  };
};
