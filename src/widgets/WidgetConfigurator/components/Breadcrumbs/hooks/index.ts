import {WidgetId} from '@/entities/widget/model';

import {useWidget} from './useWidget';

export const useEnhance = (id: WidgetId) => {
  const {name, canModify, onSaveName} = useWidget(id);
  return {
    name,
    canModify,
    onSaveName,
  }
}