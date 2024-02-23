import {useSelector} from 'react-redux';

import {WidgetId} from '@/entities/widget/model';
import {selectById} from '@/entities/widget/model/selectors';
import {getWidgetView} from '@/entities/widget/model/getters';

export const useViewType = (id: WidgetId) => {
  const widget = useSelector((state) => selectById(state, id));
  const viewType = widget && getWidgetView(widget);
  return {
    viewType,
  };
}