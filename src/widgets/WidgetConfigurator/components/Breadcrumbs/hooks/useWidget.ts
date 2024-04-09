import {useCallback} from 'react';
import {useSelector} from 'react-redux';

import {WidgetId} from '@/entities/widget/model';
import {selectById} from '@/entities/widget/model/selectors';
import {canModifyWidget, getWidgetName} from '@/entities/widget/model/getters';
import {useDispatch} from '@/infra/providers/redux';
import {updateWidgetById} from '@/entities/widget/model/providers/updateWidgetById';

export const useWidget = (id: WidgetId) => {
  const dispatch = useDispatch();
  const widget = useSelector((state) => selectById(state, id));
  const onSaveName = useCallback((value: string) => {
    dispatch(updateWidgetById(id, {name: value}))
  }, [id, dispatch])
  return {
    name: widget && getWidgetName(widget),
    canModify: widget && canModifyWidget(widget),
    onSaveName,
  }
}