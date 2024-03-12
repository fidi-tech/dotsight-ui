import {WidgetId} from '@/entities/widget/model';

import {useTypes} from './useTypes';

export const useEnhance = (id: WidgetId) => {
  const {types, query, setQuery, onSelect} = useTypes(id)
  return {
    types,
    onSelect,
    query,
    setQuery,
  }
}