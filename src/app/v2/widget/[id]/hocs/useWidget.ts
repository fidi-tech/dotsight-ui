import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {useWizard} from 'react-use-wizard';

import {WidgetId} from '@/entities/widget/model';
import {useDispatch} from '@/infra/providers/redux';
import {getWidgetById} from '@/entities/widget/model/providers/getWidgetById';
import {selectById} from '@/entities/widget/model/selectors';
import {getWidgetMetricsIds} from '@/entities/widget/model/getters';

export const useWidget = (id: WidgetId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWidgetById(id));
  }, [dispatch, id]);
  const widget = useSelector((state) => selectById(state, id));

  let step;
  if (widget) {
    step = 0;
    if (getWidgetMetricsIds(widget)?.length) {
      step = 1;
    }
  }

  return {
    step,
  };
}
