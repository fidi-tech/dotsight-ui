import {useCallback, useEffect, useState} from 'react';

import {WidgetId} from '@/entities/widget/model';
import {updateWidgetById} from '@/entities/widget/model/providers/updateWidgetById';
import {useDispatch} from '@/infra/providers/redux';
import {useSelector} from 'react-redux';
import {selectById} from '@/entities/widget/model/selectors';
import {isWidgetPublic} from '@/entities/widget/model/getters';

export const usePublic = (id: WidgetId) => {
  const dispatch = useDispatch();
  const widget = useSelector((state) => selectById(state, id));
  const [isPublic, setIsPublic] = useState(widget && isWidgetPublic(widget));
  useEffect(() => {
    if (!widget) {
      return;
    }
    setIsPublic(isWidgetPublic(widget))
  }, [widget]);
  const onChange = useCallback((value: boolean) => {
    dispatch(updateWidgetById(id, {isPublic: value}))
  }, [isPublic]);

  return {
    label: isPublic ? 'Public' : 'Private',
    isPublic,
    onChange,
  };
}