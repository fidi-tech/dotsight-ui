import {useDataset} from './useDataset';

export const useEnhance = (data) => {
  const {
    title,
    items,
    chart,
    keys,
  } = useDataset(data);
  return {
    title,
    items,
    chart,
    keys,
  };
}