import {WidgetId} from '@/entities/widget/model';

import {useWidget} from './useWidget';

export const useEnhance = (id: WidgetId) => {
  const {name, onSaveName} = useWidget(id);
  return {
    name,
    onSaveName,
  }
}