import {WidgetId} from '@/entities/widget/model';

import {usePublic} from './usePublic';

export const useEnhance = (id: WidgetId) => {
  const {label, isPublic, setIsPublic} = usePublic(id);

  return {
    label,
    isPublic,
    setIsPublic,
  };
}