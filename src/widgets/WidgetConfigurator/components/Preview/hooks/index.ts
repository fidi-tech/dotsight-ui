import {WidgetId} from '@/entities/widget/model';

import {useData} from './useData';

export const useEnhance = (id: WidgetId) => {
  const {data, isLoading, isError} = useData(id);

  return {
    data,
    isLoading,
    isError,
  };
}