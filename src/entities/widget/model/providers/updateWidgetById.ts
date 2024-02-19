import {Dispatch} from '@reduxjs/toolkit';

import {updateWidget} from '@/shared/api/dotsight';
import {WidgetView, WidgetId} from '@/entities/widget/model';

import {upsert} from '../actions';

export const updateWidgetById = (id: WidgetId, {name, view}: {name?: string, view?: WidgetView}) =>
  async (dispatch: Dispatch) => {
    const widget = await updateWidget(id, {name, view});
    return dispatch(upsert(widget));
  };
