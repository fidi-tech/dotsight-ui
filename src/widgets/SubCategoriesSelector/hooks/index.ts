import {WidgetId} from '@/entities/widget/model';
import {getSubCategoryIsSelected} from '@/entities/subCategory/model/getters';

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
  const isCompleted = subCategories.find(getSubCategoryIsSelected)

  return {
    categoryId,
    query,
    setQuery,
    subCategories,
    onSelectSubCategory,
    isCompleted,
  }
}
