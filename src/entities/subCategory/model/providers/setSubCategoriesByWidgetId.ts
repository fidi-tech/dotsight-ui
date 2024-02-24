import {Dispatch} from '@reduxjs/toolkit';

import {WidgetId} from '@/entities/widget/model';
import {setWidgetSubcategoriesById} from '@/shared/api/dotsight';
import {upsert} from '@/entities/widget/model/actions';

import {updateSubCategories} from '../actions';
import {SubCategoryId} from '@/entities/subCategory/model';

export const setSubCategoriesByWidgetId = (id: WidgetId, selectedSubCategoriesIds: SubCategoryId[], query: string) =>
  async (dispatch: Dispatch) => {
    const {widget, subcategories} = await setWidgetSubcategoriesById(id, selectedSubCategoriesIds, query);
    dispatch(updateSubCategories(subcategories));
    dispatch(upsert(widget));
  }