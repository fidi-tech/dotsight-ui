import {useDataset} from './useDataset';

export const useEnhance = (data) => {
  const {
    chart,
  } = useDataset(data)
  return {
    chart,
  };
}