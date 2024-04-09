import {Dispatch} from '@reduxjs/toolkit';

import {updateWidget} from '@/shared/api/dotsight';
import {WidgetId} from '@/entities/widget/model';
import {WidgetType} from '@/features/widgetViews/ui/constants';

import {upsert} from '../actions';

type Params = {
  name?: string,
  view?: WidgetType,
  isPublic?: boolean,
};

export const updateWidgetById = (id: WidgetId, {name, view, isPublic}: Params) =>
  async (dispatch: Dispatch) => {
    const widget = await updateWidget(id, {name, view, isPublic});
    return dispatch(upsert(widget));
  };
