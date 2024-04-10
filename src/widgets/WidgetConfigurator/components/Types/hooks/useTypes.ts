import {useSelector} from 'react-redux';
import React, {useEffect, useState, useMemo, useCallback} from 'react';

import widgetViews from '@/features/widgetViews/ui';
import {WidgetId} from '@/entities/widget/model';
import {useDispatch} from '@/infra/providers/redux';
import {getWidgetById} from '@/entities/widget/model/providers/getWidgetById';
import {selectById} from '@/entities/widget/model/selectors';
import {canModifyWidget, getWidgetView} from '@/entities/widget/model/getters';
import {updateWidgetById} from '@/entities/widget/model/providers/updateWidgetById';
import {WidgetType} from '@/features/widgetViews/ui/constants';
import {upsert} from '@/entities/widget/model/actions';

export type Type = {
  id: WidgetType,
  name: string,
  Icon: React.FunctionComponent,
  getUnavailabilityReason?: () => string,
}

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
  const view = widget && getWidgetView(widget);
  const canModify = widget && canModifyWidget(widget);

  const [selected, onSelect] = useState<WidgetType>();
  const [query, setQuery] = useState('');
  const types = useMemo(() => {
    return TYPES.map(({getUnavailabilityReason, ...type}) => {
      return {
        ...type,
        isSelected: selected === type.id,
        isDisabled: !widget || !!getUnavailabilityReason?.(widget),
        unavailabilityReason: widget ? getUnavailabilityReason?.(widget) : '',
      };
    }).filter(type =>
      type.isSelected || type.name.toLowerCase().includes(query.toLowerCase())
    )
  }, [widget, selected, query]);
  const _onSelect = useCallback((type: string) => {
    onSelect(type as WidgetType);
    if (type !== view) {
      if (canModify) {
        dispatch(updateWidgetById(id, {view: type as WidgetType}))
      } else {
        dispatch(upsert({...widget, view: type}));
      }
    }
  }, [onSelect, view, id, dispatch, canModify, widget]);
  useEffect(() => {
    if (view) {
      const type = types.find(t => t.id === view && !t.isDisabled);
      if (type) {
        _onSelect(type.id);
        return;
      }
    }
    const firstAvailable = types.find(type => !type.isDisabled);
    if (firstAvailable) {
      _onSelect(firstAvailable.id);
    }
  }, [view, _onSelect, types]);

  return {
    types,
    query,
    setQuery,
    onSelect: _onSelect,
  }
}