import {WidgetId} from '@/entities/widget/model';

import {useWidget} from './useWidget';

export const useEnhance = (id: WidgetId) => {
  const { step } = useWidget(id);

  return {
    step,
  }
}