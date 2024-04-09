import {WidgetId} from '@/entities/widget/model';

import {usePublic} from './usePublic';
import {useCallback} from 'react';

export const useEnhance = (id: WidgetId) => {
  const {label, isPublic, onChange} = usePublic(id);
  const toggle = useCallback(() => onChange(!isPublic), [isPublic, onChange]);

  return {
    label,
    isPublic,
    toggle,
  };
}