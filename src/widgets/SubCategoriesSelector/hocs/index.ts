import {WidgetId} from '@/entities/widget/model';

import {useSubCategories} from './useSubCategories';
import {useWidget} from './useWidget';

export const useEnhance = (id: WidgetId) => {
  const {
    subCategories,
    onSelectSubCategory,
    query,
    setQuery,
  } = useSubCategories(id);
  const {
    categoryId,
  } = useWidget(id);

  return {
    categoryId,
    query,
    setQuery,
    subCategories,
    onSelectSubCategory,
  }
}
