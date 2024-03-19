import {Dispatch} from '@reduxjs/toolkit';

import {WidgetId} from '@/entities/widget/model';
import {fetchWidgetSubcategoriesById} from '@/shared/api/dotsight';

import {updateSubCategories} from '../actions';

export const getSubCategoriesByWidgetId = (id: WidgetId, query: string) => async (dispatch: Dispatch) => {
  const subCategories = await fetchWidgetSubcategoriesById(id, query);
  return dispatch(updateSubCategories(subCategories));
};
