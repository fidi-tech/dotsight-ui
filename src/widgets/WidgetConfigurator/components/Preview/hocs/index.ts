import {WidgetId} from '@/entities/widget/model';

import {useData} from './useData';

export const useEnhance = (id: WidgetId) => {
  const {data} = useData(id);

  console.log(data, 'mid')

  return {
    data,
  };
}