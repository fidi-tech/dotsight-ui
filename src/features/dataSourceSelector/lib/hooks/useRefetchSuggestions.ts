import {useEffect} from 'react';

import {PipelineId} from '@/entities/pipeline/model';
import {useDispatch} from '@/infra/providers/redux';
import {
  fetchPipelineDataSourceSuggestions
} from '@/entities/dataSourceSuggestion/model/fetchPipelineDataSourceSuggestions';

export const useRefetchSuggestions = ({pipelineId}: {pipelineId: PipelineId}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPipelineDataSourceSuggestions({
      pipelineId,
    }));
  }, [dispatch, pipelineId]);
};
