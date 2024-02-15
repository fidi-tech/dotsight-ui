import {useState} from 'react';

export const useViewType = () => {
  const [viewType, setViewType] = useState();
  return {
    viewType,
    onSelectViewType: setViewType,
  };
}