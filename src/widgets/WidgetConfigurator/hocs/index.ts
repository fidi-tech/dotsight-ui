import {WidgetId} from '@/entities/widget/model';

import {useViewType} from './useViewType';

export const useEnhance = (id: WidgetId) => {
  const {viewType} = useViewType(id);
  return {
    viewType,
  };
}