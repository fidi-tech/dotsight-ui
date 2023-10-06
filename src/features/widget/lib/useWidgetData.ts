import {useEffect, useReducer} from 'react';

import {executePipeline} from '@/shared/api/dotsight';
import {PipelineId} from '@/entities/pipeline/model/types';
import {WidgetId} from '@/entities/widget/model/types';

type State<D> = {
  data: D | null;
  error: Error | null;
  isLoading: boolean;
};

const errorAction = (error: Error) => ({type: 'error' as 'error', payload: {error}});
const dataAction = <D>(data: D) => ({type: 'data' as 'data', payload: {data}});
const loadingAction = () => ({type: 'loading' as 'loading'});

type Action<D> =
  | ReturnType<typeof errorAction>
  | ReturnType<typeof dataAction<D>>
  | ReturnType<typeof loadingAction>;

const reducer = <D>(state: State<D>, action: Action<D>) => {
  switch (action?.type) {
    case 'error':
      return {data: null, error: action.payload.error, isLoading: false};
    case 'data':
      return {data: action.payload.data, error: null, isLoading: false};
    case 'loading':
      return {data: state.data, error: state.error, isLoading: true};
    default:
      return state;
  }
};

export const useWidgetData = <D>({
  pipelineId,
  widgetId,
  params,
}: {
  pipelineId: PipelineId;
  widgetId: WidgetId;
  params: Record<string, any>;
}) => {
  const [
    {data, error, isLoading},
    dispatch,
  ] = useReducer(reducer<D>, {data: null, error: null, isLoading: false} as State<D>);

  useEffect(() => {
    (async () => {
      try {
        dispatch(loadingAction());
        const response = await executePipeline({pipelineId, widgetIds: [widgetId], params});
        dispatch(dataAction(response.data[widgetId] as D));
      } catch (err) {
        console.error(err);
        dispatch(errorAction(err as Error));
      }
    })();
  }, [params, pipelineId, widgetId]);

  return {data, error, isLoading};
};
