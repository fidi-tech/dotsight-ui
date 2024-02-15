import {useViewType} from './useViewType';

export const useEnhance = () => {
  const {viewType, onSelectViewType} = useViewType();
  return {
    viewType,
    onSelectViewType,
  };
}