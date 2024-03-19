import {Dispatch} from '@reduxjs/toolkit';

import {fetchCategoriesList} from '@/shared/api/dotsight';

import {updateCategories} from '../actions';

export const getCategoriesList = () => async (dispatch: Dispatch) => {
  const categories = await fetchCategoriesList();
  return dispatch(updateCategories(categories));
};
