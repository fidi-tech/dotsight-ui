import {Dispatch} from '@reduxjs/toolkit';

import {fetchWidgetById} from '@/shared/api/dotsight';

import {WidgetId} from '..';

import {upsert} from '../actions';

export const getWidgetById = (id: WidgetId) => async (dispatch: Dispatch) => {
  const widget = await fetchWidgetById(id);
  return dispatch(upsert(widget));
};
