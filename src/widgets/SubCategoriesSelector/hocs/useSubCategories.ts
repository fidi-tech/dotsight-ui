import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {useDispatch} from '@/infra/providers/redux';
import {getSubCategoriesByWidgetId} from '@/entities/subCategory/model/providers/getSubCategoriesByWidgetId';
import {selectAll} from '@/entities/subCategory/model/selectors';
import {WidgetId} from '@/entities/widget/model';
import {getSubCategoryId, getSubCategoryIsSelected} from '@/entities/subCategory/model/getters';
import {SubCategoryId} from '@/entities/subCategory/model';
import {setSubCategoriesByWidgetId} from '@/entities/subCategory/model/providers/setSubCategoriesByWidgetId';

export const useSubCategories = (id: WidgetId) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  useEffect(() => {
    dispatch(getSubCategoriesByWidgetId(id, query));
  }, [dispatch, id, query]);
  const subCategories = useSelector(selectAll);
  const onSelect = useCallback((subCategoryId) => {
    const currentSelectedSubCategoriesIds = subCategories.reduce((acc: SubCategoryId[], subCategory) => {
      if (getSubCategoryIsSelected(subCategory)) {
        acc.push(getSubCategoryId(subCategory));
      }
      return acc;
    }, []);
    const updatedSubCategoriesIds = currentSelectedSubCategoriesIds.includes(subCategoryId)
      ? currentSelectedSubCategoriesIds.filter(id => id !== subCategoryId)
      : [...currentSelectedSubCategoriesIds, subCategoryId];

    dispatch(setSubCategoriesByWidgetId(id, updatedSubCategoriesIds, query));
  }, [subCategories]);
  return {
    subCategories,
    onSelectSubCategory: onSelect,
    query,
    setQuery,
  }
}