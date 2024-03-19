import {RawWidgetData} from '@/shared/api/dotsight';

import {useDataset} from './useDataset';

export const useEnhance = (data: RawWidgetData) => {
  const {
    items,
    chart,
    copyrights,
    metrics,
  } = useDataset(data);
  return {
    items,
    chart,
    copyrights,
    metrics,
  };
}