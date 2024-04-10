import {Dispatch} from '@reduxjs/toolkit';

import {fetchWidgetById} from '@/shared/api/dotsight';

import {WidgetId} from '..';
import {upsert} from '../actions';

export const getWidgetById = (id: WidgetId) => (dispatch: Dispatch) =>
  fetchWidgetById(id)
    .then(widget => dispatch(upsert(widget)))
    .catch(() => window.location.replace('/'));
