import {useSelector} from 'react-redux';
import {useEffect, useState, useMemo} from 'react';

import widgetViews from '@/features/widgetViews/ui';
import {WidgetId} from '@/entities/widget/model';
import {useDispatch} from '@/infra/providers/redux';
import {getWidgetById} from '@/entities/widget/model/providers/getWidgetById';
import {selectById} from '@/entities/widget/model/selectors';

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
  useEffect(() => {
    const firstAvailable = types.find(type => !type.unavailabilityReason);
    if (firstAvailable) {
      onSelect(firstAvailable.id);
    }
  }, []);

  const [query, setQuery] = useState('');
  return {
    types,
    query,
    setQuery,
    onSelect,
  }
}