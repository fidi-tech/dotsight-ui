import {PipelineId, selectById} from '@/entities/pipeline/model';
import {useDispatch} from '@/infra/providers/redux';
import {useEffect} from 'react';
import {fetchWidgetMapperSuggestions} from '@/entities/mapperSuggestion/model/fetchWidgetMapperSuggestions';
import {useSelector} from 'react-redux';
import {getPipelineWidgets} from '@/entities/pipeline/model/getters';

export const useRefetchSuggestions = ({pipelineId}: {pipelineId: PipelineId}) => {
  const pipeline = useSelector((state) => selectById(state, pipelineId));
  const widget = pipeline && getPipelineWidgets(pipeline)[0];

  const dispatch = useDispatch();
  useEffect(() => {
    if (widget) {
      dispatch(fetchWidgetMapperSuggestions({pipelineId, widgetId: widget.id}));
    }
  }, [dispatch, widget, pipelineId]);
};
