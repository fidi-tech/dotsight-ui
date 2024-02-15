import {useTypes} from './useTypes';

export const useEnhance = () => {
  const {types, query, setQuery, onSelect} = useTypes()
  return {
    types,
    onSelect,
    query,
    setQuery,
  }
}