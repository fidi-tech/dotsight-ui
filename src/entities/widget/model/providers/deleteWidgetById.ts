import {Dispatch} from '@reduxjs/toolkit';

import {deleteWidget} from '@/shared/api/dotsight';
import {WidgetId} from '@/entities/widget/model';

import {deleteById} from '../actions';

export const deleteWidgetById = (id: WidgetId) =>
  async (dispatch: Dispatch) => {
    await deleteWidget(id);
    return dispatch(deleteById(id));
  };
