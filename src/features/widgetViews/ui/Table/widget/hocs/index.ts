import {useDataset} from './useDataset';

export const useEnhance = (data) => {
  const {
    header,
    rows,
  } = useDataset(data)
  return {
    header,
    rows,
  };
}