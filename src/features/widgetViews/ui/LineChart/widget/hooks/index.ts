import {RawWidgetData} from '@/shared/api/dotsight';

import {useDataset} from './useDataset';

export const useEnhance = (data: RawWidgetData) => {
  const {
    title,
    items,
    chart,
    keys,
    unitId,
    copyrights,
  } = useDataset(data);
  return {
    title,
    items,
    chart,
    keys,
    unitId,
    copyrights,
  };
}