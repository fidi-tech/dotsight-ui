import {PipelineId, selectDefaultDataSource} from '@/entities/pipeline/model';
import {useSelector} from 'react-redux';
import {selectAll} from '@/entities/dataSourceSuggestion/model';
import {useMemo} from 'react';

export const useDataSourceConfiguration = ({pipelineId, selectedType}: {pipelineId: PipelineId, selectedType?: string}) => {
  const pipelineDatasource = useSelector(state => selectDefaultDataSource(state, pipelineId));
  // resetting configuration if selected pipeline changed
  const suggestions = useSelector(selectAll);
  const selectedDataSource = useMemo(
    () => suggestions.find(({type}) => type === selectedType),
    [suggestions, selectedType]
  );

  return {
    config: pipelineDatasource?.config,
    configSchema: selectedDataSource?.configSchema,
  };
};
