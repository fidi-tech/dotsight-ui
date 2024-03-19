import {Dispatch} from '@reduxjs/toolkit';

import {updateWidget} from '@/shared/api/dotsight';
import {WidgetId} from '@/entities/widget/model';
import {WidgetType} from '@/features/widgetViews/ui/constants';

import {upsert} from '../actions';

export const updateWidgetById = (id: WidgetId, {name, view}: {name?: string, view?: WidgetType}) =>
  async (dispatch: Dispatch) => {
    const widget = await updateWidget(id, {name, view});
    return dispatch(upsert(widget));
  };
