import {Dispatch} from '@reduxjs/toolkit';

import {fetchWidgets} from '@/shared/api/dotsight';

import {updateAll} from '../actions';

export const getWidgets = () => async (dispatch: Dispatch) => {
  const widgets = await fetchWidgets();
  return dispatch(updateAll(widgets));
};
