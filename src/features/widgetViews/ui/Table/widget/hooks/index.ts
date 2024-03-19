import {RawWidgetData} from '@/shared/api/dotsight';

import {useDataset} from './useDataset';

export const useEnhance = (data: RawWidgetData) => {
  const {
    header,
    rows,
    copyrights,
  } = useDataset(data)
  return {
    header,
    rows,
    copyrights,
  };
}