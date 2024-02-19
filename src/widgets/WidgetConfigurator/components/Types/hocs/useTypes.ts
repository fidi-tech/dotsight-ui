import {useSelector} from 'react-redux';
import {useEffect, useState, useMemo, useCallback} from 'react';

import widgetViews from '@/features/widgetViews/ui';
import {WidgetId} from '@/entities/widget/model';
import {useDispatch} from '@/infra/providers/redux';
import {getWidgetById} from '@/entities/widget/model/providers/getWidgetById';
import {selectById} from '@/entities/widget/model/selectors';
import {getWidgetView} from '@/entities/widget/model/getters';
import {updateWidgetById} from '@/entities/widget/model/providers/updateWidgetById';

const TYPES = Object.values(widgetViews).map(widgetView => ({
  id: widgetView.type,
  name: widgetView.title,
  Icon: widgetView.Icon,
  getUnavailabilityReason: widgetView.getUnavailabilityReason,
}))

export const useTypes = (id: WidgetId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWidgetById(id));
  }, [dispatch, id]);
  const widget = useSelector((state) => selectById(state, id));
  const view = getWidgetView(widget);

  const [selected, onSelect] = useState();
  const types = useMemo(() => {
    return TYPES.map(({getUnavailabilityReason, ...type}) => {
      return {
        ...type,
        isSelected: selected === type.id,
        unavailabilityReason: getUnavailabilityReason?.(widget),
      };
    })
  }, [widget, TYPES, selected]);
  const _onSelect = useCallback((type) => {
    onSelect(type);
    if (type !== view) {
      dispatch(updateWidgetById(id, {view: type}))
    }
  }, [onSelect, view, id]);
  useEffect(() => {
    if (view) {
      const type = types.find(t => t.id === view);
      if (type) {
        _onSelect(type.id);
        return;
      }
    }
    const firstAvailable = types.find(type => !type.unavailabilityReason);
    if (firstAvailable) {
      _onSelect(firstAvailable.id);
    }
  }, [view, _onSelect]);

  const [query, setQuery] = useState('');
  return {
    types,
    query,
    setQuery,
    onSelect: _onSelect,
  }
}