import {useEffect} from 'react';
import {useSelector} from 'react-redux';

import {
  PipelineId,
  selectDefaultWidgetDataShape,
  selectMappers,
} from '@/entities/pipeline/model';
import {useDispatch} from '@/infra/providers/redux';
import {
  fetchPipelineDataSourceSuggestions
} from '@/entities/dataSourceSuggestion/model/fetchPipelineDataSourceSuggestions';

export const useRefetchSuggestions = ({pipelineId}: {pipelineId: PipelineId}) => {
  const dispatch = useDispatch();
  const dataShape = useSelector(state => selectDefaultWidgetDataShape(state, pipelineId));
  const mappers = useSelector(state => selectMappers(state, pipelineId));
  useEffect(() => {
    dispatch(fetchPipelineDataSourceSuggestions({
      pipelineId,
      entity: mappers![dataShape!].config.entity,
    }));
  }, [dispatch, pipelineId, mappers, dataShape]);
};
